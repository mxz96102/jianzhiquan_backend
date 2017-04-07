import React, { Component } from 'react'
import {findDOMNode} from 'react-dom'
import{ Table } from 'antd'
import axios from "../axios";


export default class Market extends Component {
  constructor(){
    super();
    this.state={
      columns : [{
        title: '学校',
        dataIndex: 'universityname',
        key: 'universityname',
      }, {
        title: '学院',
        dataIndex: 'colleagename',
        key: 'colleagename',
      }, {
        title: '班级',
        dataIndex: 'marketname',
        key: 'marketname',
      }, {
        title: '联系人',
        dataIndex: 'attennum',
        key: 'attennum',
      }, {
        title: '试卷',
        dataIndex: 'PAPER_num',
        key: 'PAPER_num',
      }, {
        title: '驾校',
        dataIndex: 'D_SCHOOL_num',
        key: 'D_SCHOOL_num',
      }, {
        title: '聚会',
        dataIndex: 'MEETING_num',
        key: 'MEETING_num',
      }, {
        title: '文化衫',
        dataIndex: 'T-SHIRT_num',
        key: 'T-SHIRT_num',
      }, {
        title: '记录',
        dataIndex: 'notemessagenum',
        key: 'notemessagenum',
      }],
      data:[
        {name:"Loading"}
      ]
    }
  }

  getDeal(marketid){

  }

  getAtten(marketid){

  }

  getNotes(marketid){

  }

  componentDidMount(){
    let __this = this,i;

    axios.get("/market/allMarket")
      .then(function (res) {
        if(res.data.msg === "SUCCESS"){
            for(i=0;i<res.data.result.length;i++){

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
