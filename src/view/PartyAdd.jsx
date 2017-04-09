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
      content:{},
      option:[],
      id:""
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    axios.get("/party/createParty?name="+getByName("name")+"&uniid="+this.state.id)
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

  handleChange(value){
    this.setState({
      id: value.split("-")[0]
    })

  }

  componentDidMount(){
    let __this = this;

    axios.get("/uni/allUniversity")
      .then((res)=>{
        let i,data = res.data.result;

        if(res.data.msg === "SUCCESS"){
          __this.state.option= [];
          for(i=0;i<data.length;i++){
            __this.state.option.push(<Select.Option key={data[i].id}>{data[i].id+"-"+data[i].uniname}</Select.Option>)
          }

          __this.setState({
            option : __this.state.option
          })
        }
      });

  }

  render () {
    let __this = this;

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label="圈子名称">
            <Input name="name" type="text" autosize required/>
          </Form.Item>
          <Form.Item label="学校">
            <Select style={{minWidth:"10rem"}} onSelect={this.handleChange.bind(this)} >
              {this.state.option}
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
