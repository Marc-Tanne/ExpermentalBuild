import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import NavigationMenu from './NavigationMenu';

import Buy from '../../screens/Buy';
import Sell from '../../screens/Sell';
import Analytics from '../../screens/Analytics';

import { Layout } from 'antd';
const { Header, Content } = Layout;

class AppRouter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // place localized initial state here
    }
  }

  render() {
    return (
      <Router>
        <Layout>
          <Header style={styles.header}>
            <NavigationMenu style={styles.menu}/>
          </Header>

          <Content style={styles.content}>
            <Switch>
              <Route exact path='/buy' component={Buy} />
              <Route exact path='/sell' component={Sell} />
              <Route exact path='/analytics' component={Analytics} />

              <Redirect to='/analytics' />
            </Switch>
          </Content>
        </Layout>
      </Router>
    )
  }
}

const styles = {
  header: {
    padding: 0,
    height: '50px',
    position: 'fixed',
    width: '100%',
    zIndex: 1 // Required for Content to scroll under Header
  },
  headerButton: {
    color: 'white',
    float: 'right',
    marginTop: -55,
    marginRight: 20
  },
  menu: {
    lineHeight: '50px'
  },
  content: {
    marginTop: 60,
    zIndex: 0 // Required for Content to scroll under Header
  }
}

const mapStateToProps = (state) => {
  return {
    // Enter any state to props conversions here
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // Enter any redux dispatch action creator functions you want to use here
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
