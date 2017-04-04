import React, { Component } from 'react'
import {findDOMNode} from 'react-dom'
import{ Table, Select } from 'antd'
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
      option: []
    }
  }


  componentDidMount(){
    let __this = this

    axios.get("/market/getDealSelective")
      .then(function (res) {
        if(res.data.msg === "SUCCESS"){
          __this.setState({
            data : res.data.result
          })
        }
      })
  }

  handleChange(value){
    let __this = this;

    axios.get("market/getDealSelective?id="+value.split("-")[0])
      .then((res)=>{
        if(res.data.msg === "SUCCESS"){
          __this.setState({
            data: res.data.result
          })
        }
      })
  }

  render() {
    let __this = this;

    axios.get("/uni/allUniversity")
      .then((res)=>{
        let i,data = res.data.result;

        if(data.msg === "SUCCESS"){
          for(i=0;i<data.length;i++){
            __this.state.option.push(<Select.Option>data[i].id+"-"+data[i].name</Select.Option>)
          }

          __this.setState({
            option : __this.state.option
          })
        }
      })




    return (
      <div>
        <Select onSelect={this.handleChange} >
          {this.state.option}
        </Select>
        <Table style={{width:"50vw"}} dataSource={this.state.data} columns={this.state.columns} />
      </div>
    )
  }
}
