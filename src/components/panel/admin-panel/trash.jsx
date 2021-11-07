import Emoji from "a11y-react-emoji"

import { Wrapper, Icon } from '../__style__/trash.style'


const Trash = ({ isOpen }) => (
  <Wrapper className={isOpen && 'open'}>
    <Icon><Emoji symbol="🗑️" label="login" /></Icon>
  </Wrapper>
)

export default Trash
