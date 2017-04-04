import React, { Component } from 'react'
import {findDOMNode} from 'react-dom'
import{ Table } from 'antd'



export default class Market extends Component {
  constructor(){
    super();
    this.state={
      columns : [{
        title: '名称',
        dataIndex: 'marketname',
        key: 'marketname',
      }, {
        title: '序号',
        dataIndex: 'id',
        key: 'id',
      }, {
        title: '学院',
        dataIndex: 'colleage',
        key: 'colleage',
      }, {
        title: '收益',
        dataIndex: 'revenue',
        key: 'revenue',
      },],
      data:[
        {name:"Loading"}
      ]
    }
  }


  componentDidMount(){
    let __this = this

    axios.get("/market/getAllMarket")
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
        <Table style={{width:"50vw"}} dataSource={this.state.data} columns={this.state.columns} />
      </div>
    )
  }
}
