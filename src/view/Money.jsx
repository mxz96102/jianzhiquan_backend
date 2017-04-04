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

  }

  render () {
    return (
      <div>
        <Table style={{width:"50vw"}} dataSource={this.state.data} columns={this.state.columns} />
      </div>
    )
  }
}
