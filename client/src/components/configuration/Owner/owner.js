import React, {Component} from 'react'
import axios from 'axios'
import {TextField,  Button } from '@material-ui/core';
import { observer, inject } from 'mobx-react'
import Buttons from '../../chart/atoms/button'

@inject('Store')
@observer

export default class AddOwner extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
       
    }
    handleChange(e) {
        this.props.Store.ownerTarget = e.target.value
        console.log( this.props.Store.ownerTarget)
    }
    handleClick(e) {
        e.preventDefault()
         let owner = {
                OwnerName: this.props.Store.ownerTarget
         }
        axios.post('http://localhost:4000/owner/addOwner', owner)
        this.props.Store.ownerList.push(owner)
    }

    
    render() {
        return (
            <div>
                <div>
                <TextField onChange={this.handleChange} label='New Owner' />
                <br></br>
                <Buttons name='Add' onClick={this.handleClick} />
                <ul>
                            {this.props.Store.ownerList.map(item => 
                                <li key={item._id}>{item.OwnerName}</li>
                            )}
                        </ul>
                
                </div>
            </div>
         
        )
    }
}