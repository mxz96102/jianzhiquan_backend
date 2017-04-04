import React, { Component } from 'react'
import {findDOMNode} from 'react-dom'
import AvatarEditor from 'react-avatar-editor'
import{ Form, Icon, Input, Button, Checkbox, Select } from 'antd'
import testImg from '../assets/test.png'


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
