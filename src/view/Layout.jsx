/**
 * Created by Doming on 2016/11/7.
 */

import React from "react";
import {Menu, Breadcrumb, Icon} from "antd";
import { hashHistory } from 'react-router'
import style from '../index.scss'
import axios from '../axios'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class Layout extends React.Component {
	constructor() {
    const menuLink = {
      "/" : 0,
      "school/" : 1,
      "school/add" : 2,
      "job" : 3,
      "job/add" : 4,
      "party/" : 5,
      "party/add" : 6,
      "market/" : 7,
      "market/add" : 8,
      "user" : 9,
      "deals" : 10,
      "money" : 11
    };


    super();
		this.state = {
			current: menuLink[location.hash.split('#/')[1]],
		}
	}

	handleClick(e) {
		const menuLink = {
		  0 : "/",
			1 : "school/",
			2 : "school/add",
			3 : "job",
			4 : "job/add",
			5 : "party/",
			6 : "party/add",
			7 : "market/",
			8 : "market/add",
      9 : "user",
			10 : "deals",
      11 : "money"
		};
		console.log('click ', e);
		this.setState({
			current: e.key,
		});
		hashHistory.push(menuLink[e.key])
	}

	componentDidMount(){

  }

  componentDidUpdate(){

    axios.post("user/userInfo")
      .then((res)=>{
        console.log(res);
        if(res.data.code === '401'){
          location.hash = '/'
        }
      })
      .catch(function (error) {

      });
  }

	render() {

		return (
			<div>
				<div className={style.ant_layout_aside}>
					<aside className={style.ant_layout_sider}>
            <div className={style.ant_layout_logo}><span style={{color:"white"}}>兼职圈</span></div>
						<Menu mode="inline" theme="dark" onClick={this.handleClick.bind(this)}
									>

							<SubMenu key="sub1" title={<span><Icon type="right" /><span>学校</span></span>}>
								<Menu.Item onClick={()=> hash} key="1">管理学校</Menu.Item>
								<Menu.Item key="2">添加学校</Menu.Item>
							</SubMenu>
							<SubMenu key="sub2" title={<span><Icon type="right" /><span>兼职</span></span>}>
								<Menu.Item key="3">管理兼职</Menu.Item>
								<Menu.Item key="4">添加兼职</Menu.Item>
							</SubMenu>
							<SubMenu key="sub3" title={<span><Icon type="right" /><span>圈子</span></span>}>
								<Menu.Item key="5">管理圈子</Menu.Item>
								<Menu.Item key="6">添加圈子</Menu.Item>
							</SubMenu>
							<SubMenu key="sub5" title={<span><Icon type="right" /><span>班级</span></span>}>
								<Menu.Item key="7">管理班级</Menu.Item>
								{/*<Menu.Item key="8">添加班级</Menu.Item>*/}
							</SubMenu>
              <Menu.Item key="9">用户管理</Menu.Item>
							<SubMenu key="sub6" title={<span><Icon type="right" /><span>交易</span></span>}>
								<Menu.Item key="10">四项数据</Menu.Item>
								<Menu.Item key="11">提现管理</Menu.Item>
							</SubMenu>
						</Menu>
					</aside>
					<div className={style.ant_layout_main}>
						<div className={style.ant_layout_header}> </div>
						<div className={style.ant_layout_container}>
							<div className={style.ant_layout_content}>
								<div style={{height: 590,minWidth:"500px"}}>
									{this.props.children}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
