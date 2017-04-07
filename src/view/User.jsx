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
        dataIndex: 'university.uniname',
        key: 'university.uniname',
      }, {
        title: '圈子',
        dataIndex: 'party',
        key: 'party',
      }, {
        title: '姓名',
        dataIndex: 'username',
        key: 'username',
      }, {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
      }, {
        title: '手机',
        dataIndex: 'phonenum',
        key: 'phonenum',
      }, {
        title: 'qq',
        dataIndex: 'qq',
        key: 'qq',
      }, {
        title: '学院',
        dataIndex: 'colleage',
        key: 'colleage',
      }, {
        title: '年级',
        dataIndex: 'grade',
        key: 'grade',
      }, {
        title: '班级',
        dataIndex: 'clazz',
        key: 'clazz',
      }, {
        title: '楼栋',
        dataIndex: 'dorm',
        key: 'dorm',
      }, {
        title: '余额',
        dataIndex: 'balance',
        key: 'balance',
      }],
      data:[
        {uniname:"Loading"}
      ]
    }
  }


  componentDidMount(){
    let __this = this

    axios.get("/user/allUser")
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
