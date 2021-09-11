import { createPortal } from 'react-dom'
import Emoji from 'a11y-react-emoji'
import { useSelector } from 'react-redux'
import isEqual from 'lodash.isequal'

import useMarker from '../hooks/marker'
import { Wrapper, Icon } from '../map/markers/__style__/marker.style'

const Marker = ({ uid }) => {
  const { color, position } = useSelector(state => state.markers.player[uid], isEqual)
  const { el } = useMarker({ position, uid })

  return createPortal(
    <Wrapper>
      <Icon style={{ borderColor: color }} className="p-token"><Emoji symbol="🧠" label="login" /></Icon>
    </Wrapper>,
    el
  )
}

export default Marker
