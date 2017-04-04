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
        {id:"Loading",approve:(<button onClick={() => this.handleApprove(2)}>提现完成</button>)}
      ]
    }
  }

  handleApprove(num){
    axios.get("/account/approval?id="+num)
      .then((res)=>{
        if(res.data.msg === "SUCCESS"){
          location.reload()
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
              res.data.result[i].approve = (<button onClick={() => __this.handleApprove(res.data.result[i].id)}>提现完成</button>)
            res.data.result[i].tradestate = state[res.data.result[i].tradestate]
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
