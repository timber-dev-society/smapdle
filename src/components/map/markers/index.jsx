import { render } from 'react-dom'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import PlayerToken from './player-marker'
import ZToken from './z-marker'
import CssHack from './css-hack'
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
      })
    })
  }

  return marker
}

const Markers = ({ map }) => {
  const data = useSelector(({ app }) => app.markers)
  const markers = useRef(null)
  console.log({markers: data, ref: markers?.current})

  useEffect(() => {
    if (data.length === 0) { return }
    if (markers.current) {
      data.every(({ uid, position }) => {
        console.log(uid)
        markers.current[uid].setLngLat({ lng: position.longitude, lat: position.latitude })
      })

      return
    }

    markers.current = data.reduce((acc, m) => {
      const Token = tokens[m.token]
      const marker = renderToken(<Token uid={m.uid} map={map.current} isDraggable />)({ lat: m.position.latitude, lng: m.position.longitude})

      return {
        ...acc,
        [m.uid]: marker,
      }
    }, {})
  })


  return (
    <CssHack map={map} />
  )
}

export default Markers
