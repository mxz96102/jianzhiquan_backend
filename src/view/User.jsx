import React, { Component } from 'react'
import {findDOMNode} from 'react-dom'
import{ Table } from 'antd'
import axios from "../axios";


export default class User extends Component {
  constructor(){
    super();
    this.state={
      columns : [{
        title: '学校名',
        dataIndex: 'jobname',
        key: 'jobname',
      }, {
        title: '圈子',
        dataIndex: 'workernummax',
        key: 'workernummax',
      }, {
        title: '姓名',
        dataIndex: 'jobstate',
        key: 'jobstate',
      }, {
        title: '性别',
        dataIndex: 'request',
        key: 'request',
      }, {
        title: '手机',
        dataIndex: 'request',
        key: 'request',
      }, {
        title: 'qq',
        dataIndex: 'request',
        key: 'request',
      }, {
        title: '学院',
        dataIndex: 'request',
        key: 'request',
      }, {
        title: '年级',
        dataIndex: 'request',
        key: 'request',
      }, {
        title: '班级',
        dataIndex: 'request',
        key: 'request',
      }, {
        title: '楼栋',
        dataIndex: 'request',
        key: 'request',
      }, {
        title: '余额',
        dataIndex: 'request',
        key: 'request',
      }],
      data:[
        {uniname:"Loading"}
      ]
    }
  }


  componentDidMount(){
    let __this = this

    axios.get("/job/getAllJob")
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
