import React, { Component } from 'react'
import {findDOMNode} from 'react-dom'
import { Form, Icon, Input, Button, Select } from 'antd';
import axios from '../axios'


export default class SchoolAdd extends Component {
  constructor(){
    super();
    this.state={
      opt:"",
      colleage:{},
      colleageid:"",
      content:{}
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    axios.get("/market/createMarket?marketname="+getByName("name")+
    "&grade"+getName("grade"))
      .then((res)=>{
        if(res.data.msg === "SUCCESS"){
          alert("提交成功");
          location.reload();
        }
      })
      .error((error)=>{
        alert("通信错误")
      })
  }

  handleChange = (value) => {
    this.setState({
      opt : value
    })
  }

  componentDidMount(){
    axios.post("user/userInfo")
      .then((res)=>{
        console.log(res);
        if(res.data.code === '401'){
          alert('请登录')
          location.hash = '/'
        }else
          __this.result = res.data.result;
      })
  }

  render () {
    let __this = this;

    axios.get("/getAllColleage")
      .then((res)=>{
        if(res.data.msg === "SUCCESS"){
          __this.colleage = res.data.result
        }
      })

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label="班级名称">
            <Input name="uniname" type="text" autosize required/>
          </Form.Item>
          <Form.Item label="年级">
            <Input name="grade" type="text" autosize required/>
          </Form.Item>
          <Form.Item label="学院">
            <Input name="colleage" type="text" autosize required/>
          </Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            提交
          </Button>
        </Form>
      </div>
    )
  }
}
