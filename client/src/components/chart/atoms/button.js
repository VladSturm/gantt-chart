import React, {Component} from 'react'
import { ButtonStyle } from '../../../style/style'

export default class Button extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
          <ButtonStyle 
            width={this.props.width}
            onClick={this.props.onClick}
            >
            {this.props.name}</ButtonStyle>
        )
    }
}