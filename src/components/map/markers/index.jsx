import { render } from 'react-dom'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import PlayerToken from './player-marker'
import ZToken from './z-marker'
import { firestore } from '../../../utils/firebase'

const tokens = {
  player: PlayerToken,
  z: ZToken,
}

const renderToken = (Token) => ({ lng, lat }) => {
  const container = document.createElement('div')
  const { uid, isDraggable, map } = Token.props

  render(Token, container)

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
        console.log("Document successfully updated!");
      }).catch((error) => {
        console.error("Error updating document: ", error);
      });
    })
  }

  return container
}

const Markers = ({ map }) => {
  const data = useSelector(({ app }) => app.markers)
  const markers = useRef(null)

  useEffect(() => {
    if (data.length === 0 || markers.current) return

    markers.current = data.map((m) => {
      const Token = tokens[m.token]
      return renderToken(<Token uid={m.uid} map={map.current} isDraggable />)({ lat: m.position.latitude, lng: m.position.longitude})
    })
  })


  return (
    <></>
  )
}

export default Markers
