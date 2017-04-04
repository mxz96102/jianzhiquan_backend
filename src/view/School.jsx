import React, { Component } from 'react'
import {findDOMNode} from 'react-dom'
import{ Table } from 'antd'
import axios from "../axios";


export default class School extends Component {
  constructor(){
    super();
    this.state={
      columns : [{
        title: '学校名称',
        dataIndex: 'uniname',
        key: 'uniname',
      }, {
        title: '归属地',
        dataIndex: 'address',
        key: 'address',
      }, {
        title: '学校层次',
        dataIndex: 'level',
        key: 'level',
      }, {
        title: '院系数',
        dataIndex: 'colleagenum',
        key: 'colleagenum',
      }, {
        title: '班级数',
        dataIndex: 'buildnum',
        key: 'buildnum',
      },],
      data:[
        {uniname:"Loading"}
      ]
    }
  }


  componentDidMount(){
    let __this = this

    axios.get("/uni/allUniversity")
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
