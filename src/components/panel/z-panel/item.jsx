import Emoji from 'a11y-react-emoji'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

import { Li } from '../__style__/menu.style'
import { getSkin } from '../../z/skin'
import { setIsOverMarker, flyTo } from '../../../actions'

const ListItem = styled(Li)`
  cursor: pointer;
`

const Item = ({ uid, token, skin }) => {
  const dispatch = useDispatch()
  const handleOver = (isOver) => dispatch(setIsOverMarker({
    uid,
    token,
    isOver,
  }))
  const handleClick = () => dispatch(flyTo({ token, uid}))

  return (
    <ListItem onClick={handleClick} onMouseOver={() => handleOver(true)} onMouseLeave={() => handleOver(false)}>
      <Emoji symbol={getSkin(skin)} label="z" />
    </ListItem>
  )
}

export default Item
