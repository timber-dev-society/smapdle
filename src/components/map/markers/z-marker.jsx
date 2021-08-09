import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Emoji from "a11y-react-emoji"

import { Wrapper } from './__style__/marker.style'

const skins = ['🧟', '🧟‍♂️', '🧟‍♀️']
const defaultVisibleAfter = 17.5

const ZMarker = ({ uid, map, skin, visibleAfter }) => {
  const [ isVisible, setIsVisible ] = useState(map.getZoom() > visibleAfter)
  const handleZoom = () => {
    if (isVisible !== (map.getZoom() > visibleAfter)) {
      setIsVisible(map.getZoom() > visibleAfter)
    }
  }

  useEffect(() => {
    map.on('zoom', handleZoom)

    return () => map.off('zoom', handleZoom)
  }, [ isVisible ])


  return (
    <>
      {isVisible && <Wrapper style={{fontSize:'24px'}}><Emoji symbol={skins[skin - 1]} label="z" /></Wrapper>}
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
