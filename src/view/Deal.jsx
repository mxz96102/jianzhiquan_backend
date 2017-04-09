import React, { Component } from 'react'
import {findDOMNode} from 'react-dom'
import{ Table, Select, DatePicker, Form, Button } from 'antd'
import axios from "../axios";

export default class Deal extends Component {
  constructor(){
    super();
    this.state= {
      columns: [{
        title: '项目',
        dataIndex: 'dealtype',
        key: 'dealtype',
      }, {
        title: '单数',
        dataIndex: 'volume',
        key: 'volume',
      }, {
        title: '客户',
        dataIndex: 'custom',
        key: 'custom',
      }, {
        title: '处理人',
        dataIndex: 'ownername',
        key: 'ownername',
      }, {
        title: '描述',
        dataIndex: 'discription',
        key: 'discription',
      }, {
        title: '时间',
        dataIndex: 'createtime',
        key: 'createtime',
      }],
      data: [
        {}
      ],
      option: [],
      start:"",
      end:"",
      id:""
    }
  }


  componentDidMount(){
    let __this = this,i;

    axios.get("/uni/allUniversity")
      .then((res)=>{
        let i,data = res.data.result;

        if(res.data.msg === "SUCCESS"){
          __this.state.option= [];
          for(i=0;i<data.length;i++){
            __this.state.option.push(<Select.Option key={data[i].id}>{data[i].id+"-"+data[i].uniname}</Select.Option>)
          }

          __this.setState({
            option : __this.state.option
          })
        }
      });
  }

  handleChange(value){
    this.setState({
      id: value.split("-")[0]
    })

  }

  handleSearch(){
    let __this = this,i,state={
      'PAPER':'试卷',
      'D_SCHOOL': '驾校',
      'MEETING': '聚会',
      'T-SHIRT': '纪念衫'
    };

    axios.get("market/getDealSelective?id="+this.state.id+
      "&fromtime="+this.state.start +
      "&untiltime="+this.state.end +
        "&uniid="+ this.state.id
    )
      .then((res)=>{
        if(res.data.msg === "SUCCESS"){
          for(i=0;i<data.length;i++){
            res.data.result[i].createtime =  (new Date(res.data.result[i].createtime)).toLocaleString()
            res.data.result[i].dealtype = state[res.data.result[i].dealtype]
          }
          __this.setState({
            data : res.data.result
          })
        }
      })
  }

  handleStart = (value) => {
    let date = new Date(value);
    this.setState({
      start : date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate() +" 00:00:00"
    })
  }

  handleEnd = (value) => {
    let date = new Date(value);

    this.setState({
      end : date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate() +" 00:00:00"
    })
  }

  render() {
    const dateFormat = 'YYYY-MM-DD';

    return (
      <div>
        <Form.Item label="开始时间">
          <DatePicker onChange={this.handleStart} format={dateFormat} required/>
        </Form.Item>
        <Form.Item label="结束时间">
          <DatePicker onChange={this.handleEnd} format={dateFormat} required/>
        </Form.Item>
        <Form.Item label="选择大学">
          <Select style={{minWidth:"10rem"}} onSelect={this.handleChange.bind(this)} >
            {this.state.option}
          </Select>
        </Form.Item>
        <Form.Item><Button onClick={this.handleSearch.bind(this)}>查询</Button></Form.Item>
        <Table style={{width:"70vw"}} dataSource={this.state.data} columns={this.state.columns} />
      </div>
    )
  }
}
