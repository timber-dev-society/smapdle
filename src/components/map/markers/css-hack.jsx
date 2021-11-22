import { useState } from 'react'
import { createGlobalStyle } from 'styled-components'

const computeMetresPerPixelRatio = (zoom) => {
  return 156543.03392 * Math.cos(40 * Math.PI / 180) / Math.pow(2, zoom)
}

const GlobalStyle = createGlobalStyle`
:root,
.zoom {
  --zoom: ${props => props.zoom};
  --ratio: ${props => computeMetresPerPixelRatio(props.zoom)};

  --cac-zone-size: calc(calc(4px / var(--ratio)) * 2);
  --corpse-size: calc(calc(1.2px / var(--ratio)) * 2);
  --weapon-size: calc(calc(0.9px / var(--ratio)) * 2);
  --vehicle-size: calc(calc(7px / var(--ratio)) * 2);

  --token-size: calc(calc(2px / var(--ratio)) * 2);
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
