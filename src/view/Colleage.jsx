import React, { Component } from 'react'
import {findDOMNode} from 'react-dom'
import{ Table, Form, Input, Button } from 'antd'
import axios from "../axios";


export default class Colleage extends Component {
  constructor(){
    super();
    this.state={
      columns : [{
        title: '学院序号',
        dataIndex: 'marketname',
        key: 'marketname',
      }, {
        title: '学院名称',
        dataIndex: 'id',
        key: 'id',
      }, {
        title: '授权人',
        dataIndex: 'colleage',
        key: 'colleage',
      }],
      data:[
        {name:"Loading"}
      ]
    }
  }

  addColleage(){
    let content = document.getElementsByName("unicolleage")[0],__this = this;

    if(content.value.length > 0){
      axios.get('/uni/createColleage?colleagename='+content.value+'&uniid='+this.props.uniid)
        .then(function (res) {
          if(res.data.msg === "SUCCESS") {
            content.value = "";
            axios.get("/uni/allColleage?uniid="+__this.props.uniid)
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

    axios.get("/uni/allColleage?uniid="+this.props.uniid)
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
        <Table dataSource={this.state.data} columns={this.state.columns} />
        <Form.Item>
          <Input name="unicolleage" style={{ width: '75%' }} placeholder="学院名称" required/>
          <Button onClick={this.addColleage.bind(this)} type="primary" style={{ width: '20%' }}>添加</Button>
        </Form.Item>
      </div>
    )
  }
}
