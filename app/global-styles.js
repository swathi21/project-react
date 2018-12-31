import { createGlobalStyle } from 'styled-components';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/leaflet/dist/leaflet.css'
import '../node_modules/leaflet.markercluster/dist/MarkerCluster.css'; 
import '../node_modules/leaflet.markercluster/dist/MarkerCluster.Default.css'; 
import '../node_modules/react-leaflet-markercluster/dist/styles.min.css'; 


const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

nav {
  background-color:#000000 !important;
}

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
`;

export default GlobalStyle;
