import React, {Component} from 'react'
import Fusion from '../molecules/FusionChart'
import Form from '../molecules/form'
import ConfigApp from '../../configuration/configuration'
import Table from '../molecules/Table'
import Edit from '../molecules/edit'
import { Chart_wrapp,  Nav } from '../../../style/style'
import { observer, inject } from 'mobx-react'

import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

@inject('Store')

@observer 
export default class Chart extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <Router>
                <Chart_wrapp>
                    <Nav>
                        <div className='nav_item'><Form /></div>
                        <div className='nav_item'><Table /></div>
                        <div className='nav_item'> <ConfigApp /></div>
                    </Nav>
                    <Fusion />
                    <Switch>
                        <Route path='/edit/:id' component= {Edit} />
                    </Switch>
                </Chart_wrapp>
            </Router>
        )
    }
}