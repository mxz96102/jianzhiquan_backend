import React, { Component } from 'react'
import {findDOMNode} from 'react-dom'
import{ Table, Button, Input, message } from 'antd'
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
      ]
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

  componentDidMount(){
    let __this = this,i;

    axios.get("/party/allParty")
      .then(function (res) {
        if(res.data.msg === "SUCCESS"){
          for(i=0;i<res.data.result.length;i++){
            res.data.result[i].link = (<a href={"http://job.4nian.cc/com.cn.plurality/party/refer??id="+res.data.result[i].id+'&ownerid='+res.data.result[i].ownerid+'&redirect=http%3A%2F%2Fjob.4nian.cc%2F%23%2F'}>加入链接</a>)
            res.data.result[i].change = (<Form.Item>
              <Input placeholder="圈主手机号码" size="small" name={"phone"+res.data.result[i].id}/>
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
        <Table style={{width:"50vw"}} dataSource={this.state.data} columns={this.state.columns} />
      </div>
    )
  }
}
