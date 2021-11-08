import { useSelector } from 'react-redux'
import { createSelectorCreator, defaultMemoize } from 'reselect'

import { getSkin } from 'components/z/skin'
import { BasePanel } from './base/panel'

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, (prev, next) => Object.keys(prev || {}).length === Object.keys(next || {}).length) 

const zombieSelector = createDeepEqualSelector(
  store => store.markers.z,
  zMarkers => Object.keys(zMarkers).map(uid => ({ uid, position: zMarkers[uid].position }))
)

export const ZPanel = () => {
  const markers = useSelector(zombieSelector)
  const props = {
    getSkin,
    markers,
    markerType: 'z',
  }

  return (
    <BasePanel style={{ bottom: 50, left: 50 }} {...props} />
  )
}
