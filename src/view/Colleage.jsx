import React, { Component } from 'react'
import {findDOMNode} from 'react-dom'
import{ Table, Form, Input, Button, message } from 'antd'
import axios from "../axios";


export default class Colleage extends Component {
  constructor(){
    super();
    this.state={
      columns : [{
        title: '学院序号',
        dataIndex: 'id',
        key: 'id',
      }, {
        title: '学院名称',
        dataIndex: 'colleagename',
        key: 'colleagename',
      }, {
        title: '授权人',
        dataIndex: 'man',
        key: 'man',
      }, {
        title: '添加授权',
        dataIndex: 'add',
        key: 'add',
      }, {
        title: '删除',
        dataIndex: 'delete',
        key: 'delete',
      }],
      data:[
        {name:"Loading"}
      ]
    }
  }

  addColleage(){
    let content = document.getElementsByName("unicolleage")[0],__this = this,i,j;

    if(content.value.length > 0){
      axios.get('/uni/createColleage?colleagename='+content.value+'&uniid='+this.props.uniid)
        .then(function (res) {
          if(res.data.msg === "SUCCESS") {
            content.value = "";
            axios.get("/uni/allColleage?uniid="+__this.props.uniid)
              .then(function (res) {
                if(res.data.msg === "SUCCESS"){
                  for(i=0;i<res.data.result.length;i++){
                    res.data.result[i].man = '';
                    if(!!res.data.result.user)
                      for(j=0;j<res.data.result.user.length;j++){
                        res.data.result[i].man += res.data.result.user[j].username+"|"
                      }
                    res.data.result[i].add = (
                      <Form.Item>
                        <Input placeholder="手机号码" size="small" name={"phone"+res.data.result[i].id}/>
                        <Button.Group size="small">
                          <Button  onClick={__this.addUser.bind(__this,("phone"+res.data.result[i].id),parseInt(res.data.result[i].id))} size="small">添加</Button>
                          <Button onClick={__this.delUser.bind(__this,("phone"+res.data.result[i].id),parseInt(res.data.result[i].id))} size="small">删除</Button>
                        </Button.Group>
                      </Form.Item>)
                    res.data.result[i].delete = (<Button size="small" onClick={__this.delColleage.bind(__this,parseInt(res.data.result[i].id))}>删除</Button>)
                  }
                  __this.setState({
                    data : res.data.result
                  })
                }
              })
          }
        })
    }
  }

  addUser(name,id){
    let content = document.getElementsByName(name)[0],__this = this,i;
    axios.get('/uni/createAuthorizedUser?phonenum='+content.value+'&colleageid='+id)
      .then(function (res) {
        if(res.data.msg === "SUCCESS"){
          message.success('添加成功');
          content.value = '';
          axios.get("/uni/allColleage?uniid="+__this.props.uniid)
            .then(function (res) {
              if(res.data.msg === "SUCCESS"){
                for(i=0;i<res.data.result.length;i++){
                  res.data.result[i].man = '';

                  for(j=0;j<res.data.result.user.length;j++){
                    res.data.result[i].man += res.data.result.user[j].username+"|"
                  }
                  res.data.result[i].add = (
                    <Form.Item>
                      <Input placeholder="手机号码" size="small" name={"phone"+res.data.result[i].id}/>
                      <Button.Group size="small">
                        <Button  onClick={__this.addUser.bind(__this,("phone"+res.data.result[i].id),parseInt(res.data.result[i].id))} size="small">添加</Button>
                        <Button onClick={__this.delUser.bind(__this,("phone"+res.data.result[i].id),parseInt(res.data.result[i].id))} size="small">删除</Button>
                      </Button.Group>
                    </Form.Item>)
                  res.data.result[i].delete = (<Button size="small" onClick={__this.delColleage.bind(__this,parseInt(res.data.result[i].id))}>删除</Button>)
                }
                __this.setState({
                  data : res.data.result
                })
              }
            })
        }
      })
  }

  delUser(name,id){
    let content = document.getElementsByName(name)[0],__this = this,i;
    axios.get('/uni/deleteAuthorizedUser?phonenum='+content.value+'&colleageid='+id)
      .then(function (res) {
        if(res.data.msg === "SUCCESS"){
          message.success('删除成功');
          content.value = ''
          axios.get("/uni/allColleage?uniid="+__this.props.uniid)
            .then(function (res) {
              if(res.data.msg === "SUCCESS"){
                for(i=0;i<res.data.result.length;i++){
                  res.data.result[i].man = '';

                  for(j=0;j<res.data.result.user.length;j++){
                    res.data.result[i].man += res.data.result.user[j].username+"|"
                  }
                  res.data.result[i].add = (
                    <Form.Item>
                      <Input placeholder="手机号码" size="small" name={"phone"+res.data.result[i].id}/>
                      <Button.Group size="small">
                        <Button  onClick={__this.addUser.bind(__this,("phone"+res.data.result[i].id),parseInt(res.data.result[i].id))} size="small">添加</Button>
                        <Button onClick={__this.delUser.bind(__this,("phone"+res.data.result[i].id),parseInt(res.data.result[i].id))} size="small">删除</Button>
                      </Button.Group>
                    </Form.Item>)
                  res.data.result[i].delete = (<Button size="small" onClick={__this.delColleage.bind(__this,parseInt(res.data.result[i].id))}>删除</Button>)
                }
                __this.setState({
                  data : res.data.result
                })
              }
            })
        }
      })
  }

  delColleage(id){
    let __this = this,i,j;
    axios.get('/uni/deleteColleage?id='+id)
      .then(function (res) {
        if(res.data.msg === "SUCCESS"){
          message.success('删除成功');
          axios.get("/uni/allColleage?uniid="+__this.props.uniid)
            .then(function (res) {
              if(res.data.msg === "SUCCESS"){
                for(i=0;i<res.data.result.length;i++){
                  res.data.result[i].man = '';

                  for(j=0;j<res.data.result.user.length;j++){
                    res.data.result[i].man += res.data.result.user[j].username+"|"
                  }
                  res.data.result[i].add = (
                    <Form.Item>
                      <Input placeholder="手机号码" size="small" name={"phone"+res.data.result[i].id}/>
                      <Button.Group size="small">
                        <Button  onClick={__this.addUser.bind(__this,("phone"+res.data.result[i].id),parseInt(res.data.result[i].id))} size="small">添加</Button>
                        <Button onClick={__this.delUser.bind(__this,("phone"+res.data.result[i].id),parseInt(res.data.result[i].id))} size="small">删除</Button>
                      </Button.Group>
                    </Form.Item>)
                  res.data.result[i].delete = (<Button size="small" onClick={__this.delColleage.bind(__this,parseInt(res.data.result[i].id))}>删除</Button>)
                }
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
    let __this = this,i,j;

    axios.get("/uni/allColleage?uniid="+this.props.uniid)
      .then(function (res) {
        if(res.data.msg === "SUCCESS"){
          for(i=0;i<res.data.result.length;i++){
            res.data.result[i].man = '';

            for(j=0;j<res.data.result[i].user.length;j++){
              res.data.result[i].man += res.data.result[i].user[j].username+"|"
            }
            res.data.result[i].add = (
              <Form.Item>
                <Input style={{ width: '12rem' }} placeholder="授权人手机号码" size="small" name={"phone"+res.data.result[i].id}/>
                <Button.Group size="small">
                  <Button  onClick={__this.addUser.bind(__this,("phone"+res.data.result[i].id),parseInt(res.data.result[i].id))} size="small">添加</Button>
                  <Button onClick={__this.delUser.bind(__this,("phone"+res.data.result[i].id),parseInt(res.data.result[i].id))} size="small">解除</Button>
                </Button.Group>
              </Form.Item>)
            res.data.result[i].delete = (<Button size="small" onClick={__this.delColleage.bind(__this,parseInt(res.data.result[i].id))}>删除</Button>)
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
          <Input name="unicolleage" style={{ width: '200px' }} placeholder="学院名称" required/>
          <Button onClick={this.addColleage.bind(this)} type="primary" style={{ width: '70px' }}>添加</Button>
        </Form.Item>
      </div>
    )
  }
}
