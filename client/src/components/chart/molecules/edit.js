import React, {Component} from 'react'
import { observer, inject } from 'mobx-react'
import axios from 'axios'
import {EditForm} from '../../../style/style'
import {Link} from 'react-router-dom'

import {TextField,  Button } from '@material-ui/core';



@inject('Store')
@observer
export default class Edit extends Component {
    constructor(props) {
        super(props)
        this.handleChangeTask = this.handleChangeTask.bind(this)
        this.handleChangeOwner = this.handleChangeOwner.bind(this)
        this.handleChangeStart = this.handleChangeStart.bind(this)
        this.handleChangeEnd = this.handleChangeEnd.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
    }
    
    handleChangeTask(e) {
        this.props.Store.TaskNameTarget = e.target.value
        console.log(this.props.Store.TaskNameTarget)
    }
    handleChangeOwner(e) {
        this.props.Store.OwnerNameTarget = e.target.value
    }
    handleChangeStart(e) {
        this.props.Store.StartDateTarget = e.target.value
    }
    handleChangeEnd(e) {
        this.props.Store.EndDateTarget = e.target.value
    }
    
    handleUpdate(e) {
        e.preventDefault()
        let newElem = {}
            newElem = {
            
                TaskName: this.props.Store.TaskNameTarget,
                OwnerName: this.props.Store.OwnerNameTarget,
                StartDate: this.props.Store.StartDateTarget,
                EndDate: this.props.Store.EndDateTarget
            
        }

        let newLabel = {}
        let newTask = {}
        let newOwner= {}

        newLabel = {
            label: this.props.Store.TaskNameTarget
        }
        newTask = {
            start: this.props.Store.StartDateTarget,
            end: this.props.Store.EndDateTarget
        }
        newOwner = {
            label: this.props.Store.OwnerNameTarget
        }
        const updateProcesse = this.props.Store.processe.map(x => {
            console.log('update process'
            )
            return x.label === newLabel.label ? x : newLabel})
        const updateOwner = this.props.Store.OwnerName.map(x => x.label === newOwner.label ? x : newOwner)
        const updateStart = this.props.Store.newTask.map(x => x.start === newTask.start ? x : newTask)
        const updateEnd = this.props.Store.newTask.map(x => x.end === newTask.end ? x : newTask)
        console.log('____', updateProcesse, updateOwner, updateStart, updateEnd)
        
        // this.props.Store.processe.push(newLabel)
        // this.props.Store.newTask.push(newTask) 
        // this.props.Store.OwnerName.push(newOwner) 

        this.props.Store.chartData = {
            type: 'gantt',
            width: 1400,
            height: 500,
            dataFormat: 'json',
            dataSource: {
            chart: {
                dateformat: "yyyy-mm-dd",
                caption: "42 dp",
                subcaption: "Gantt chart",
                theme: "fusion",
                canvasBorderAlpha: "40"
            },
            datatable: {
                headervalign: "bottom",
                datacolumn: [
                {
                    headertext: "Owner",
                    headervalign: "bottom",
                    headeralign: "left",
                    align: "left",
                    text: this.props.Store.OwnerName
                }
                ]
            },
            categories: [{
                category: this.props.Store.CategoryFertig
            }],
            processes: {
                fontsize: "16",
                isbold: "2",
                align: "left",
                headertext: "Tasks",
                headervalign: "bottom",
                headeralign: "left",
                process: this.props.Store.processe
            },
            tasks: {
                color: "#5D62B5",
                task: this.props.Store.newTask
            }
            }
        }
        axios.post('http://localhost:4000/chart/update/' + this.props.match.params.id, newElem)
        .then(res => console.log(res.data))
        alert('Updated')
        

    }

    componentDidMount() {
        axios.get('http://localhost:4000/chart/edit/' + this.props.match.params.id)
        .then(res => {
            this.props.Store.TaskNameTarget = res.data.TaskName
            this.props.Store.OwnerNameTarget = res.data.OwnerName
            this.props.Store.StartDateTarget = res.data.StartDate
            this.props.Store.EndDateTarget = res.data.EndDate
        })
    }
    render() {
        return (
            <div>
                <EditForm>
                    <div className='editForm_wrapp'>
                    
                    <Link to='/'>Close</Link>
                    <ul> 
                        <li>
                            <label>Task Name</label><br/>
                            <input value={this.props.Store.TaskNameTarget} onChange={this.handleChangeTask} name='TaskName' type='text'></input>
                        </li>
                        <li>
                        <select onChange={this.handleChangeOwner} name='OwnerName'>
                            {this.props.Store.ownerList.map(item => 
                                <option key={item._id}>{item.OwnerName}</option>
                            )}
                        </select>
                                </li>
                                <li>
                                    <label>Start Date</label><br/>
                                    <input value={this.props.Store.StartDateTarget} onChange={this.handleChangeStart} name='StartDate' type='date'></input>
                                </li>
                                <li>
                                    <label>End Date</label><br/>
                                    <input value={this.props.Store.EndDateTarget} onChange={this.handleChangeEnd} name='EndDate' type='date'></input>
                                </li>
                                
                                <button onClick={this.handleUpdate}>Update</button>
                            </ul> 
                    </div>
                </EditForm>
                <TextField value={this.props.Store.TaskNameTarget} onChange={this.handleChangeTask} label='Task Name' />
                
                        <select onChange={this.handleChangeOwner} name='OwnerName'>
                                {this.props.Store.ownerList.map(item => 
                                    <option key={item._id}>{item.OwnerName}</option>
                                )}
                        </select>
                        <TextField onChange={this.handleChangeStart} value={this.props.Store.StartDateTarget} InputLabelProps={{ shrink: true }} type="date" label='Start Date' />
                        <TextField value={this.props.Store.EndDateTarget} onChange={this.handleChangeEnd} InputLabelProps={{ shrink: true }} type="date" label='End Date' />
            </div>
        )
    }
}