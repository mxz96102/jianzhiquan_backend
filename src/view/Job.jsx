import React, { Component } from 'react'
import {findDOMNode} from 'react-dom'
import{ Table } from 'antd'
import axios from "../axios";


export default class Job extends Component {
  constructor(){
    super();
    this.state={
      columns : [{
        title: '学校',
        dataIndex: 'jobname',
        key: 'jobname',
      }, {
        title: '兼职类型',
        dataIndex: 'workernummax',
        key: 'workernummax',
      }, {
        title: '兼职标题',
        dataIndex: 'jobstate',
        key: 'jobstate',
      }, {
        title: '开始时间',
        dataIndex: 'request',
        key: 'request',
      }, {
        title: '结束时间',
        dataIndex: 'request',
        key: 'request',
      }, {
        title: '兼职时段',
        dataIndex: 'request',
        key: 'request',
      }, {
        title: '工作地点',
        dataIndex: 'request',
        key: 'request',
      }, {
        title: '招聘人数',
        dataIndex: 'request',
        key: 'request',
      }, {
        title: '工资待遇',
        dataIndex: 'request',
        key: 'request',
      }, {
        title: '兼职情况',
        dataIndex: 'request',
        key: 'request',
      }, {
        title: '链接',
        dataIndex: 'request',
        key: 'request',
      }, {
        title: '状态',
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
