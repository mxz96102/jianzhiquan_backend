import React, { Component } from 'react'
import {findDOMNode} from 'react-dom'
import{ Table, Form, Input, Button, message } from 'antd'
import axios from "../axios";


export default class Dorm extends Component {
  constructor(){
    super();
    this.state={
      columns : [{
        title: '校区序号',
        dataIndex: 'id',
        key: 'id',
      }, {
        title: '校区名称',
        dataIndex: 'dormname',
        key: 'dormname',
      }, {
        title: '删除',
        dataIndex: 'delete',
        key: 'delete',
      }],
      data:[
        {buildname:"Loading"}
      ]
    }
  }

  addDorm(){
    let content = document.getElementsByName("unidorm")[0],__this = this,i;

    if(content.value.length > 0){
      axios.get('/uni/createDorm?dormname='+content.value+'&uniid='+this.props.uniid)
        .then(function (res) {
          if(res.data.msg === "SUCCESS") {
            content.value = "";
            axios.get("/uni/allDorm?uniid="+__this.props.uniid)
              .then(function (res) {
                for(i=0;i<res.data.result.length;i++){
                  res.data.result[i].delete = (<Button size="small" onClick={__this.delDorm.bind(__this,parseInt(res.data.result[i].id))}>删除</Button>)
                }
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

  delDorm(id){
    let __this = this,i;
    axios.get('/uni/deleteDorm?id='+id)
      .then(function (res) {
        if(res.data.msg === "SUCCESS"){
          message.success('删除成功');
          axios.get("/uni/allDorm?uniid="+__this.props.uniid)
            .then(function (res) {
              for(i=0;i<res.data.result.length;i++){
                res.data.result[i].delete = (<Button size="small" onClick={__this.delDorm.bind(__this,parseInt(res.data.result[i].id))}>删除</Button>)
              }
              if(res.data.msg === "SUCCESS"){
                __this.setState({
                  data : res.data.result
                })
              }
            })
        }else if(res.data.code === "412"){
          message.success('因有关联信息不能删除');
        }
      })
  }

  componentDidMount(){
    let __this = this,i;

    axios.get("/uni/allDorm?uniid="+this.props.uniid)
      .then(function (res) {
        if(res.data.msg === "SUCCESS"){
          for(i=0;i<res.data.result.length;i++){
            res.data.result[i].delete = (<Button size="small" onClick={__this.delDorm.bind(__this,parseInt(res.data.result[i].id))}>删除</Button>)
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
        <Table defaultPageSize="6" dataSource={this.state.data} columns={this.state.columns} />
        <Form.Item>
          <Input name="unidorm" style={{ width: '200px' }} placeholder="楼栋名称" required/>
          <Button onClick={this.addDorm.bind(this)} type="primary" style={{ width: '70px' }}>添加</Button>
        </Form.Item>
      </div>
    )
  }
}
