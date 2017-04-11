import React, { Component } from 'react'
import {findDOMNode} from 'react-dom'
import{ Table, Modal } from 'antd'
import axios from "../axios";
import Dorm from './Dorm'
import Colleage from './Colleage'


export default class School extends Component {
  constructor(){
    super();
    this.state={
      columns : [{
        title: '学校名称',
        dataIndex: 'uniname',
        key: 'uniname',
      }, {
        title: '归属地',
        dataIndex: 'address',
        key: 'address',
      }, {
        title: '学校层次',
        dataIndex: 'level',
        key: 'level',
      }, {
        title: '院系数',
        dataIndex: 'colleagenum',
        key: 'colleagenum',
      }, {
        title: '宿舍栋数',
        dataIndex: 'buildnum',
        key: 'buildnum',
      }, {
        title: '删除',
        dataIndex: 'delete',
        key: 'delete',
      }],
      data:[
        {uniname:"Loading"}
      ]
    }
  }

  colleageArrange(uniid){
    Modal.info({ width : '80vw',
      content : <Colleage uniid={uniid}/>
    })
  }

  buildArrange(uniid){
    Modal.info({ width : '80vw',
      content : <Dorm uniid={uniid}/>
    })
  }

  delSchool(id){
    axios.get('/uni/deleteUniversity?id='+id)
      .then(function (res) {
        if(res.data.msg === "SUCCESS"){
          message.success('删除成功');
        }
      })
  }

  componentDidMount(){
    let __this = this,i;

    axios.get("/uni/allUniversity")
      .then(function (res) {
        if(res.data.msg === "SUCCESS"){
          for(i=0;i<res.data.result.length;i++){
            res.data.result[i].buildnum = (<span style={{cursor:'pointer'}} onClick={__this.buildArrange.bind(__this,parseInt(res.data.result[i].id))}>{res.data.result[i].buildnum}</span>)
            res.data.result[i].colleagenum = (<span style={{cursor:'pointer'}} onClick={__this.colleageArrange.bind(__this,parseInt(res.data.result[i].id))}>{res.data.result[i].colleagenum}</span>)
            res.data.result[i].delete = (<Button size="small" onClick={__this.delSchool.bind(__this,parseInt(res.data.result[i].id))}>删除</Button>)
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
        <Table style={{width:"70vw"}} dataSource={this.state.data} columns={this.state.columns} />
      </div>
    )
  }
}
