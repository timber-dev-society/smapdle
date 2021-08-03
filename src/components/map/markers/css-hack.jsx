import { useState } from 'react'
import { createGlobalStyle } from 'styled-components'

const getSize = (zoom) => {
  const size = zoom + (zoom / 4.4)

  return size > 25 ? size : 25
}

const getFontSize = (zoom) => {
  const size = zoom - (zoom / 5.5) 

  return size > 15 ? size : 15
}
const GlobalStyle = createGlobalStyle`
.p-token {
  --p-token-size: ${props => getSize(props.zoom)}px;
  --p-token-font-size: ${props => getFontSize(props.zoom)}px;
  --zoom: ${props => props.zoom}px;
}
`

const CssHack = ({ map }) => {
  const [ zoom, setZoom ] = useState(map?.current?.getZoom(), 0)

  map?.current?.on('zoom', () => {
    setZoom(map.current.getZoom())
  })

  return (
    <GlobalStyle zoom={zoom} />
  )
}

export default CssHack
