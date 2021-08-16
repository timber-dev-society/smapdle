import { useRef, useEffect, useState, Profiler } from 'react'
import { useDispatch } from 'react-redux'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import styled from 'styled-components'

import Markers from './markers'
import Events from './events'
import { setMap, createMarkerAtPositon } from '../../actions'

import 'mapbox-gl/dist/mapbox-gl.css'

const MapDiv = styled.div`
  height: 100vh;
  width: 100vw;
`

mapboxgl.accessToken = 'pk.eyJ1Ijoiam9saW5lNmIiLCJhIjoiY2tyaGdtbHVxMDhyMjJwcGV2c3IwenB5dyJ9.TjhnAgs9IG99q2HhmAqlZg';

const Map = () => {
    const mapContainer = useRef(null)
    const map = useRef(null)
    const dispatch = useDispatch()
    const [ isLoaded, setIsLoaded ] = useState(false)
    const handleDrop = (event) => {
       event.stopPropagation()
       event.preventDefault()
       dispatch(createMarkerAtPositon(event))
    }

    useEffect(() => {
        if (map.current) return; // initialize map only once

        // Init map position
        const lng = window.localStorage.getItem('lng') || -70.9
        const lat = window.localStorage.getItem('lat') || 42.35
        const zoom = window.localStorage.getItem('zoom') || 9

        // create map
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/joline6b/ckrjlmvix8ffu17ny2vaseowq',
            center: [ lng, lat ],
            zoom: zoom
        })

        // save map in store
        dispatch(setMap(map.current))


        // attach basic controllers
        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

        map.current.addControl(new mapboxgl.ScaleControl(), 'bottom-right')

        // attach map listeners
        map.current.on('load', () => {

          setIsLoaded(true)
          var layers = map.current.getStyle().layers;
          var labelLayerId;
          for (var i = 0; i < layers.length; i++) {
            if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
              labelLayerId = layers[i].id;
              break;
            }
          }

          // The 'building' layer in the Mapbox Streets
          // vector tileset contains building height data
          // from OpenStreetMap.
          /*map.current.addLayer({
            'id': 'add-3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 15,
            'paint': {
              'fill-extrusion-color': '#aaa',

              // Use an 'interpolate' expression to
              // add a smooth transition effect to
              // the buildings as the user zooms in.
              'fill-extrusion-height': [
                'interpolate',
                ['linear'],
                ['zoom'],
                15,
                0,
                15.05,
                ['get', 'height']
              ],
              'fill-extrusion-base': [
                'interpolate',
                ['linear'],
                ['zoom'],
                15,
                0,
                15.05,
                ['get', 'min_height']
              ],
              'fill-extrusion-opacity': 0.8
            }
          },
          labelLayerId
        );*/
        })

        map.current.on('zoomend', () => {
          window.localStorage.setItem('zoom', map.current.getZoom())
        })

        map.current.on('moveend', () => {
          const { lng, lat } = map.current.getCenter();
          window.localStorage.setItem('lng', lng)
          window.localStorage.setItem('lat', lat)
        })

        // map.current.on('dragend', () => {
        //   const { lng, lat } = map.current.getCenter();
        //   console.log('dragend', lng, lat)
        // })

        // map.current.on('mouseenter', 'land', () => {
        //   console.log('dragend')
        // })

        // map.current.on('contextmenu', () => {
        //   console.log('contextmenu')
        // })
    })

    return (
        <>
          <Profiler id="map" onRender={console.log}>
            <MapDiv onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} ref={mapContainer} className="map-container" />
          </Profiler>
          <Profiler id="markers" onRender={console.log}>
            {isLoaded && <><Markers map={map} /><Events map={map} /></>}
          </Profiler>
        </>
    )
}

export default Map
