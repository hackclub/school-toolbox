import { useState } from 'react'
import '@hackclub/theme/fonts/reg-bold.css'
import theme from '@hackclub/theme'
import { ThemeProvider } from 'theme-ui'
import Meta from '@hackclub/meta'
import Head from 'next/head'
import '../public/scrollbar.css'

var GeoPattern = require('geopattern')

export default function App(props) {
  const { Component, pageProps } = props
  const [generalBG] = useState(
    GeoPattern.generate((Math.random() + 1).toString(36).substring(7), {
      baseColor: '#ec3750'
    }).toDataUrl()
  )
  return (
    <ThemeProvider
      theme={{
        ...theme,
        colors: { ...theme.colors, modes: {} },
        styles: {
          ...theme.styles,
          code: {
            fontFamily: 'monospace',
            fontSize: 'inherit',
            color: 'black',
            bg: 'sunken',
            borderRadius: 'small',
            mx: 1,
            px: 1
          }
        }
      }}
    >
      <Meta
        as={Head}
        name="Hack Club" // site name
        title="School Toolbox" // page title
        description="Hack Club resources for school administrators and teachers." // page description
        color="#ec3750" // theme color
        manifest="/site.webmanifest" // link to site manifest
      />
      <Component {...pageProps} generalBG={generalBG} />
    </ThemeProvider>
  )
}
