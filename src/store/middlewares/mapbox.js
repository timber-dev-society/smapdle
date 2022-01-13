import { createMiddleware } from 'utils/app-func'
import { FLY_TO } from '../../actions'
import { positionToLngLat } from '../../utils/mapbox'

const mapbox = createMiddleware({
  name: 'Mapbox',
  middleware: {
    [FLY_TO]: ({ getState }) => ({ store }) => {
      const { map } = store.getState().app
      const { lng, lat } = positionToLngLat(getState().app.flyTo)

      map.flyTo({ center: [lng, lat] })
    }
  }
})

export default mapbox
