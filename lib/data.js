// Generate content from ../content
import grayMatter from 'gray-matter'
import { readdir, readFile } from 'fs'
import path from 'path'
import format from './utils'

export const PATH_STR = './content'
export const PATH = path.join('.', 'content')

export const getContent = location => {
  return new Promise((resolve, reject) => {
    readdir(location, { withFileTypes: true }, (err, files) => {
      if (err) return reject(err)
      return resolve(
        files.map(file => ({
          name: file.name,
          isDirectory: file.isDirectory()
        }))
      )
    })
  })
}

export const getFile = filepath => {
  return new Promise((resolve, reject) => {
    readFile(filepath, { encoding: 'utf-8' }, (err, data) => {
      if (err) return reject(err)
      else return resolve(data)
    })
  })
}

export const getMetadata = async filepath => {
  const data = await getFile(filepath)
  return grayMatter(data).data
}

export const generateSlugs = async (location = PATH) => {
  /*
        [
            { name: "finding_advisors.mdx", isDirectory: false },
            { name: "letters", isDirectory: true }
        ] => [
            "finding_advisors.mdx",
            "letters/leo_letter.mdx",
            "letters/sahiti_email.mdx",
            ...
        ]
    */

  const files = await getContent(location)
  let res = []
  for (let file of files) {
    if (file.name === 'README.mdx') continue
    else if (!file.isDirectory) res.push(file.name)
    else
      res.push(
        ...(await generateSlugs(path.join(location, file.name))).map(
          x => `${file.name}/${x}`
        )
      )
  }
  return res
}

export const generateDetails = async (location = PATH) => {
  const files = await getContent(location)
  /*
        [
            { name: "finding_advisors.mdx", isDirectory: false },
            { name: "letters", isDirectory: true }
        ] => 
        [
            {
                name: "finding_advisors.mdx",
                title: "Finding Advisors",
                kind: "individual"
            },
            {
                name: "letters",
                title: "Letters to IT Admin..."
                kind: "folder",
                description: "...",
                content: [
                    {
                        name: "leo_letter.mdx",
                        title: "Leo's Letter"
                    }
                ],
            }
        ]
     */

  let res = []
  for (let file of files) {
    if (file.name === 'README.mdx') continue
    else if (!file.isDirectory)
      res.push({
        name: file.name,
        kind: 'file',
        ...(await getMetadata(path.join(location, file.name)))
      })
    else {
      res.push({
        name: file.name,
        title: (await getMetadata(path.join(location, file.name, 'README.mdx')))
          .title,
        kind: 'folder',
        description: `${file.name}/README.mdx`,
        content: await generateDetails(path.join(location, file.name))
      })
    }
  }
  return res
}
