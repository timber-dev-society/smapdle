import Emoji from 'a11y-react-emoji'
import { useSelector } from 'react-redux'

import { Wrapper, Icon } from '../map/markers/__style__/marker.style'

const PlayerMarker = ({ uid }) => {
  const { color } = useSelector(state => state.markers.player[uid])

  return (
    <Wrapper>
      <Icon style={{ borderColor: color }} className="p-token"><Emoji symbol="🧠" label="login" /></Icon>
    </Wrapper>
  )
}

export default PlayerMarker
