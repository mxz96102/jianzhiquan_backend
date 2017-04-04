import React, { Component } from 'react'
import {findDOMNode} from 'react-dom'
import{ Table } from 'antd'



export default class Job extends Component {
  constructor(){
    super();
    this.state={
      columns : [{
        title: '兼职名称',
        dataIndex: 'jobname',
        key: 'jobname',
      }, {
        title: '最大人数',
        dataIndex: 'workernummax',
        key: 'workernummax',
      }, {
        title: '兼职状态',
        dataIndex: 'jobstate',
        key: 'jobstate',
      }, {
        title: '兼职要求',
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
