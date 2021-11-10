import PropTypes from 'prop-types'
import Emoji from "a11y-react-emoji"

import { Icon } from '../__style__/admin-panel.style'
import { Ul, Li } from '../__style__/menu.style'

const Menu = ({ handleDragStart, handleDragEnd }) => (
  <Ul>
    <Li>
      <Icon draggable onDragStart={(e) => handleDragStart(e, 'z')} onDragEnd={() => handleDragEnd()}>
        <Emoji symbol="🧟" label="z" />
      </Icon>
    </Li>
    <Li>
      <Icon draggable onDragStart={(e) => handleDragStart(e, 'vehicule')} onDragEnd={() => handleDragEnd()}>
        <Emoji symbol="🚗" label="car" />
      </Icon>
    </Li>
    <Li>
      <Icon draggable onDragStart={(e) => handleDragStart(e, 'incident')} onDragEnd={() => handleDragEnd()}>
        <Emoji symbol="🪵" label="incident" />
      </Icon>
    </Li>
  </Ul>
)

Menu.propTypes = {
  handleDragStart: PropTypes.func.isRequired,
  handleDragEnd: PropTypes.func.isRequired,
}

export default Menu
