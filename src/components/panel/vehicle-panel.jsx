import { useSelector } from 'react-redux'
import { createSelectorCreator, defaultMemoize } from 'reselect'

import { BasePanel } from './base/panel'
import { getSkin } from 'components/vehicle/skin'

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, (prev, next) => Object.keys(prev || {}).length === Object.keys(next || {}).length) 

const vehicleSelector = createDeepEqualSelector(
  store => store.markers.vehicle,
  vehicleMarkers => Object.keys(vehicleMarkers).map(uid => ({ uid, position: vehicleMarkers[uid].position }))
)

export const VehiclePanel = () => {
  const markers = useSelector(vehicleSelector)
  const props = {
    getSkin,
    markers,
    markerType: 'vehicle',
  }

  return (
    <BasePanel style={{ bottom: 50, left: 310 }} {...props} />
  )
}
