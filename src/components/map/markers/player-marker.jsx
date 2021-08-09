import Emoji from 'a11y-react-emoji'

import { Wrapper, Icon } from './__style__/marker.style'

const PlayerMarker = (props) => {

  return (
    <Wrapper>
      <Icon style={{ borderColor: props.color }} className="p-token"><Emoji symbol="🧠" label="login" /></Icon>
    </Wrapper>
  )
}

export default PlayerMarker
