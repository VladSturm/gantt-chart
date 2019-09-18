import React, { Component } from "react";
import styled from 'styled-components'
import Chart from './chart/organisms/chart'
import {GlobalStyle , MainApp} from '../style/style'
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"



class App extends Component {
    render() {
        return (
            
                <div className='App'> 
                
                    <MainApp> 
                    <GlobalStyle />
                        <Chart />
                    </MainApp> 
                </div>
           
        );
    }
}

export default App;