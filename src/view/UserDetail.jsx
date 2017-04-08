import React, { Component } from 'react'
import {findDOMNode} from 'react-dom'
import{ Table, Form, Input, Button, message, Tabs } from 'antd'
import axios from "../axios";


export default class JobDetail extends Component {
  constructor(){
    super();
    this.state={
      columns : [{
        title: '时间',
        dataIndex: 'createtime',
        key: 'createtime',
      }, {
        title: '金额变动',
        dataIndex: 'volume',
        key: 'volume',
      }, {
        title: '状态',
        dataIndex: 'tradestate',
        key: 'tradestate',
      }, {
        title: '描述',
        dataIndex: 'discription',
        key: 'discription',
      }, {
        title: '处理',
        dataIndex: 'operation',
        key: 'operation',
      }],
      appdata:[
        {name:"Loading"}
      ],
      handledata:[
        {name:"Loading"}
      ],
      refdata:[
        {name:"Loading"}
      ]
    }
  }

  approve(id,opration){
    axios.get('/account/approval?id='+id+'&state='+opration)
      .then(function (res) {
        if(res.data.msg === "SUCCESS"){
          message.success('操作成功');
          axios.get("/account/userTrade?id="+this.props.userid)
            .then(function (res) {
              if(res.data.msg === "SUCCESS"){
                let i;

                __this.state.handledata = [];
                __this.state.appdata = [];
                __this.state.refdata = [];

                for(i=0;i<res.data.result.length;i++){
                  //res.data.result[i].operation = (<Button.Group size="small"><Button onClick={__this.approve.bind(__this,res.data.result[i].id,'REFUSED')}>拒绝</Button><Button onClick={__this.approve.bind(__this,res.data.result[i].id,'WORKING')} type="primary">通过</Button></Button.Group>)
                  switch (res.data.result[i].tradestate){
                    case "HANDLING":
                      res.data.result[i].operation = (<Button.Group size="small"><Button onClick={__this.approve.bind(__this,res.data.result[i].id,'REFUSED')}>拒绝</Button><Button onClick={__this.approve.bind(__this,res.data.result[i].id,'DONE')} type="primary">通过</Button></Button.Group>)
                      res.data.result[i].tradestate = "处理中";
                      res.data.result[i].createtime =  (new Date(res.data.result[i].createtime)).toLocaleString();
                      __this.state.handledata.push(res.data.result[i])
                      break;
                    case "DONE":
                      res.data.result[i].tradestate = "已处理";
                      res.data.result[i].createtime =  (new Date(res.data.result[i].createtime)).toLocaleString();
                      __this.state.appdata.push(res.data.result[i])
                      break;
                    case "REFUSED":
                      res.data.result[i].tradestate = "已拒绝";
                      res.data.result[i].createtime =  (new Date(res.data.result[i].createtime)).toLocaleString();
                      __this.state.refdata.push(res.data.result[i])
                      break;
                    default:
                      break;
                  }
                }

                __this.setState({
                  handledata : res.data.result
                })
              }
            })
        }
      })
  }
/**/

  componentDidMount(){
    let __this = this;

    axios.get("/account/userTrade?id="+this.props.userid)
      .then(function (res) {
        if(res.data.msg === "SUCCESS"){
          let i;

          __this.state.handledata = [];
          __this.state.appdata = [];
          __this.state.refdata = [];

          for(i=0;i<res.data.result.length;i++){
            //res.data.result[i].operation = (<Button.Group size="small"><Button onClick={__this.approve.bind(__this,res.data.result[i].id,'REFUSED')}>拒绝</Button><Button onClick={__this.approve.bind(__this,res.data.result[i].id,'WORKING')} type="primary">通过</Button></Button.Group>)
            switch (res.data.result[i].tradestate){
              case "HANDLING":
                res.data.result[i].operation = (<Button.Group size="small"><Button onClick={__this.approve.bind(__this,res.data.result[i].id,'REFUSED')}>拒绝</Button><Button onClick={__this.approve.bind(__this,res.data.result[i].id,'DONE')} type="primary">通过</Button></Button.Group>)
                res.data.result[i].tradestate = "处理中";
                res.data.result[i].createtime =  (new Date(res.data.result[i].createtime)).toLocaleString();
                __this.state.handledata.push(res.data.result[i])
                break;
              case "DONE":
                res.data.result[i].tradestate = "已处理";
                res.data.result[i].createtime =  (new Date(res.data.result[i].createtime)).toLocaleString();
                __this.state.appdata.push(res.data.result[i])
                break;
              case "REFUSED":
                res.data.result[i].tradestate = "已拒绝";
                res.data.result[i].createtime =  (new Date(res.data.result[i].createtime)).toLocaleString();
                __this.state.refdata.push(res.data.result[i])
                break;
              default:
                break;
            }
          }

          __this.setState({
            handledata : res.data.result
          })
        }
      })
  }

  render () {
    return (
      <div>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="处理中" key="1"><Table defaultPageSize="6" dataSource={this.state.handledata} columns={this.state.columns} /></Tabs.TabPane>
          <Tabs.TabPane tab="已处理" key="2"><Table defaultPageSize="6" dataSource={this.state.appdata} columns={this.state.columns} /></Tabs.TabPane>
          <Tabs.TabPane tab="已拒绝" key="3"><Table defaultPageSize="6" dataSource={this.state.refdata} columns={this.state.columns} /></Tabs.TabPane>
        </Tabs>
      </div>
    )
  }
}
