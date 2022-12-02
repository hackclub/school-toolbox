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
import { BaseStyles } from 'theme-ui'
import theme from '@hackclub/theme'
import styled from '@emotion/styled'
const GeoPattern = require('geopattern')

export const Styled = styled(BaseStyles)`
  font-size: 1.25rem;

  a {
    word-break: break-word;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: revert;
  }

  .heading a {
    color: inherit;
    text-decoration: none;
  }

  @media print {
    font-size: 1rem;
    color: black;

    pre,
    code,
    pre code span {
      background-color: ${theme.colors.snow};
      color: black;
      font-size: 1rem !important;
    }

    a {
      color: ${theme.colors.blue};
    }
    a::after {
      content: ' (' attr(href) ') ';
    }
  }

  .details-video summary {
    list-style: none;
  }

  .details-video summary::-webkit-details-marker {
    // I hate safari
    display: none !important;
  }

  .details-video-summary {
    cursor: pointer;
    display: flex;
    gap: 6px;
    align-items: center;
    font-weight: bold;
    padding: 5px 0;
  }

  .details-video-caret {
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 8px solid currentColor; // Create a right-facing triangle
  }

  details[open] .details-video-caret {
    transform: rotate(90deg);
  }

  .video-summary-camera-icon {
    fill: currentColor;
    flex: 0 0 auto;
  }

  .details-video video {
    max-width: 100%;
  }
`

export default function Content({
  generalBG,
  title,
  location,
  author,
  authorLink
}) {
  const shades = [0.5, 0.75]
  const Markdown = require(`../../content/${location}`).default

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
              {title}
            </Heading>
          </Container>
        </Box>
      </Box>
      <Container variant="copy" as="main" pt={4}>
        <Styled as="article" className="docs">
          <Link href="/" passHref>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                ':hover': { color: 'red', cursor: 'pointer' }
              }}
            >
              <Text sx={{ fontSize: [2, 3] }}>&larr; Back</Text>
            </Box>
          </Link>
          {typeof author === 'string' && (
            <p>
              by{' '}
              {typeof authorLink === 'string' ? (
                <a href={authorLink}>{author}</a>
              ) : (
                author
              )}
            </p>
          )}
          <Markdown />
        </Styled>
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
        <Link
          href={`https://github.com/hackclub/school-toolbox/blob/main/content/${location}`}
          target="_blank"
        >
          Contribute on GitHub
        </Link>
        .
      </Box>
    </Box>
  )
}

export async function getStaticPaths() {
  const { generateSlugs } = require('../../lib/data')
  const files = await generateSlugs()
  const paths = files.map(slug => ({ params: { slug: slug.split('/') } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const { generateDetails } = require('../../lib/data')
  let { slug } = params
  let details
  if (slug.length === 1)
    details = (await generateDetails()).filter(
      x => x.kind === 'file' && slug[0] === x.name
    )[0]
  else
    details = (await generateDetails())
      .filter(x => x.kind === 'folder' && x.name == slug[0])[0]
      .content.filter(x => x.name === slug[1])[0]

  let props = {
    props: {
      title: details.title,
      location: slug.join('/')
    }
  }

  if (details.author) props.props.author = details.author
  if (details.authorLink) props.props.authorLink = details.authorLink

  return props
}
