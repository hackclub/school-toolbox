import {
  Heading,
  Container,
  Flex,
  Box,
  Image,
  Input,
  Text,
  Link,
  Button,
  Grid,
  Badge
} from 'theme-ui'
import Icon from '@hackclub/icons'
import { useState, useEffect } from 'react'
import { format } from '../lib/utils'

function Item({ name, label, description, icon, url }) {
  return (
    <Flex
      as="a"
      href={url}
      sx={{
        bg: 'white',
        cursor: 'pointer',
        p: 3,
        textDecoration: 'none',
        color: 'black',
        boxShadow: 'card',
        alignItems: 'center',
        borderRadius: 6,
        position: 'relative',
        transition: 'transform .125s ease-in-out box-shadow .125s ease-in-out',
        ':hover,:focus': {
          transform: 'scale(1.0225)'
        }
      }}
    >
      {icon && (
        <Flex
          sx={{
            bg: 'blue',
            color: 'white',
            p: 1,
            borderRadius: 6,
            flexShrink: 0,
            alignSelf: 'start'
          }}
        >
          <Icon glyph={icon} size={24} />
        </Flex>
      )}
      <Flex sx={{
        flexDirection: 'column',
        alignSelf: 'start'
      }}>
        <Flex
          sx={{ flexDirection: ['column', null, null, 'row'], float: 'left' }}
        >
          <Heading sx={{ ml: '12px' }}>{name}</Heading>
          {label && (
            <Heading
              sx={{
                fontWeight: 400,
                ml: '12px',
                display: ['none', 'block'],
                transform: 'translateY(3px)'
              }}
              as="h3"
            >
              ({label})
            </Heading>
          )}
        </Flex>
        {description && (
            <Heading
              sx={{
                fontWeight: 400,
                ml: '12px',
                mt: '8px',
                transform: 'translateY(3px)'
              }}
              as="h3"
            >
              {description}
            </Heading>
          )}
      </Flex>
      <Flex
        sx={{ position: 'absolute', top: 2, right: 2, color: 'placeholder' }}
      >
        <Icon glyph="expand" size={24} />
      </Flex>
    </Flex>
  )
}

function Content({ currentData, setCurrentData }) {
  useEffect(() => {
    currentData != null &&
      // (document.body.style.overflow = 'hidden')
      (document.body.style['position'] = 'fixed') &&
      (document.body.style['overflow-y'] = 'scroll') &&
      (document.body.style['width'] = '100%')
    currentData == null &&
      (document.body.style['position'] = 'static') &&
      (document.body.style['overflow-y'] = 'auto')
  }, [currentData])

  if (currentData === null) return <></>

  const router = useRouter()
  const Markdown = require(`../content/${currentData}`).default
  return (
    <Box
      sx={{
        position: 'fixed',
        display: currentData === null ? 'none' : 'block',
        width: '100vw',
        height: '100vh',
        zIndex: '888',
        py: [0, 4]
      }}
    >
      <Flex
        sx={{
          pt: 2,
          pb: 2,
          justifyContent: 'center',
          position: 'relative',
          zIndex: 998,
          display: ['block', 'none']
        }}
      >
        <Button
          variant="outline"
          sx={{
            color: 'white',
            borderColor: 'white',
            py: 0,
            px: 3,
            boxShadow: 'none'
          }}
        >
          Home
        </Button>
      </Flex>
      <Container
        sx={{
          bg: 'white',
          boxShadow: 'elevated',
          height: '100%',
          borderRadius: [0, 9],
          borderTopRightRadius: ['25px', 9],
          borderTopLeftRadius: ['25px', 9],
          p: 4,
          zIndex: '999',
          position: 'relative'
        }}
        variant="copy"
      >
        <Box
          sx={{
            overflow: 'scroll',
            borderRadius: 9,
            height: '100%',
            overflowX: 'hidden'
          }}
        >
          <Markdown />
          <Box
            sx={{
              borderTop: '0.5px solid',
              borderColor: 'placeholder',
              pb: 1,
              pt: 2,
              mt: 3,
              color: 'placeholder'
            }}
          >
            Want to make this page better?{' '}
            <Link
              href={`https://github.com/hackclub/school-toolbox/blob/main/content/${currentData}.mdx`}
              sx={{ color: 'placeholder' }}
              target="_blank"
            >
              Contribute on GitHub
            </Link>
            .
          </Box>
        </Box>
      </Container>
      <Box
        sx={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          bg: 'rgba(132, 146, 166, 0.4)',
          zIndex: '888',
          top: 0
        }}
      ></Box>
    </Box>
  )
}

export default function Home({ individualFiles, sections, generalBG }) {
  const shades = [0.5, 0.75]

  return (
    <Box sx={{ bg: 'sheet', minHeight: '100vh', pb: 4 }}>
      <Box
        sx={{
          backgroundImage: `linear-gradient(rgba(0,0,0,${shades[0]}), rgba(0,0,0,${shades[1]})), ${generalBG}, linear-gradient(rgba(0,0,0,1), rgba(0,0,0,1))`
        }}
      >
        <Box
          sx={{
            backgroundImage: `linear-gradient(rgba(0,0,0,${shades[0]}), rgba(0,0,0,${shades[1]})), ''`
          }}
        >
          <Container sx={{ display: 'flex' }}>
            <Image
              src="https://assets.hackclub.com/flag-orpheus-top.svg"
              alt="Hack Club flag"
              sx={{ width: [96, 128] }}
            />
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'flex-end',
                pt: 3
              }}
            >
              <Flex
                sx={{
                  color: 'white',
                  ':hover': { '> svg': { transform: 'scale(1.065)' } }
                }}
                as="a"
                href="https://github.com/hackclub/school-toolbox"
              >
                <Icon glyph="github" />
              </Flex>
            </Box>
          </Container>
          <Container
            sx={{ textAlign: 'center', mt: '-10px', pb: [4, 5], pt: [3, 0] }}
            variant="wide"
          >
            <Heading
              as="h1"
              sx={{ fontSize: 6, color: 'snow', textShadow: 'card' }}
            >
              School Toolbox
            </Heading>
            <Heading
              as="h3"
              sx={{
                fontSize: 3,
                fontWeight: 400,
                color: 'snow',
                textShadow: 'card'
              }}
            >
              Hack Club resources for school administrators and teachers.
            </Heading>
          </Container>
        </Box>
      </Box>
      <Container>
        <Heading py={3} mt={3} as="h1" sx={{ textAlign: ['center', 'left'] }}>
          General
        </Heading>
        <Grid columns={[1, 2]}>
          {individualFiles.map((file, index) => (
            <Item
              name={file.title}
              description={file.description}
              icon="post"
              key={file.name}
              url={`view/${file.name}`}
            />
          ))}
        </Grid>
        {sections.map((folder, index) => {
          const Markdown = require(`../content/${folder.description}`).default
          return (
            <>
              <Heading
                pt={3}
                mt={3}
                as="h1"
                sx={{ textAlign: ['center', 'left'] }}
              >
                {folder.title}
              </Heading>
              <Markdown />
              <Grid columns={[1, 2]}>
                {folder.content.map((file, index) => (
                  <Item
                    name={file.title}
                    description={file.description}
                    icon="docs"
                    key={file.name}
                    url={`view/${folder.name}/${file.name}`}
                  />
                ))}
              </Grid>
            </>
          )
        })}
      </Container>
      <Box
        sx={{
          textAlign: 'center',
          py: 1,
          fontSize: 2,
          mt: 4
        }}
      >
        Want to make this page better?{' '}
        <Link href="https://github.com/hackclub/school-toolbox" target="_blank">
          Contribute on GitHub
        </Link>
        .
      </Box>
    </Box>
  )
}

export async function getStaticProps({ params }) {
  const { generateDetails } = require('../lib/data')
  const files = await generateDetails()

  return {
    props: {
      individualFiles: files.filter(x => x.kind === 'file'),
      sections: files.filter(x => x.kind === 'folder')
    }
  }
}
