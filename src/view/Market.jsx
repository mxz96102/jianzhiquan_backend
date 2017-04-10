import React, { Component } from 'react'
import {findDOMNode} from 'react-dom'
import{ Table, Modal, message, Select } from 'antd'
import axios from "../axios";
import MarketDeal from './MarketDeal'
import MarketAtt from './MarketAtt'
import MarketNote from './MarketNote'

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
      ],
      school:[],
    }
  }

  getDeal(marketid){
    Modal.info({ width : '80vw',
      content : <MarketDeal marketid={marketid}/>
    })
  }

  getAtten(marketid){
    Modal.info({ width : '80vw',
      content : <MarketAtt marketid={marketid}/>
    })
  }

  getNotes(marketid){
    Modal.info({ width : '80vw',
      content : <MarketNote marketid={marketid}/>
    })
  }

  onSchool(value){
    let __this = this,i;

    if(value.split('-')[0] == '0'){
      axios.get("/market/allMarket")
        .then(function (res) {
          for(i=0;i<res.data.result.length;i++){
            res.data.result[i]['attennum'] = (<span style={{cursor:'pointer'}} onClick={__this.getAtten.bind(__this,res.data.result[i]['id'])}>{res.data.result[i]['attennum']}</span>)

            res.data.result[i]['PAPER_num'] = (<span style={{cursor:'pointer'}} onClick={__this.getDeal.bind(__this,res.data.result[i]['id'])}>{res.data.result[i]['PAPER_num']}</span>)
            res.data.result[i]['D_SCHOOL_num'] = (<span style={{cursor:'pointer'}} onClick={__this.getDeal.bind(__this,res.data.result[i]['id'])}>{res.data.result[i]['D_SCHOOL_num']}</span>)
            res.data.result[i]['MEETING_num'] = (<span style={{cursor:'pointer'}} onClick={__this.getDeal.bind(__this,res.data.result[i]['id'])}>{res.data.result[i]['MEETING_num']}</span>)
            res.data.result[i]['T-SHIRT_num'] = (<span style={{cursor:'pointer'}} onClick={__this.getDeal.bind(__this,res.data.result[i]['id'])}>{res.data.result[i]['T-SHIRT_num']}</span>)

            res.data.result[i]['notemessagenum'] = (<span style={{cursor:'pointer'}} onClick={__this.getNotes.bind(__this,res.data.result[i]['id'])}>{res.data.result[i]['notemessagenum']}</span>)
          }
          if(res.data.msg === "SUCCESS"){
            __this.setState({
              data : res.data.result
            })
          }
        })
    }else
      axios.get("/market/allMarket")
        .then(function (res) {
          if(res.data.msg === "SUCCESS"){
            for(i=0;i<res.data.result.length;i++){
              res.data.result[i]['attennum'] = (<span style={{cursor:'pointer'}} onClick={__this.getAtten.bind(__this,res.data.result[i]['id'])}>{res.data.result[i]['attennum']}</span>)

              res.data.result[i]['PAPER_num'] = (<span style={{cursor:'pointer'}} onClick={__this.getDeal.bind(__this,res.data.result[i]['id'])}>{res.data.result[i]['PAPER_num']}</span>)
              res.data.result[i]['D_SCHOOL_num'] = (<span style={{cursor:'pointer'}} onClick={__this.getDeal.bind(__this,res.data.result[i]['id'])}>{res.data.result[i]['D_SCHOOL_num']}</span>)
              res.data.result[i]['MEETING_num'] = (<span style={{cursor:'pointer'}} onClick={__this.getDeal.bind(__this,res.data.result[i]['id'])}>{res.data.result[i]['MEETING_num']}</span>)
              res.data.result[i]['T-SHIRT_num'] = (<span style={{cursor:'pointer'}} onClick={__this.getDeal.bind(__this,res.data.result[i]['id'])}>{res.data.result[i]['T-SHIRT_num']}</span>)

              res.data.result[i]['notemessagenum'] = (<span style={{cursor:'pointer'}} onClick={__this.getNotes.bind(__this,res.data.result[i]['id'])}>{res.data.result[i]['notemessagenum']}</span>)
            }
            __this.setState({
              data : res.data.result.filter(function (e) {
                return e.uniid == value.split('-')[0]
              })
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


    axios.get("/market/allMarket")
      .then(function (res) {
        if(res.data.msg === "SUCCESS"){
            for(i=0;i<res.data.result.length;i++){
              res.data.result[i]['attennum'] = (<span style={{cursor:'pointer'}} onClick={__this.getAtten.bind(__this,res.data.result[i]['id'])}>{res.data.result[i]['attennum']}</span>)

              res.data.result[i]['PAPER_num'] = (<span style={{cursor:'pointer'}} onClick={__this.getDeal.bind(__this,res.data.result[i]['id'])}>{res.data.result[i]['PAPER_num']}</span>)
              res.data.result[i]['D_SCHOOL_num'] = (<span style={{cursor:'pointer'}} onClick={__this.getDeal.bind(__this,res.data.result[i]['id'])}>{res.data.result[i]['D_SCHOOL_num']}</span>)
              res.data.result[i]['MEETING_num'] = (<span style={{cursor:'pointer'}} onClick={__this.getDeal.bind(__this,res.data.result[i]['id'])}>{res.data.result[i]['MEETING_num']}</span>)
              res.data.result[i]['T-SHIRT_num'] = (<span style={{cursor:'pointer'}} onClick={__this.getDeal.bind(__this,res.data.result[i]['id'])}>{res.data.result[i]['T-SHIRT_num']}</span>)

              res.data.result[i]['notemessagenum'] = (<span style={{cursor:'pointer'}} onClick={__this.getNotes.bind(__this,res.data.result[i]['id'])}>{res.data.result[i]['notemessagenum']}</span>)
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
      </div>
    )
  }
}
