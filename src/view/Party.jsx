import React, { Component } from 'react'
import {findDOMNode} from 'react-dom'
import{ Table, Button, Input, message, Form, Select } from 'antd'
import axios from "../axios";


export default class Market extends Component {
  constructor(){
    super();
    this.state={
      columns : [{
        title: '学校',
        dataIndex: 'uniname',
        key: 'uniname',
      }, {
        title: '名称',
        dataIndex: 'partyname',
        key: 'partyname',
      }, {
        title: '圈主',
        dataIndex: 'ownername',
        key: 'ownername',
      }, {
        title: '总兼职',
        dataIndex: 'allJobnum',
        key: 'allJobnum',
      }, {
        title: '总人数',
        dataIndex: 'allMembernum',
        key: 'allMembernum',
      }, {
        title: '总收益',
        dataIndex: 'allIncomenum',
        key: 'allIncomenum',
      }, {
        title: '注册链接',
        dataIndex: 'link',
        key: 'link',
      }, {
        title: '新注册',
        dataIndex: 'newMembernum',
        key: 'newMembernum',
      }, {
        title: '新次数',
        dataIndex: 'newJobnum',
        key: 'newJobnum',
      }, {
        title: '新收益',
        dataIndex: 'newIncomenum',
        key: 'newIncomenum',
      }, {
        title: '更换圈主',
        dataIndex: 'change',
        key: 'change',
      }],
      data:[
        {uniname:"Loading"}
      ],
      school:[],
    }
  }

  changeOwner(name,id){
    let content = document.getElementsByName(name)[0],__this = this;
    axios.get('/party/manageOwner?phonenum='+content.value+'&id='+id)
      .then(function (res) {
        if(res.data.msg === "SUCCESS"){
          message.success('授权成功');
          content.value = ''
        }
      })
  }

  onSchool(value){
    let __this = this,i;

    if(value.split('-')[0] == '0'){
      axios.get("/party/allParty")
        .then(function (res) {
          if(res.data.msg === "SUCCESS"){
            for(i=0;i<res.data.result.length;i++){
              res.data.result[i].link = (<a href={"http://job.4nian.cc/com.cn.plurality/party/refer?id="+res.data.result[i].id+'&ownerid='+res.data.result[i].ownerid+'&redirect=http%3A%2F%2Fjob.4nian.cc%2F%23%2F'}>加入链接</a>)
              res.data.result[i].change = (<Form.Item>
                <Input style={{ width: '12rem' }} placeholder="圈主手机号码" size="small" name={"phone"+res.data.result[i].id}/>
                <Button  onClick={__this.changeOwner.bind(__this,("phone"+res.data.result[i].id),parseInt(res.data.result[i].id))} size="small">授权</Button>
              </Form.Item>)
            }
            __this.setState({
              data : res.data.result
            })
          }
        })
    }else
      axios.get("/party/allParty?uniid="+value.split('-')[0])
        .then(function (res) {
          if(res.data.msg === "SUCCESS"){
            for(i=0;i<res.data.result.length;i++){
              res.data.result[i].link = (<a href={"http://job.4nian.cc/com.cn.plurality/party/refer?id="+res.data.result[i].id+'&ownerid='+res.data.result[i].ownerid+'&redirect=http%3A%2F%2Fjob.4nian.cc%2F%23%2F'}>加入链接</a>)
              res.data.result[i].change = (<Form.Item>
                <Input style={{ width: '12rem' }} placeholder="圈主手机号码" size="small" name={"phone"+res.data.result[i].id}/>
                <Button  onClick={__this.changeOwner.bind(__this,("phone"+res.data.result[i].id),parseInt(res.data.result[i].id))} size="small">授权</Button>
              </Form.Item>)
            }

            __this.setState({
              data : res.data.result
            })
          }
        })
  }

  componentDidMount(){
    let __this = this,i;

    axios.get("/uni/allUniversity")
      .then((res)=>{
        let j,data = res.data.result;

        if(res.data.msg === "SUCCESS"){
          __this.state.school= [];
          for(j=0;j<data.length;j++){
            __this.state.school.push(<Select.Option key={data[j].id}>{data[j].id+"-"+data[j].uniname}</Select.Option>)
          }

          __this.setState({
            school : __this.state.school
          })
        }
      });

    axios.get("/party/allParty")
      .then(function (res) {
        if(res.data.msg === "SUCCESS"){
          for(i=0;i<res.data.result.length;i++){
            res.data.result[i].link = (<a href={"http://job.4nian.cc/com.cn.plurality/party/refer?id="+res.data.result[i].id+'&ownerid='+res.data.result[i].ownerid+'&redirect=http%3A%2F%2Fjob.4nian.cc%2F%23%2F'}>加入链接</a>)
            res.data.result[i].change = (<Form.Item>
              <Input style={{ width: '12rem' }} placeholder="圈主手机号码" size="small" name={"phone"+res.data.result[i].id}/>
              <Button  onClick={__this.changeOwner.bind(__this,("phone"+res.data.result[i].id),parseInt(res.data.result[i].id))} size="small">授权</Button>
            </Form.Item>)
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
        学校：
        <Select style={{minWidth:"10rem"}} onSelect={this.onSchool.bind(this)} >
          <Select.Option key={0}>0-全部</Select.Option>
          {this.state.school}
        </Select>
        <Table style={{width:"70vw"}} dataSource={this.state.data} columns={this.state.columns} />
        <p>注:加入链接请右键复制给要加入圈子的用户打开</p>
      </div>
    )
  }
}
