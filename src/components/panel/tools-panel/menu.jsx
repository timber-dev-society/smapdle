import PropTypes from 'prop-types'
import Emoji from 'a11y-react-emoji'

import { Icon } from '../__style__/admin-panel.style'
import { Ul, Li } from '../__style__/menu.style'
import useAcl from 'components/hooks/acl'

const Menu = ({ handleDragStart, handleDragEnd }) => {
  const { canRead } = useAcl({ type: `panels` })

  return (
    <>
      {
        canRead && (
          <Ul>
            <Li>
              <Icon draggable onDragStart={(e) => handleDragStart(e, 'actor', '👨')} onDragEnd={() => handleDragEnd()}>
                <Emoji symbol="👨" label="actor" />
              </Icon>
            </Li>
            <Li>
              <Icon draggable onDragStart={(e) => handleDragStart(e, 'investigator', '🕵️‍♂️')} onDragEnd={() => handleDragEnd()}>
                <Emoji symbol="🕵️‍♂️" label="investigator" />
              </Icon>
            </Li>
            <Li>
              <Icon draggable onDragStart={(e) => handleDragStart(e, 'location', '🏘️')} onDragEnd={() => handleDragEnd()}>
                <Emoji symbol="🏘️" label="investigator" />
              </Icon>
            </Li>
            <Li>
              <Icon draggable onDragStart={(e) => handleDragStart(e, 'recorder', '📷')} onDragEnd={() => handleDragEnd()}>
                <Emoji symbol="📷" label="recorder" />
              </Icon>
            </Li>
            <Li>
              <Icon draggable onDragStart={(e) => handleDragStart(e, 'recorder', '🚗')} onDragEnd={() => handleDragEnd()}>
                <Emoji symbol="🚗" label="vehicule" />
              </Icon>
            </Li>
          </Ul>
        )
      }
    </>
  )
}

Menu.propTypes = {
  handleDragStart: PropTypes.func.isRequired,
  handleDragEnd: PropTypes.func.isRequired,
}

export default Menu
