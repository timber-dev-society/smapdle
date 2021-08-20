import { createPortal } from 'react-dom'
import Emoji from 'a11y-react-emoji'
import { useSelector } from 'react-redux'

import useToken from '../hooks/token'
import { Wrapper } from '../map/markers/__style__/marker.style'

export const skins = ['🔥', '💥', '⚠️', '☣️']

const Token = ({ uid }) => {
  const { skin, position } = useSelector(state => state.markers.incident[uid])
  const { el } = useToken({ position, uid })

  return createPortal(
    <Wrapper>
      <Emoji symbol={skins[skin - 1]} label="login" />
    </Wrapper>,
    el
  )
}

export default Token
