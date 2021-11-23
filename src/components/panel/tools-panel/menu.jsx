import PropTypes from 'prop-types'
import Emoji from 'a11y-react-emoji'
import { FaEyeSlash, FaEye } from 'react-icons/fa'
import { useState } from 'react'

import { Icon } from '../__style__/admin-panel.style'
import { Ul, Li } from '../__style__/menu.style'
import useAcl from 'components/hooks/acl'

const Menu = ({ handleDragStart, handleDragEnd }) => {
  const { canRead } = useAcl({ type: `panels` })
  const [ defaultVisibility, setDefaultVisibility ] = useState(false)

  return (
    <Ul>
      {
        canRead && (
          <>
            <Li onClick={() => setDefaultVisibility(!defaultVisibility)}>
              { defaultVisibility ? <FaEye /> : <FaEyeSlash /> }
            </Li>
            <Li>
              <Icon draggable onDragStart={(e) => handleDragStart(e, 'z', defaultVisibility, '🧟')} onDragEnd={() => handleDragEnd()}>
                <Emoji symbol="🧟" label="z" />
              </Icon>
            </Li>
            <Li>
              <Icon draggable onDragStart={(e) => handleDragStart(e, 'vehicle', defaultVisibility, '🚗')} onDragEnd={() => handleDragEnd()}>
                <Emoji symbol="🚗" label="car" />
              </Icon>
            </Li>
            <Li>
              <Icon draggable onDragStart={(e) => handleDragStart(e, 'incident', defaultVisibility, '🪵')} onDragEnd={() => handleDragEnd()}>
                <Emoji symbol="🪵" label="incident" />
              </Icon>
            </Li>
          </>
        )
      }
      <Li>
        <Icon draggable onDragStart={(e) => handleDragStart(e, 'indicator', defaultVisibility, '❌')} onDragEnd={() => handleDragEnd()}>
          <Emoji symbol="❌" label="indicator" />
        </Icon>
      </Li>
    </Ul>
  )
}

Menu.propTypes = {
  handleDragStart: PropTypes.func.isRequired,
  handleDragEnd: PropTypes.func.isRequired,
}

export default Menu
