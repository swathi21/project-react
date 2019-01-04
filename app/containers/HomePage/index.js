/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React,  { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import H2 from 'components/H2';
import ReposList from 'components/ReposList';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import  MarkerClusterGroup from 'react-leaflet-markercluster';
import L from 'leaflet';

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.PureComponent {


   constructor(props) {
  super(props);
  
  this.state = {
    hasLocation: false,
    lat: 51.505,
    lng: -0.09,
    zoom: 13,


    };

}
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
     this.props.onSubmitForm();
  }

onMarkerClick(evt) {
    console.log(evt);
  }


  render() {



    const { loading, error, repos } = this.props;
   
const position = [this.state.lat, this.state.lng]


    const reposListProps = {
      loading,
      error,
      repos,
    };



    const myIcon = L.icon({
                    iconUrl: require('../../../node_modules/leaflet/dist/images/marker-icon.png'),
                    iconSize: [20,30],
                    iconAnchor: [20,20],
                    popupAnchor: null,
                    shadowUrl: null,
                    shadowSize: null,
                    shadowAnchor: null
                });


var div = []
for(var i=0;i<repos.length;i++) {
  div.push(<Marker payload={repos[i].id} icon={myIcon} key={repos[i].id} position={repos[i].position} > 
    <Popup><div>

 <p>I am a lonely popup.</p>
</div></Popup></Marker>
)
}
  
    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <div  style={{padding:'10px',width:'100%',height:'500px'}}>

          <Map className="markercluster-map" style={{width:'100%',height:'100%'}} center={[36.733711, -119.800703]} zoom={4} maxZoom={18}>    
              <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup>
          <Fragment>{div}</Fragment>
        </MarkerClusterGroup>

      </Map>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: evt => dispatch(loadRepos()),
  };
}

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
