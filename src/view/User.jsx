import React, { Component } from 'react'
import {findDOMNode} from 'react-dom'
import{ Table, Input, Modal, message, Select } from 'antd'
import axios from "../axios";
import UserDetail from './UserDetail'

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
        title: '校区',
        dataIndex: 'dorm',
        key: 'dorm',
      }, {
        title: '宿舍',
        dataIndex: 'area',
        key: 'area',
      }, {
        title: '余额',
        dataIndex: 'balance',
        key: 'balance',
      }],
      data:[
        {uniname:"Loading"}
      ],
      filterDropdownVisible: false,
      searchText: '',
      filtered: false,
      school:[],
    }
  }

  onSchool(value){
    let __this = this

    if(value.split('-')[0] == '0'){
      axios.get("/user/allUser")
        .then(function (res) {
          if(res.data.msg === "SUCCESS"){
            __this.setState({
              data : res.data.result
            })
          }
        })
    }else
      axios.get("/user/allUser")
        .then(function (res) {
          if(res.data.msg === "SUCCESS"){
            __this.setState({
              data : res.data.result.filter(function (e) {
                return e.uniid == value.split('-')[0]
              })
            })
          }
        })
  }

  onSearch(value){
    let __this = this,i;

    if(value === ""){
      axios.get("/user/allUser")
        .then(function (res) {
          if(res.data.msg === "SUCCESS"){
            __this.setState({
              data : res.data.result
            })
          }
        })
    }else
      axios.get("/user/allUser")
        .then(function (res) {
          if(res.data.msg === "SUCCESS"){
            __this.setState({
              data : res.data.result.filter(function (e) {
                return (e.username+'').includes(value)
              })
            })
          }
        })
  }

  getDetail(userid){
    Modal.info({ width : '80vw',content:(<UserDetail userid={userid}/>)})
  }

  componentDidMount(){
    let __this = this,i;

    axios.get("/uni/allUniversity")
      .then((res)=>{
        let j,data = res.data.result;

        if(res.data.msg === "SUCCESS"){
          __this.state.school= [];
          for(j=0;j<data.length;j++){
            __this.state.school.push(<Select.Option key={data[j].id}>{data[j].id+"-"+data[j].uniname}</Select.Option>)
          }

          __this.setState({
            school : __this.state.school
          })
        }
      });


    axios.get("/user/allUser")
      .then(function (res) {
        if(res.data.msg === "SUCCESS"){
          for(i=0;i<res.data.result.length;i++){
            res.data.result[i].balance = (<span style={{cursor:'pointer'}} onClick={__this.getDetail.bind(__this,parseInt(res.data.result[i].id))}>{res.data.result[i].balance}</span>)
          }

          __this.setState({
            data : res.data.result
          })
        }
      })
  }

  render () {
    return (
      <div>
        <Input.Search
          placeholder="输入用户名字"
          style={{ width: 200 }}
          onSearch={this.onSearch.bind(this)}
        />
        学校：
        <Select style={{minWidth:"10rem"}} onSelect={this.onSchool.bind(this)} >
          <Select.Option key={0}>0-全部</Select.Option>
          {this.state.school}
        </Select>
        <Table style={{width:"70vw"}} dataSource={this.state.data} columns={this.state.columns} />
      </div>
    )
  }
}
