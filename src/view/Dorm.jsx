import React, { Component } from 'react'
import {findDOMNode} from 'react-dom'
import{ Table, Form, Input, Button } from 'antd'
import axios from "../axios";


export default class Dorm extends Component {
  constructor(){
    super();
    this.state={
      columns : [{
        title: '楼栋序号',
        dataIndex: 'id',
        key: 'id',
      }, {
        title: '楼栋名称',
        dataIndex: 'dormname',
        key: 'dormname',
      }],
      data:[
        {buildname:"Loading"}
      ]
    }
  }

  addDorm(){
    let content = document.getElementsByName("unidorm")[0],__this = this;

    if(content.value.length > 0){
      axios.get('/uni/createDorm?dormname='+content.value+'&uniid='+this.props.uniid)
        .then(function (res) {
          if(res.data.msg === "SUCCESS") {
            content.value = "";
            axios.get("/uni/allDorm?uniid="+__this.props.uniid)
              .then(function (res) {
                if(res.data.msg === "SUCCESS"){
                  __this.setState({
                    data : res.data.result
                  })
                }
              })
          }
        })
    }
  }

  componentDidMount(){
    let __this = this;

    axios.get("/uni/allDorm?uniid="+this.props.uniid)
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
        <Table defaultPageSize="6" dataSource={this.state.data} columns={this.state.columns} />
        <Form.Item>
          <Input name="unidorm" style={{ width: '66%' }} placeholder="楼栋名称" required/>
          <Button onClick={this.addDorm.bind(this)} type="primary" style={{ width: '30%' }}>添加</Button>
        </Form.Item>
      </div>
    )
  }
}
