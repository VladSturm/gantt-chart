import React, { Component } from 'react';
import FusionCharts from 'fusioncharts';
import Widgets from 'fusioncharts/fusioncharts.widgets';
import Gantt from 'fusioncharts/fusioncharts.gantt';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import ReactFC from 'react-fusioncharts';

import { observer, inject } from 'mobx-react'


ReactFC.fcRoot(FusionCharts, Widgets, Gantt, FusionTheme);


@inject('Store')

@observer 
class Fusion extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {chartData } = this.props.Store
    return ( 
      <div className="App">
         {chartData && <ReactFC {...chartData} />}
      </div>
    ); 
  }
}

export default Fusion;
