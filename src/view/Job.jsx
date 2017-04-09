import React, { Component } from 'react'
import {findDOMNode} from 'react-dom'
import{ Table, Modal } from 'antd'
import axios from "../axios";
import JobDetail from './JobDetail'


export default class Job extends Component {
  constructor(){
    super();
    this.state={
      columns : [{
        title: '学校',
        dataIndex: 'uniid',
        key: 'uniid',
      }, {
        title: '兼职标题',
        dataIndex: 'jobname',
        key: 'jobname',
      }, {
        title: '开始时间',
        dataIndex: 'fromtime',
        key: 'fromtime',
      }, {
        title: '结束时间',
        dataIndex: 'untiltime',
        key: 'untiltime',
      }, {
        title: '兼职时段',
        dataIndex: 'time',
        key: 'time',
      }, {
        title: '工作地点',
        dataIndex: 'place',
        key: 'place',
      }, {
        title: '招聘人数',
        dataIndex: 'workernummax',
        key: 'workernummax',
      }, {
        title: '工资待遇',
        dataIndex: 'salary',
        key: 'salary',
      }, {
        title: '兼职情况',
        dataIndex: 'workernumnow',
        key: 'workernumnow',
      }, {
        title: '链接',
        dataIndex: 'link',
        key: 'link',
      }, {
        title: '状态',
        dataIndex: 'jobstate',
        key: 'jobstate',
      }],
      data:[
        {jobname:"Loading"}
      ]
    }
  }

  jobArrange(jobid){
    Modal.info({ width : '80vw',
      content:(<JobDetail jobid={jobid}/>)
    })
  }


  componentDidMount(){
    let __this = this,i,states = {WANTING:"招募中",WORKING:"兼职中",ENDED:"已结束"};

    axios.get("/job/getAllJob")
      .then(function (res) {
        if(res.data.msg === "SUCCESS"){
          for(i=0;i<res.data.result.length;i++){
            res.data.result[i].fromtime = (new Date(res.data.result[i].fromtime)).toLocaleDateString()
            res.data.result[i].untiltime = (new Date(res.data.result[i].untiltime)).toLocaleDateString()
            res.data.result[i].jobstate = states[res.data.result[i].jobstate]
            res.data.result[i].link = (<a href={"http://job.4nian.cc/#/job/info/"+res.data.result[i].id}>链接</a>)
            res.data.result[i].workernumnow = (<span style={{cursor:'pointer'}} onClick={__this.jobArrange.bind(__this,parseInt(res.data.result[i].id))}>{res.data.result[i].workernumnow}</span>)
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
