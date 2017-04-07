import React, { Component } from 'react'
import {findDOMNode} from 'react-dom'
import{ Table, Form, Input, Button, message } from 'antd'
import axios from "../axios";


export default class JobDetail extends Component {
  constructor(){
    super();
    this.state={
      columns : [{
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
      }, {
        title: '手机',
        dataIndex: 'phonenum',
        key: 'phonenum',
      }, {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
      }, {
        title: '处理',
        dataIndex: 'operation',
        key: 'operation',
      }],
      data:[
        {name:"Loading"}
      ]
    }
  }

  approve(userid,opration){
    axios.get('/job/approval?jobid='+this.props.jobid+'&userid='+userid+'&state='+opration)
      .then(function (res) {
        if(res.data.msg === "SUCCESS"){

        }
      })
  }

  salary(userid){
    let content = document.getElementsByName("salary")[0],__this = this;
    axios.get('job/payoff?jobid='+this.props.jobid+'&userid='+userid+'&salary='+content.value)
      .then(function (res) {
        if(res.data.msg === "SUCCESS"){
          message.success('发放成功');
        }
      })
  }

  componentDidMount(){
    let __this = this,i;

    axios.get("/job/userList?jobid="+this.props.jobid)
      .then(function (res) {
        if(res.data.msg === "SUCCESS"){
          for(i=0;i<res.data.result.length;i++){
            if(res.data.result[i].tradestate === "HANDLING")
              res.data.result[i].operation = (
                <Button.Group>
                  <Button onClick={__this.approve.bind(__this,res.data.result[i].id,'REFUSED')}>拒绝</Button>
                  <Button onClick={__this.approve.bind(__this,res.data.result[i].id,'WORKING')} type="primary">通过</Button>
                </Button.Group>
              )
            else if(res.data.result[i].tradestate === "WORKING")
              res.data.result[i].operation = (<Form.Item><Input defaultValue="工资数额（整数）" size="small" name="salary"/><Button size="small">发工资</Button></Form.Item>)
            else
              res.data.result[i].operation = "已拒绝"
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
      </div>
    )
  }
}
