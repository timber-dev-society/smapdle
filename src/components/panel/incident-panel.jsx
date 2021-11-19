import { useSelector } from 'react-redux'
import { createSelectorCreator, defaultMemoize } from 'reselect'

import { BasePanel } from './base/panel'
import { getSkin } from 'components/incident/skin'

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, (prev, next) => Object.keys(prev || {}).length === Object.keys(next || {}).length) 

const incidentSelector = createDeepEqualSelector(
  store => store.markers.incident,
  incidentMarkers => Object.keys(incidentMarkers).map(uid => ({ uid, position: incidentMarkers[uid].position }))
)

export const IncidentPanel = () => {
  const markers = useSelector(incidentSelector)
  const props = {
    getSkin,
    markers,
    markerType: 'incident',
    isHiddable: true,
  }

  return (
    <BasePanel style={{ left: 360 }} {...props} />
  )
}
