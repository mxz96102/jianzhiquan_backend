import Layout from './view/Layout'
import Home from './view/Login'

import School from './view/School'
import SchoolAdd from './view/SchoolAdd'
import Market from './view/Market'
import MarketAdd from './view/MarketAdd'
import Party from './view/Party'
import PartyAdd from './view/PartyAdd'
import Deal from './view/Deal'
import Job from './view/Job'
import JobAdd from './view/JobAdd'
import Money from './view/Money'
import User from './view/User'

const routes = {
	path: '/',
	component: Layout,
	indexRoute: {
		component: Home
	},
	childRoutes: [
		{
      path: 'school',
      component: School
    },{
      path: 'school/add',
      component: SchoolAdd
    },{
      path: 'market',
      component: Market
    },{
      path: 'market/add',
      component: MarketAdd
    },{
      path: 'deals',
      component: Deal
    },{
      path: 'Job',
      component: Job
    },{
      path: 'Job/add',
      component: JobAdd
    },{
      path: 'party',
      component: Party
    },{
      path: 'party/add',
      component: PartyAdd
    },{
      path: 'money',
      component: Money
    },{
      path: 'user',
      component: User
    },
	]
}

export default routes
