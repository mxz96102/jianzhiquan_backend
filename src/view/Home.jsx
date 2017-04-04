import React, { Component } from 'react'
import {findDOMNode} from 'react-dom'
import{ Form, Icon, Input, Button, Checkbox, Select } from 'antd'
import axios from "../axios";


export default class Home extends Component {
	constructor(){
		super();
		this.state={
			hasImg: true,
			imgUrl:""
		}
	}


	componentDidMount(){

	}

	render () {
		return (
			<div>

      </div>
		)
	}
}
