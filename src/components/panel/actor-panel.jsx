import { useSelector } from 'react-redux'
import { createSelectorCreator, defaultMemoize } from 'reselect'

import { BasePanel } from './base/panel'
import { getSkin } from 'components/markers/actor/skin'

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, (prev, next) => Object.keys(prev || {}).length === Object.keys(next || {}).length) 

const actorSelector = createDeepEqualSelector(
  store => store.markers.actor,
  actorMarkers => Object.keys(actorMarkers).map(uid => ({ uid, position: actorMarkers[uid].position }))
)

export const ActorPanel = () => {
  const markers = useSelector(actorSelector)
  const props = {
    getSkin,
    markers,
    markerType: 'actor',
    isHiddable: false,
  }

  return (
    <BasePanel style={{ left: 360 }} {...props} />
  )
}
