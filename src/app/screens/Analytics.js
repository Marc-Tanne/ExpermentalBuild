import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import { analyticsActionCreator } from '../redux/analytics/actions';
import moment from 'moment';

class Analytics extends Component {
  constructor(props) {
    super(props);
    this.props.analyticsActionCreator();
  }

  render() {
    return (
      <div>
        <Table
          style={{margin: '0 auto'}}
          dataSource={this.props.financialData}
          columns={
            [
              {
                title: 'Net Profit',
                dataIndex: 'netProfit',
                key: 'netProfit',
                align: 'center',
                fixed: 'left'
              },
              {
                title: 'Sold Product',
                dataIndex: 'soldBananas',
                key: 'soldBananas',
                align: 'center'
              },
              {
                title: 'Sold Product Value',
                dataIndex: 'soldBananasValue',
                key: 'soldBananasValue',
                align: 'center'
              },
              {
                title: 'Unexpired Inventory',
                dataIndex: 'unexpiredBananasInInventory',
                key: 'unexpiredBananasInInventory',
                align: 'center'
              },
              {
                title: 'Unexpired Inventory Value',
                dataIndex: 'unexpiredBananasValue',
                key: 'unexpiredBananasValue',
                align: 'center'
              },
              {
                title: 'Expired Inventory',
                dataIndex: 'expiredBananasInInventory',
                key: 'expiredBananasInInventory',
                align: 'center'
              },
              {
                title: 'Expired Inventory Value',
                dataIndex: 'expiredBananasValue',
                key: 'expiredBananasValue',
                align: 'center'
              }
            ]
          }
          pagination={false}
          scroll={{ x: 1000 }}
        />
        <Table
          style={{margin: '0 auto'}}
          dataSource={this.props.inventory}
          columns={
            [
              {
                title: 'Inventory Id',
                dataIndex: 'id',
                key: 'id',
                align: 'center',
                width: '34%',
              },
              {
                title: 'Buy Date',
                dataIndex: 'buyDate',
                key: 'buyDate',
                sorter: (a, b) => moment(a.buyDate, 'YYYY-MM-DD').diff(moment(b.buyDate, 'YYYY-MM-DD')),
                sortDirections: ['ascend', 'descend'],
                align: 'center',
                width: '33%'
              },
              {
                title: 'Sell Date',
                dataIndex: 'sellDate',
                key: 'sellDate',
                sorter: (a, b) => moment(a.sellDate, 'YYYY-MM-DD').diff(moment(b.sellDate, 'YYYY-MM-DD')),
                sortDirections: ['ascend', 'descend'],
                align: 'center',
                width: '33%'
              }
            ]
          }
          pagination={{ pageSize: 30 }}
          scroll={{ x: 600, y: 390 }}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    financialData: state.analytics.financialData,
    inventory: state.analytics.inventory
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    analyticsActionCreator: (variable) => dispatch(analyticsActionCreator(variable))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Analytics);
