import Emoji from "a11y-react-emoji"
import { useSelector } from 'react-redux'

import { Wrapper, Icon } from './__style__/marker.style'

const PlayerMarker = (props) => {

  return (
    <Wrapper>
      <Icon style={{ borderColor: props.color }} className="p-token"><Emoji symbol="🧠" label="login" /></Icon>
    </Wrapper>
  )
}

export default PlayerMarker
