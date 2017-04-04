import React, { Component } from 'react'
import { hashHistory, Router } from 'react-router'
import routes from './Routes'


export default class App extends Component {
	render () {
	  window.getByName = (name) => document.getElementsByName(name)[0].value;

		return <Router history={hashHistory} routes={routes} />
	}
}
