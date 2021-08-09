import { render } from 'react-dom'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import PlayerToken from '../components/map/markers/player-marker'
import ZToken from '../components/map/markers/z-marker'
import { firestore } from './firebase'

const tokens = {
  player: PlayerToken,
  z: ZToken,
}

// convert Firebase position into lngLat mapbox
export const positionToLngLat = position => ({ lng: position.longitude, lat: position.latitude })

// render a token in the map
export const renderToken = (marker, map, user) => {
  const container = document.createElement('div')
  const Token = tokens[marker.token]
  const canControl = marker.owner === user.uid

  render(<Token map={map} {...marker} />, container)

  const ref = new mapboxgl.Marker(container)
                          .setLngLat(positionToLngLat(marker.position))
                          .setPitchAlignment('map')
                          .setDraggable(canControl)
                          .addTo(map)

  if (canControl) {
    const tokenRef = firestore.collection('markers').doc(marker.uid)

    ref.on('dragend', (event) => {
      const { lng, lat } = ref.getLngLat()
      tokenRef.update({
        position: {
          latitude: lat,
          longitude: lng,
        }
      }).then(() => {
        console.log("Document successfully updated!")
      }).catch((error) => {
        console.error("Error updating document: ", error)
      })
    })
  }

  return ref
}

export const getMousePosition = ({ clientX, clientY }, map) => {
  const el = map.getCanvasContainer()
  const rect = el.getBoundingClientRect()
  const scaling = el.offsetWidth === rect.width ? 1 : el.offsetWidth / rect.width;

  const point = new mapboxgl.Point(
      (clientX - rect.left) * scaling,
      (clientY - rect.top) * scaling
  )

  return map.unproject(point)
}
