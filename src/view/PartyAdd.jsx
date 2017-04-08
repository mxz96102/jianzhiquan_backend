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

    axios.get("/party/createParty?name="+getByName("name"))
      .then((res)=>{
        if(res.data.msg === "SUCCESS"){
          alert("提交成功");
          location.reload();
        }
      })
      .catch((error)=>{
        alert("通信错误")
      })
  }

  handleChange = (value) => {
    this.setState({
      opt : value
    })
  }

  componentDidMount(){

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
          <Form.Item label="圈子名称">
            <Input name="name" type="text" autosize required/>
          </Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            提交
          </Button>
        </Form>
      </div>
    )
  }
}
