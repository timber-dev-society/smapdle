import Emoji from 'a11y-react-emoji'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

import { Li } from '../__style__/menu.style'
import { getSkin } from '../../z/skin'
import { setIsOverMarker, flyTo, toggleVisibility } from '../../../actions'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const ListItem = styled(Li)`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`

const Item = ({ uid, token, skin, isDead, isHidden }) => {
  const dispatch = useDispatch()
  const handleOver = (isOver) => dispatch(setIsOverMarker({
    uid,
    token,
    isOver,
  }))
  const handleFlyTo = () => dispatch(flyTo({ token, uid}))

  return (
    <ListItem onMouseOver={() => handleOver(true)} onMouseLeave={() => handleOver(false)}>
      <div onClick={handleFlyTo}>
        { !isDead && <Emoji symbol={getSkin(skin)} label="z" /> }
        { isDead && <Emoji symbol="💀" label="z" /> }
      </div>

      <div onClick={() => dispatch(toggleVisibility({uid, isHidden: !isHidden}))}>
      { isHidden ? <FaEyeSlash /> : <FaEye /> }
      </div>
    </ListItem>
  )
}

export default Item
