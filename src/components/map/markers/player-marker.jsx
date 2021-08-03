import Emoji from "a11y-react-emoji"

import { Wrapper, Icon } from './__style__/marker.style'

const PlayerMarker = () => {
  console.log('render')

  return (
    <Wrapper>
      <Icon className="p-token"><Emoji symbol="🧠" label="login" /></Icon>
    </Wrapper>
  )
}

export default PlayerMarker
