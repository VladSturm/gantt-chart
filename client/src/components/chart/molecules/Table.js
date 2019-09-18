import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import {Disp} from '../../../style/style'
import axios from 'axios'
import Buttons from '../atoms/button'
import { Dialog, DialogTitle, Table, TableRow, TableHead, TableCell, TableBody  } from '@material-ui/core';

@inject('Store')

@observer

export default class TableList extends Component {
    constructor(props) {
        super(props)
        this.handleClose = this.handleClose.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
    }
    handleOpen() {
        this.props.Store.displayOpenTable = true
        axios.get('http://localhost:4000/chart')
        .then(res => this.props.Store.dataFromMongo = res.data)
        
    }
    handleClose() {
        this.props.Store.displayOpenTable = false
    }

    render() {
        return (
            <div>
                <Buttons name='Open Table' onClick={this.handleOpen} />
             <Dialog maxWidth='lg' open={this.props.Store.displayOpenTable}
                     onClose={this.handleClose}
                     aria-labelledby="form-dialog-title">
                     <DialogTitle>Table</DialogTitle>
                        <Disp>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Task Name</TableCell>
                                        <TableCell >Owner</TableCell>
                                        <TableCell colSpan='2'>Date</TableCell>
                                        <TableCell colSpan='2'>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {this.props.Store.dataFromMongo.map(item => {
                                    return <TableRow key={item._id}>
                                            <TableCell>{item.TaskName}</TableCell>
                                            <TableCell>{item.OwnerName}</TableCell>
                                            <TableCell>{item.StartDate}</TableCell>
                                            <TableCell>{item.EndDate}</TableCell>
                                            <TableCell><Link to={'/edit/'+ item._id}><Buttons onClick={this.handleClose} name='edit'></Buttons></Link></TableCell>
                                            <TableCell><button onClick={(e) => {
                                                e.preventDefault()
                                                const removeLabel = item.TaskName
                                                const removeOwner = item.OwnerName
                                                const removeStartDate = item.StartDate
                                                const removeEndDate = item.EndDate

                                                let withoutLabel = this.props.Store.processe.filter(x => x.label !== removeLabel)
                                                let withoutOwner = this.props.Store.OwnerName.filter(x => x.label !== removeOwner)
                                                let withoutStartDate = this.props.Store.newTask.filter(x => x.start !== removeStartDate)
                                                let withoutEndDate= this.props.Store.newTask.filter(x => x.end !== removeEndDate)

                                                let newTask = [...withoutStartDate, ...withoutEndDate]
                                                let newTaskSet = [... new Set(newTask)]

                                                this.props.Store.processe = withoutLabel
                                                this.props.Store.OwnerName = withoutOwner
                                                this.props.Store.newTask = newTaskSet
                                                
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
                                                axios.get('http://localhost:4000/chart/delete/' + item._id)
                                                .then(console.log('delete'))
                                                console.log(this.props.Store.go)
                                                this.setState({
                                                    display: 'none'
                                                })
                                                axios.get('http://localhost:4000/chart')
                                                .then(res => this.props.Store.dataFromMongo = res.data)
                                            }}>Delete</button></TableCell>
                                        </TableRow>
                                })}
                                </TableBody>
                            </Table>
                        </Disp>
                    </Dialog>
            </div>
                
        )
    }
}