import React, { Component } from 'react'
import {findDOMNode} from 'react-dom'
import{ Table } from 'antd'



export default class Market extends Component {
  constructor(){
    super();
    this.state={
      columns : [{
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '序号',
        dataIndex: 'id',
        key: 'id',
      }, {
        title: '圈主id',
        dataIndex: 'ownerid',
        key: 'ownerid',
      }],
      data:[
        {name:"Loading"}
      ]
    }
  }


  componentDidMount(){
    let __this = this

    axios.get("/party/allParty")
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
