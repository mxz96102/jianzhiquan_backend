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
      }],
      data: [
        {uniname: "Loading"}
      ],
      option: [],
      start:"",
      end:"",
      id:""
    }
  }


  componentDidMount(){
    let __this = this;

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
    let __this = this

    axios.get("market/getDealSelective?id="+this.state.id+
      "&fromtime="+this.state.start +
      "&untiltime="+this.state.end +
        "&uniid="+ this.state.id
    )
      .then((res)=>{
        if(res.data.msg === "SUCCESS"){
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
        <Select style={{minWidth:"10rem"}} onSelect={this.handleChange.bind(this)} >
          {this.state.option}
        </Select>
        <Button onClick={this.handleSearch.bind(this)}>查询</Button>
        <Table style={{width:"50vw"}} dataSource={this.state.data} columns={this.state.columns} />
      </div>
    )
  }
}
