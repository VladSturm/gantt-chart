import React, {Component} from 'react'
import axios from 'axios'
import {TextField} from '@material-ui/core';
import { observer, inject } from 'mobx-react'
import Buttons from '../../chart/atoms/button'

@inject('Store')
@observer

export default class AddCategory extends Component {
    constructor(props) {
        super(props)
        this.handleChangeStart = this.handleChangeStart.bind(this)
        this.handleChangeEnd = this.handleChangeEnd.bind(this)
        this.handleChangeLabel = this.handleChangeLabel.bind(this)
        this.handleClick = this.handleClick.bind(this)
       
    }
    handleChangeStart(e) {
        this.props.Store.CategoryStartTarget = e.target.value
        console.log( this.props.Store.CategoryStartTarget)
    }
    handleChangeEnd(e) {
        this.props.Store.CategoryEndTarget = e.target.value
        console.log( this.props.Store.CategoryEndTarget)
    }
    handleChangeLabel(e) {
        this.props.Store.CategoryLabelTarget = e.target.value
        console.log( this.props.Store.CategoryLabelTarget)
    }
    handleClick(e) {
        e.preventDefault()
         let category = {
            start: this.props.Store.CategoryStartTarget,
            end: this.props.Store.CategoryEndTarget,
            label: this.props.Store.CategoryLabelTarget
         }
        axios.post('http://localhost:4000/category/add', category)
        alert('ADDED')
        this.props.Store.CategoryList.push(category)
    }

    render() {
        return (
            <div>
                <div>
                    <TextField InputLabelProps={{ shrink: true }} type="date" onChange={this.handleChangeStart} label='Start' />
                    <TextField InputLabelProps={{ shrink: true }} type="date" onChange={this.handleChangeEnd} label='End' />
                    <TextField onChange={this.handleChangeLabel} label='Name' />
                    <br></br>
                    <Buttons name='Add' onClick={this.handleClick} />
                    <ul>
                        {this.props.Store.CategoryList.map(item =>
                            <li>{item.label}</li>    
                        )}
                    </ul>
                </div>
            </div>
         
        )
    }
}