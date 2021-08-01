import { useState } from 'react'
import Emoji from "a11y-react-emoji"

import { Wrapper, Icon } from './__style__/marker.style'

const getSize = (zoom) => {
  const size = (zoom - 7) * 6 + 5

  return size < 50 ? size : 50
}

const getFontSize = (zoom) => {
  const size = (zoom - 7) * 6 - (zoom - 7)

  return size < 40 ? size : 40
}

const PlayerMarker = ({ map }) => {
  const [ zoom, setZoom ] = useState(map.getZoom())
  console.log('render PlayerToken')

  map.on('zoom', () => {
    setZoom(map.getZoom())
  })

  return (
    <Wrapper>
      <Icon style={{
        height: `${getSize(zoom)}px`,
        fontSize: `${getFontSize(zoom)}px`,
        lineHeight: `${getSize(zoom)}px`,
        width: `${getSize(zoom)}px`,
      }}><Emoji symbol="🧠" label="login" /></Icon>
    </Wrapper>
  )
}

export default PlayerMarker
