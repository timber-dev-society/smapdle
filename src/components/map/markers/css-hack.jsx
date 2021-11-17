import { useState } from 'react'
import { createGlobalStyle } from 'styled-components'

// const getSize = (zoom) => {
//   const size = zoom + (zoom / 4.4)
//
//   return size > 25 ? size : 25
// }

const getFontSize = (zoom) => {
  const size = zoom - 7

  return size > 0 ? size : 0
}
const GlobalStyle = createGlobalStyle`
.zoom {
  --zoom: ${props => props.zoom};
}
.p-token {
  --p-token-size: ${props => props.zoom - 3}px;
  --p-token-font-size: ${props => getFontSize(props.zoom)}px;
}
.i-token {
  --i-token-size: ${props => props.zoom - 3}px;
  --i-token-font-size: ${props => getFontSize(props.zoom)}px;
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
