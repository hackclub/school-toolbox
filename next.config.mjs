import remarkFrontmatter from 'remark-frontmatter'
import nextMdx from '@next/mdx'

const withMDX = nextMdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkFrontmatter]
  }
})
export default withMDX({
  pageExtensions: ['js', 'jsx', 'mdx'],
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/home'
      }
    ]
  }
})
