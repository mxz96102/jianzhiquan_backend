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
        dataIndex: 'uniname',
        key: 'uniname',
      }, {
        title: '名称',
        dataIndex: 'partyname',
        key: 'partyname',
      }, {
        title: '圈主',
        dataIndex: 'ownername',
        key: 'ownername',
      }, {
        title: '总兼职',
        dataIndex: 'allJobnum',
        key: 'allJobnum',
      }, {
        title: '总人数',
        dataIndex: 'allMembernum',
        key: 'allMembernum',
      }, {
        title: '总收益',
        dataIndex: 'allIncomenum',
        key: 'allIncomenum',
      }, {
        title: '注册链接',
        dataIndex: 'link',
        key: 'link',
      }, {
        title: '新注册',
        dataIndex: 'newMembernum',
        key: 'newMembernum',
      }, {
        title: '新次数',
        dataIndex: 'newJobnum',
        key: 'newJobnum',
      }, {
        title: '新收益',
        dataIndex: 'newIncomenum',
        key: 'newIncomenum',
      }],
      data:[
        {uniname:"Loading"}
      ]
    }
  }

  componentDidMount(){
    let __this = this,i;

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
