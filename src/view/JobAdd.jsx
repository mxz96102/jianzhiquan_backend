import React, { Component } from 'react'
import {findDOMNode} from 'react-dom'
import { Form, Icon, Input, Button, Select, DatePicker } from 'antd';
import axios from '../axios'


export default class SchoolAdd extends Component {
  constructor(){
    super();
    this.state={
      start:"",
      end:""
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    axios.get("/job/publish?jobname=" + getByName("jobname")+
      "&request="+getByName("request") +
      "&description="+getByName("description") +
      "&salary="+getByName("salary") +
      "&workernummax="+getByName("workernummax") +
      "&fromtime="+this.state.start +
      "&untiltime="+this.state.end +
      "&time="+getByName("time") +
      "&place="+getByName("place")+
      "&uniid="+getByName("uniid"))
      .then((res)=>{
        if(res.data.msg === "SUCCESS"){
          alert("提交成功");
          location.reload();
        } else {
          alert("请检查信息，重新提交")
        }
      })
      .error((error)=>{
        alert("通信错误")
      })
  }

  handleStart = (value) => {
    let date = new Date(value);
    this.setState({
      start : date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate() +" 00:00:00"
    })
  }

  handleEnd = (value) => {
    let date = new Date(value);

    this.setState({
      end : date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate() +" 00:00:00"
    })
  }

  componentDidMount(){

  }

  render () {
    const dateFormat = 'YYYY-MM-DD';

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label="兼职名称">
            <Input name="jobname" type="text" autosize required/>
          </Form.Item>
          <Form.Item label="兼职要求">
            <Input name="request" type="text" autosize required/>
          </Form.Item>
          <Form.Item label="准确薪水">
            <Input name="salary" type="text" autosize required/>
          </Form.Item>
          <Form.Item label="开始时间">
            <DatePicker onChange={this.handleStart} format={dateFormat} required/>
          </Form.Item>
          <Form.Item label="结束时间">
            <DatePicker onChange={this.handleEnd} format={dateFormat} required/>
          </Form.Item>
          <Form.Item label="最大兼职人数">
            <Input name="workernummax" placeholder="请输入数字，例如：12" type="text" autosize required/>
          </Form.Item>
          <Form.Item label="每日工作时间">
            <Input name="time" type="text" autosize required/>
          </Form.Item>
          <Form.Item label="工作地点">
            <Input name="place" type="text" autosize required/>
          </Form.Item>
          <Form.Item label="学校id">
            <Input name="uniid" type="text" placeholder="请从管理学校获得" autosize required/>
          </Form.Item>
          <Form.Item label="兼职描述">
            <Input name="description" type="textarea" autosize={{ minRows: 2, maxRows: 6 }} required/>
          </Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            提交
          </Button>
        </Form>
      </div>
    )
  }
}
