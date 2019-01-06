import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
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
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import L from 'leaflet';

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.PureComponent {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();

        this.state = {
            hasLocation: false,
            lat: 51.505,
            lng: -0.09,
            zoom: 13,
        };
        this.onMarkerClick = this.onMarkerClick.bind(this);
    }

    componentDidMount() {
        this.props.onSubmitForm();
    }

    onMarkerClick(evt) {
        console.log(evt);
        var obj = evt.latlng
        var html = evt.target.options.payload
        L.popup()
            .setLatLng(obj)
            .setContent(html)
            .openOn(evt.target._map);
    }

    render() {
        const { repos } = this.props;
        const myIcon = L.icon({
            iconUrl: require('../../images/laptop.png'),
            iconSize: [20, 30],
            iconAnchor: [20, 20],
            popupAnchor: null,
            shadowUrl: null,
            shadowSize: null,
            shadowAnchor: null
        });


        var div = []
        for (var i = 0; i < repos.length; i++) {
            var html = "<div>HostName: " + repos[i].hostname + "</div><br/><div>Mac Address: " + repos[i].macAddress + "</div><br/><div>Version: " + repos[i].version + "</div><br/><div>Zip Code: " + repos[i].zip_code + "</div><br/>"
            div.push(<Marker payload={html} icon={myIcon} key={repos[i].id} position={repos[i].position} onClick={this.onMarkerClick} />)
        }

        const createClusterCustomIcon = function (cluster) {
          return L.icon({
                iconUrl: require('../../../node_modules/leaflet/dist/images/marker-icon.png'),
                iconSize: [20, 30],
                iconAnchor: [20, 20],
                popupAnchor: null,
                shadowUrl: null,
                shadowSize: null,
                shadowAnchor: null
            });
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
                <div style={{ padding: '10px', width: '100%', height: '500px' }}>

                    <Map ref={this.myRef} 
                        className="markercluster-map" style={{ width: '100%', height: '100%' }} center={[36.733711, -119.800703]} zoom={4} maxZoom={18}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MarkerClusterGroup iconCreateFunction={createClusterCustomIcon}>
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