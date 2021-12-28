import { useEffect } from "react";
import L from "leaflet";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl-leaflet";
import PropTypes from "prop-types";
import { useMap } from "react-leaflet";

const MapBoxGLLayer = (props) => {
  const map = useMap()

  useEffect(() => L.mapboxGL(props).addTo(map))

  return null
}

/*
 * Props are the options supported by Mapbox Map object
 * Find options here:https://www.mapbox.com/mapbox-gl-js/api/#new-mapboxgl-map-options-
 */
MapBoxGLLayer.propTypes = {
  accessToken: PropTypes.string.isRequired,
  style: PropTypes.string
};

MapBoxGLLayer.defaultProps = {
  style: "mapbox://styles/mapbox/streets-v11"
};


export default MapBoxGLLayer;
