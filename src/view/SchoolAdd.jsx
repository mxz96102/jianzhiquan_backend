import React, { Component } from 'react'
import {findDOMNode} from 'react-dom'
import { Form, Icon, Input, Button, Select } from 'antd';
import axios from '../axios'


export default class SchoolAdd extends Component {
  constructor(){
    super();
    this.state={
      opt:"985"
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    axios.get("/uni/createUniversity?uniname="+getByName("uniname")+"&address="+getByName("address")+"&level="+this.state.opt)
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
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label="学校名称">
            <Input name="uniname" type="text" autosize required/>
          </Form.Item>
          <Form.Item label="学校地区">
            <Input name="address" type="text" autosize required/>
          </Form.Item>

          <Form.Item label="学校等级">
            <Select name="level" defaultValue="985" onSelect={this.handleChange}>
              <Select.Option value="985">985</Select.Option>
              <Select.Option value="211">211</Select.Option>
              <Select.Option value="一本">一本</Select.Option>
              <Select.Option value="二本">二本</Select.Option>
              <Select.Option value="其他">其他</Select.Option>
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            提交
          </Button>
        </Form>
      </div>
    )
  }
}
