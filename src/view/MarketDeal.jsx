import React, { Component } from 'react'
import {findDOMNode} from 'react-dom'
import{ Table } from 'antd'
import axios from "../axios";


export default class MarketDeal extends Component {
  constructor(){
    super();
    this.state={
      columns : [{
        title: '序号',
        dataIndex: 'id',
        key: 'id',
      }, {
        title: '时间',
        dataIndex: 'createtime',
        key: 'createtime',
      }, {
        title: '相关客户',
        dataIndex: 'custom',
        key: 'custom',
      }, {
        title: '成交金额',
        dataIndex: 'volume',
        key: 'volume',
      }, {
        title: '记录人',
        dataIndex: 'ownername',
        key: 'ownername',
      }],
      data:[
        {name:"Loading"}
      ]
    }
  }


  componentDidMount(){
    let __this = this,i;

    axios.get("/market/getAllDeal?marketid="+this.props.marketid)
      .then(function (res) {
        if(res.data.msg === "SUCCESS"){
          for(i=0;i<res.data.result.length;i++){
            res.data.result[i].createtime =  (new Date(res.data.result[i].createtime)).toLocaleString()
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
        <Table dataSource={this.state.data} columns={this.state.columns} />
      </div>
    )
  }
}
