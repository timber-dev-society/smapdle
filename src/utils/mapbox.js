import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import { firestore } from './firebase'

// convert Firebase position into lngLat mapbox
export const positionToLngLat = position => ({ lng: position.longitude, lat: position.latitude })

export const createMarker = ({ el, map, position }) => {
  const marker = new mapboxgl.Marker(el)
                          .setLngLat(positionToLngLat(position))
                          .setPitchAlignment('map')
                          .addTo(map)

  return {
    item: marker,
    addControl: uid => {
      console.log(marker)
      const tokenRef = firestore.collection('markers').doc(uid)

      marker.setDraggable(true)
      marker.on('dragend', (event) => {
        const { lng, lat } = marker.getLngLat()
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
    },
  }
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
