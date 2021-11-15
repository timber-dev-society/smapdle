import { useSelector } from 'react-redux'
import { createSelectorCreator, defaultMemoize } from 'reselect'

import { BasePanel } from './base/panel'
import { getSkin } from 'components/vehicule/skin'

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, (prev, next) => Object.keys(prev || {}).length === Object.keys(next || {}).length) 

const vehiculeSelector = createDeepEqualSelector(
  store => store.markers.vehicule,
  vehiculeMarkers => Object.keys(vehiculeMarkers).map(uid => ({ uid, position: vehiculeMarkers[uid].position }))
)

export const VehiculePanel = () => {
  const markers = useSelector(vehiculeSelector)
  const props = {
    getSkin,
    markers,
    markerType: 'vehicule',
  }

  return (
    <BasePanel style={{ bottom: 50, left: 310 }} {...props} />
  )
}
