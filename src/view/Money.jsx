import React, { Component } from 'react'
import {findDOMNode} from 'react-dom'
import{ Table } from 'antd'
import axios from "../axios";



export default class School extends Component {
  constructor(){
    super();
    this.state={
      columns : [{
        title: 'id',
        dataIndex: 'id',
        key: 'id',
      }, {
        title: '金额',
        dataIndex: 'volume',
        key: 'volume',
      }, {
        title: '提现描述',
        dataIndex: 'discription',
        key: 'discription',
      }, {
        title: '状态',
        dataIndex: 'tradestate',
        key: 'tradestate',
      }, {
        title: '时间',
        dataIndex: 'createtime',
        key: 'createtime',
      },{
        title: '确认完成',
        dataIndex: 'approve',
        key: 'approve',
      }],
      data:[
        {id:"Loading",approve:(<button onClick={() => this.handleApprove.bind(this,2)}>提现完成</button>)}
      ]
    }
  }

  approve(id,opration){
    axios.get('/account/approval?id='+id+'&tradestate='+opration)
      .then(function (res) {
        if(res.data.msg === "SUCCESS"){
          message.success('操作成功');
        }
      })
  }

  componentDidMount(){
    let __this = this,i,state = {
      HANDLING:"处理中",
      DONE:"已处理",
      REFUSED:"已拒绝"
    };

    axios.get("/account/tradeList")
      .then(function (res) {
        if(res.data.msg === "SUCCESS"){
          for(i=0;i<res.data.result.length;i++){
            if(res.data.result[i].tradestate === "HANDLING")
              res.data.result[i].approve = (<Button.Group size="small"><Button onClick={__this.approve.bind(__this,res.data.result[i].id,'REFUSED')}>拒绝</Button><Button onClick={__this.approve.bind(__this,res.data.result[i].id,'DONE')} type="primary">通过</Button></Button.Group>)
            res.data.result[i].tradestate = state[res.data.result[i].tradestate]
            res.data.result[i].createtime = (new Date(res.data.result[i].createtime)).toLocaleString()
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
        <Table style={{width:"50vw"}} dataSource={this.state.data} columns={this.state.columns} />
      </div>
    )
  }
}
