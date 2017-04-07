import React, { Component } from 'react'
import {findDOMNode} from 'react-dom'
import{ Table } from 'antd'
import axios from "../axios";


export default class MarketDeal extends Component {
  constructor(){
    super();
    this.state={
      columns : [{
        title: '姓名',
        dataIndex: 'marketname',
        key: 'marketname',
      }, {
        title: '电话',
        dataIndex: 'id',
        key: 'id',
      }, {
        title: 'qq',
        dataIndex: 'id',
        key: 'id',
      }, {
        title: '宿舍',
        dataIndex: 'id',
        key: 'id',
      }, {
        title: '创建人',
        dataIndex: 'id',
        key: 'id',
      }],
      data:[
        {name:"Loading"}
      ]
    }
  }


  componentDidMount(){
    let __this = this

    axios.get("/market/getAllMarket")
      .then(function (res) {
        if(res.data.msg === "SUCCESS"){
          __this.setState({
            data : res.data.result
          })
        }
      })
  }

  render () {
    return (
      <div>
        <Table style={{width:"50vw"}} dataSource={this.state.data} columns={this.state.columns} />
      </div>
    )
  }
}
