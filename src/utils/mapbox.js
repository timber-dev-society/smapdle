import { render } from 'react-dom'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import PlayerToken from '../components/map/markers/player-marker'
import ZToken from '../components/map/markers/z-marker'
import { firestore } from './firebase'

const tokens = {
  player: PlayerToken,
  z: ZToken,
}

const renderToken = () => {
  const container = document.createElement('div')
  const Token = tokens[m.token]

  render(<Token uid={uid} />, container)

  const marker = new mapboxgl.Marker(container)
                             .setLngLat({ lng, lat })
                             .setPitchAlignment('map')
                             .setDraggable(isDraggable)
                             .addTo(map)

  if (isDraggable) {
    const tokenRef = firestore.collection('markers').doc(uid)

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
  }

  return marker
}
