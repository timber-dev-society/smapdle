import Emoji from 'a11y-react-emoji'
import styled from 'styled-components'

import { Li } from '../__style__/menu.style'
import { skins } from '../../map/markers/z-token'

const ListItem = styled(Li)`
  cursor: pointer;
`

const Item = (props) => {
  console.log(props)

  return (
    <ListItem>
      <Emoji symbol={skins[props.skin ? props.skin - 1 : 1]} label="z" />
    </ListItem>
  )
}

export default Item
