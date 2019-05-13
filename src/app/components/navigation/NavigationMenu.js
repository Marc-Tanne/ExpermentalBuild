import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Menu } from 'antd';

class NavigationMenu extends Component {

  goToPath = (path) => {
    if (path === this.props.location.pathname) {
      window.window.scrollTo(0, 0);
    } else {
      this.props.history.push(path);
    }
  }

  render() {
    return (
      <Menu
        theme='dark'
        mode='horizontal'
        style={this.props.style}
        selectedKeys={[this.props.location.pathname]}
        defaultSelectedKeys={[this.props.location.pathname]}
        onClick={({key}) => this.goToPath(key)}>
        <Menu.Item key='/buy'>
          Buy
        </Menu.Item>
        <Menu.Item key='/sell'>
          Sell
        </Menu.Item>
        <Menu.Item key='/analytics'>
          Analytics
        </Menu.Item>
      </Menu>
    )
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavigationMenu));
