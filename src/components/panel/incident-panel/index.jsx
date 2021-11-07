import { useSelector } from 'react-redux'
import { createSelectorCreator, defaultMemoize } from 'reselect'

import useAcl from 'components/hooks/acl'
import BaseContainer, { BasePanel } from '../base-panel'
import { getSkin } from 'components/incident/skin'

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, (prev, next) => Object.keys(prev || {}).length === Object.keys(next || {}).length) 

const incidentSelector = createDeepEqualSelector(
  store => store.markers.incident,
  incidentMarkers => Object.keys(incidentMarkers).map(uid => ({ uid, position: incidentMarkers[uid].position }))
)

const IncidentPanel = () => {
  const markers = useSelector(incidentSelector)
  const { canRead } = useAcl({ type: `incidentpanel`, owner: false })
  const props = {
    canRead,
    getSkin,
    markers,
    markerType: 'incident',
  }

  return (
    <BasePanel style={{ bottom: 50, left: 150 }} {...props} />
  )
}

const Container = () => (
  <BaseContainer>
    <IncidentPanel />
  </BaseContainer>
)

export default Container
