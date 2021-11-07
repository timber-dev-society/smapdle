import { createPortal } from 'react-dom'
import Emoji from 'a11y-react-emoji'
import { useSelector } from 'react-redux'
import isEqual from 'lodash.isequal'

import useMarker from '../hooks/marker'
import useAcl from '../hooks/acl'
import { Wrapper, Icon } from '../map/markers/__style__/marker.style'
import { getSkin } from './skin'

const Marker = ({ uid }) => {
  const { color, position, skin, owner, token } = useSelector(state => state.markers.player[uid], isEqual)
  const { canRead, canMove } = useAcl({ type: `${token}`, owner })
  const { el } = useMarker({ position, uid, canMove })

  return createPortal(
    <Wrapper>
      { canRead && <Icon style={{ borderColor: color }} className="p-token"><Emoji symbol={getSkin(skin)} label="login" /></Icon> }
    </Wrapper>,
    el
  )
}

export default Marker
