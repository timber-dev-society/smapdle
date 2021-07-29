import { useState } from 'react'
import PropTypes from 'prop-types'
import Emoji from "a11y-react-emoji"

import { Wrapper } from './__style__/marker.style'

const skins = ['🧟', '🧟‍♂️', '🧟‍♀️']
const defaultVisibleAfter = 17.5

const ZMarker = ({ map, skin, visibleAfter }) => {
  const [ zoom, setZoom ] = useState(map.getZoom())

  map.on('zoom', () => {
    setZoom(map.getZoom())
  })

  return (
    <>
      {visibleAfter < zoom && <Wrapper style={{fontSize:'24px'}}><Emoji symbol={skins[skin - 1]} label="z" /></Wrapper>}
    </>
  )
}

ZMarker.propTypes = {
  map: PropTypes.object.isRequired,
  skin: PropTypes.number,
  visibleAfter: PropTypes.number,
}

ZMarker.defaultProps = {
  skin: 1,
  visibleAfter: defaultVisibleAfter,
};

export default ZMarker
