import React, {Component} from 'react'
import axios from 'axios'
import {  Disp } from '../../../style/style'
import { observer, inject } from 'mobx-react'
import { Dialog, DialogTitle, TextField,  Button , Fab  } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';


@inject('Store')

@observer
export default class Form extends Component {
    constructor(props) {
        super(props)
        this.handleChangeTask = this.handleChangeTask.bind(this)
        this.handleChangeOwner = this.handleChangeOwner.bind(this)
        this.handleChangeStart = this.handleChangeStart.bind(this)
        this.handleChangeEnd = this.handleChangeEnd.bind(this)

        this.handleClose = this.handleClose.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
        this.handleAdd = this.handleAdd.bind(this)

    }

    handleChangeTask(e) {
        this.props.Store.TaskNameTarget = e.target.value
        console.log(this.props.Store.TaskNameTarget)
    }
    handleChangeOwner(e) {
        this.props.Store.OwnerNameTarget = e.target.value
        console.log(this.props.Store.OwnerNameTarget)
    }
    handleChangeStart(e) {
        this.props.Store.StartDateTarget = e.target.value
        this.props.Store.EndDateTarget = e.target.value
        console.log(this.props.Store.StartDateTarget)
    }
    handleChangeEnd(e) {
        this.props.Store.EndDateTarget = e.target.value
        console.log(this.props.Store.EndDateTarget)
    }
    
    
    handleAdd(e) {
        e.preventDefault()
        let newElement = {
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
        this.props.Store.processe.push(newLabel)
        this.props.Store.newTask.push(newTask) 
        this.props.Store.OwnerName.push(newOwner) 

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
        
        axios.post('http://localhost:4000/chart/add', newElement)
        .then(res => console.log(res.data))
        this.setState({
            display: 'none'
        })
        this.props.Store.displayOpen = false
    }

   

    handleOpen() {
        this.props.Store.displayOpen = true
    }
    handleClose() {
        this.props.Store.displayOpen = false
    }
    
    render() {
        return (
            <div>
            <Fab size='small' onClick={this.handleOpen}>
              <AddIcon />
            </Fab>
                <Dialog 
                    open={this.props.Store.displayOpen}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >   
                    <DialogTitle>Add Item</DialogTitle>
                    <Disp>
                        <TextField onChange={this.handleChangeTask} label='Task Name' />
                        <select onChange={this.handleChangeOwner} name='OwnerName'>
                                {this.props.Store.ownerList.map(item => 
                                    <option key={item._id}>{item.OwnerName}</option>
                                )}
                                </select>
                        <TextField onChange={this.handleChangeStart} InputLabelProps={{ shrink: true }} type="date" label='Start Date' />
                        <TextField value={this.props.Store.EndDateTarget} onChange={this.handleChangeEnd} InputLabelProps={{ shrink: true }} type="date" label='End Date' />
                        <Button onClick={this.handleAdd}>Add</Button>
                    </Disp>
                </Dialog>
            </div>
        )
    }
}