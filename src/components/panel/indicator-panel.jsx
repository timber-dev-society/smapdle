import { useSelector } from 'react-redux'
import { createSelectorCreator, defaultMemoize } from 'reselect'

import { BasePanel } from './base/panel'
import { getSkin } from 'components/indicator/skin'

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, (prev, next) => Object.keys(prev || {}).length === Object.keys(next || {}).length) 

const indicatorSelector = createDeepEqualSelector(
  store => store.markers.indicator,
  indicatorMarkers => Object.keys(indicatorMarkers).map(uid => ({ uid, position: indicatorMarkers[uid].position }))
)

export const IndicatorPanel = () => {
  const markers = useSelector(indicatorSelector)
  const props = {
    getSkin,
    markers,
    markerType: 'indicator',
  }

  return (
    <BasePanel style={{ left: 50 }} {...props} />
  )
}
