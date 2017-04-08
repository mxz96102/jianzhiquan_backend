import React, { Component } from 'react'
import {findDOMNode} from 'react-dom'
import{ Table } from 'antd'
import axios from "../axios";


export default class MarketDeal extends Component {
  constructor(){
    super();
    this.state={
      columns : [{
        title: '序号',
        dataIndex: 'id',
        key: 'id',
      }, {
        title: '名字',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '角色',
        dataIndex: 'role',
        key: 'role',
      }, {
        title: 'qq',
        dataIndex: 'qq',
        key: 'qq',
      }, {
        title: '手机',
        dataIndex: 'phonenum',
        key: 'phonenum',
      }, {
        title: '宿舍',
        dataIndex: 'dorm',
        key: 'dorm',
      }],
      data:[
        {name:"Loading"}
      ]
    }
  }


  componentDidMount(){
    let __this = this,i;

    axios.get("/job/getAllAtten?marketid="+this.props.marketid)
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
        <Table dataSource={this.state.data} columns={this.state.columns} />
      </div>
    )
  }
}
