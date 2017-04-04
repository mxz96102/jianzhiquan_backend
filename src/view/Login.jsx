import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import axios from '../axios'

const FormItem = Form.Item;

export default class Login extends React.Component {
  handleSubmit = (e) => {
    let [passwd,username] = [document.getElementsByClassName('form-input')[1],document.getElementsByClassName('form-input')[0]];


    e.preventDefault();

    axios.get('auth/login?'+'phonenum='+username.value+'&credential='+passwd.value,{})
      .then(function (response) {
        let res = response.data;
        if(res.msg === 'SUCCESS'){
          location.hash='#/school'
        } else {
          alert("请检查手机号和密码")
        }
      })
      .catch(function (error) {
        alert('通信错误');
        console.log(error)
      });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem label="用户名">
            <Input className="form-input" prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="Username"/>
        </FormItem>
        <FormItem label="密码">
            <Input className="form-input" prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password" placeholder="Password"/>
        </FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登陆
          </Button>
      </Form>
    )
  }
}