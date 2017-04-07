import React, { Component } from 'react'
import {findDOMNode} from 'react-dom'
import{ Table } from 'antd'
import axios from "../axios";


export default class Market extends Component {
  constructor(){
    super();
    this.state={
      columns : [{
        title: '学校',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '名称',
        dataIndex: 'id',
        key: 'id',
      }, {
        title: '圈主',
        dataIndex: 'ownerid',
        key: 'ownerid',
      }, {
        title: '主要学院',
        dataIndex: 'ownerid',
        key: 'ownerid',
      }, {
        title: '总监制',
        dataIndex: 'ownerid',
        key: 'ownerid',
      }, {
        title: '总次数',
        dataIndex: 'ownerid',
        key: 'ownerid',
      }, {
        title: '总收益',
        dataIndex: 'ownerid',
        key: 'ownerid',
      }, {
        title: '注册链接',
        dataIndex: 'ownerid',
        key: 'ownerid',
      }, {
        title: '新注册',
        dataIndex: 'ownerid',
        key: 'ownerid',
      }, {
        title: '新次数',
        dataIndex: 'ownerid',
        key: 'ownerid',
      }, {
        title: '新收益',
        dataIndex: 'ownerid',
        key: 'ownerid',
      }],
      data:[
        {name:"Loading"}
      ]
    }
  }


  componentDidMount(){
    let __this = this

    axios.get("/party/allParty")
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
