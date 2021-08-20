import { createPortal, shallowEqual } from 'react-dom'
import Emoji from 'a11y-react-emoji'
import { useSelector } from 'react-redux'

import useToken from '../hooks/token'
import { Wrapper, Icon } from '../map/markers/__style__/marker.style'

const Token = ({ uid }) => {
  const { color, position } = useSelector(state => state.markers.player[uid], shallowEqual)
  const { el } = useToken({ position, uid })

  return createPortal(
    <Wrapper>
      <Icon style={{ borderColor: color }} className="p-token"><Emoji symbol="🧠" label="login" /></Icon>
    </Wrapper>,
    el
  )
}

export default Token
