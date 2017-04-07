import React, { Component } from 'react'
import {findDOMNode} from 'react-dom'
import{ Table, Form, Input, Button, message, Tabs } from 'antd'
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
        title: '处理',
        dataIndex: 'operation',
        key: 'operation',
      }],
      workdata:[
        {name:"Loading"}
      ],
      handledata:[
        {name:"Loading"}
      ]
    }
  }

  approve(userid,opration){
    axios.get('/job/approval?jobid='+this.props.jobid+'&userid='+userid+'&state='+opration)
      .then(function (res) {
        if(res.data.msg === "SUCCESS"){
          message.success('操作成功');
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
    let __this = this;

    axios.get("/job/userList?id="+this.props.jobid+"&state=HANDLING")
      .then(function (res) {
        if(res.data.msg === "SUCCESS"){
          let i;
          console.log(res.data.result)
          for(i=0;i<res.data.result.length;i++){
            res.data.result[i].operation = (
              <Button.Group>
                <Button onClick={__this.approve.bind(__this,res.data.result[i].id,'REFUSED')}>拒绝</Button>
                <Button onClick={__this.approve.bind(__this,res.data.result[i].id,'WORKING')} type="primary">通过</Button>
              </Button.Group>
            );
          }
          console.log(res.data.result)
          __this.setState({
            hanledata : res.data.result
          })
        }
      })
      .catch(function (error) {
        console.log(error)
      })

    axios.get("/job/userList?id="+this.props.jobid+"&state=WORKING")
      .then(function (res) {
        if(res.data.msg === "SUCCESS"){
          let i;

          for(i=0;i<res.data.result.length;i++){
            res.data.result[i].operation = (<Form.Item><Input defaultValue="工资数额（整数）" size="small" name="salary"/><Button onClick={__this.salary.bind(__this,parseInt(res.data.result[i].id))} size="small">发工资</Button></Form.Item>)
          }

          __this.setState({
            workdata : res.data.result
          })
        }
      })
  }

  render () {
    return (
      <div>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="审核" key="1"><Table defaultPageSize="6" dataSource={this.state.handledata} columns={this.state.columns} /></Tabs.TabPane>
          <Tabs.TabPane tab="发工资" key="2"><Table defaultPageSize="6" dataSource={this.state.workdata} columns={this.state.columns} /></Tabs.TabPane>
        </Tabs>

      </div>
    )
  }
}
