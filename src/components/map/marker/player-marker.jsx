import { useState } from 'react'
import Emoji from "a11y-react-emoji"

import ProgressBar from './progress-bar'
import { Wrapper, Icon } from './__style__/marker.style'


const PlayerMarker = ({ map }) => {
  const [ zoom, setZoom ] = useState(map.getZoom())
  const [ isPGS, setIsPGS ] = useState(false)

  map.on('zoom', () => {
    setZoom(map.getZoom())
  })

  return (
    <Wrapper>
      {isPGS && <ProgressBar limit={120} value={98} />}
      <Icon style={{
        height: `${(zoom - 7) * 6 + 5}px`,
        fontSize: `${(zoom - 7) * 6 - (zoom - 7)}px`,
        lineHeight: `${(zoom - 7)*6 + 5}px`,
        width: `${(zoom - 7) * 6 + 5}px`,
      }}><Emoji symbol="🧠" label="login" /></Icon>
    </Wrapper>
  )
}

export default PlayerMarker
