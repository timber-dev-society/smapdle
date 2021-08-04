import { render } from 'react-dom'
import { Provider } from 'react-redux'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import PlayerToken from '../components/map/markers/player-marker'
import ZToken from '../components/map/markers/z-marker'
import { firestore } from './firebase'
import store from '../store'

const tokens = {
  player: PlayerToken,
  z: ZToken,
}

export const positionToLngLat = position => ({ lng: position.longitude, lat: position.latitude })

export const renderToken = (marker, map) => {
  const container = document.createElement('div')
  const Token = tokens[marker.token]

  render(<Token {...marker} />, container)

  const ref = new mapboxgl.Marker(container)
                             .setLngLat(positionToLngLat(marker.position))
                             .setPitchAlignment('map')
                             .setDraggable(true)
                             .addTo(map)

  if (true) {
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
