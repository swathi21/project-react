/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route, withRouter } from 'react-router-dom';

//import SideNav, { Nav,NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from 'containers/App/StyledSideNav';

import PropTypes from "prop-types";
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import HomePage from 'containers/HomePage/Loadable';
import RolesPage from 'containers/RolesPage/Loadable';
import PolicyPage from 'containers/PolicyPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';

import GlobalStyle from '../../global-styles';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIgloo } from '@fortawesome/free-solid-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faBook } from '@fortawesome/free-solid-svg-icons'
library.add(faIgloo)
library.add(faHome)
library.add(faUser)
library.add(faBook)


const navWidthCollapsed = 64;
const navWidthExpanded = 180;

const NavHeader = styled.div`
    display: ${props => (props.expanded ? 'block' : 'none')};
    white-space: nowrap;
    color: #fff;
    > * {
        color: inherit;
        background-color: inherit;
    }
`;

const NavTitle = styled.div`
    font-size: 1em;
    line-height: 20px;
    padding: 20px 0;
`;


const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;


class App extends React.Component{
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  constructor(props) {
  super(props);
  var url = window.location.pathname.replace("/", "");
  if(url ==""){
  url = "home"
}
  this.state = {
        selected: url,
        expanded: false
    };

}

onSelect = (selected) => {
  const { match, location, history } = this.props;
        this.setState({ selected: selected });
        const to = '/' + selected;
                    if (window.location.pathname !== to) {
                        history.push(to);
                    }
    };
    onToggle = (expanded) => {
        this.setState({ expanded: expanded });
    };

  render() {
    const { match, location, history } = this.props;
    const { expanded, selected } = this.state;
  return (
    <div className="container-fluid">

      <Helmet
        titleTemplate="%s - Google Maps"
        defaultTitle=" Google Maps">
        <meta name="description" content=" Google Maps" />
      </Helmet>
      <Header />
      <SideNav style={{ minWidth: expanded ? navWidthExpanded : navWidthCollapsed }} onSelect={this.onSelect} onToggle={this.onToggle}>
                <SideNav.Toggle />
                <NavHeader expanded={expanded}>
                        <NavTitle>Companys</NavTitle>

                    </NavHeader>

                <Nav selected={selected} defaultSelected={selected}>
                    <NavItem eventKey="home">
                        <NavIcon>
                         <FontAwesomeIcon icon="home" /> 
                        </NavIcon>
                        <NavText title="home">
                            Home
                        </NavText>
                    </NavItem>
                     <NavItem eventKey="policy">
                     <NavIcon>
                         <FontAwesomeIcon icon="book" />    
                        </NavIcon>
                        <NavText title="policy">
                            Policy
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="roles">
                        <NavIcon>
                            <FontAwesomeIcon icon="user" /> 
                        </NavIcon>
                        <NavText title="roles">
                            Roles
                        </NavText>
                    </NavItem>
                </Nav>
            </SideNav>
            <div style={{
                        marginLeft: expanded ? 180 : 64,
                        padding: '15px 20px 0 20px'
                    }}>
      <Switch>
        <Route exact path="/" component={HomePage} />     
        <Route exact path="/home" component={HomePage} />                                                                                                                                                  
        <Route path="/policy" component={PolicyPage} />                                                                                            
        <Route path="/roles" component={RolesPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
     </div>

      <GlobalStyle />
    </div>
  );
}
}
export default withRouter(App);

