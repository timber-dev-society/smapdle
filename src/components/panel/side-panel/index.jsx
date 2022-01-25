import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'



import config from 'utils/app-config'

export const SidePanel = ({ style }) => {

  const ref = useRef(null)
  // const map = useSelector(state => state.app.map)

  useEffect(() => {
    if (ref.current) { return }
    /*

    const geocoder = new MapboxGeocoder({
      accessToken: config.mapbox.accessToken,
      mapboxgl: mapboxgl
    });

    document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
    */
  }, [ref])

  return (
    <div style={{ height: '100vh', ...style }}>
      <div id="geocoder" style={{ margin: '5%', width: '89%' }} />
    </div>
  )
}
