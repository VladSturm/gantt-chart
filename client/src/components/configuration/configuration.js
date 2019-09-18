import React, {Component} from 'react'
import {  Disp } from '../../style/style'
import Buttons from '../chart/atoms/button'
import { observer, inject } from 'mobx-react'
import { Dialog, DialogTitle, TextField,  Button  } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Owner from './Owner/owner'
import Category from '../chart/molecules/Category'


@inject('Store')

@observer
export default class Config extends Component {
    constructor(props) {
        super(props)
        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }
    handleOpen() {
        this.props.Store.displayOpenConfig = true
    }
    handleClose() {
        this.props.Store.displayOpenConfig = false
    }
    render() {
        return (
            <div>
            <Buttons name='Open Config' onClick={this.handleOpen} />
                <Dialog fullScreen
                open={this.props.Store.displayOpenConfig}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
                >
                <IconButton  onClick={this.handleClose}>
                    <CloseIcon />
                </IconButton>
                <DialogTitle>Config</DialogTitle>
                    <Disp>
                        <Owner />
                        <Category />
                    </Disp>
                </Dialog>
            </div>
        )
    }
}