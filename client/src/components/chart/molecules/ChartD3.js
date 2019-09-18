import React, {Component} from 'react'
import * as d3 from 'd3' 

export default class ChartD extends Component {
    constructor(props) {
        super(props)
        
    }
    componentDidMount() {
        this.getChart()
    }
  
    getChart() {
        const data = [15, 6, 10, 12, 3]
        const svg = d3.select('body')
            .append('svg')
            .attr('width', 700)
            .attr('height', 300)
            .style('margin-top', 100)
        
        svg.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', 20)
            .attr('y', (d, i) => i*50)
            .attr('width', (d, i) => d*10)
            .attr('height', 25)
            .attr('fill', '#d2c6c7')
           
        svg.selectAll('line')
            .data(data)
            .enter()
            .append('line')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', 100)            
            .attr('y2', 0)
            .attr('stroke', 'black')
            
            
        // svg.selectAll("text")
        //     .data(data)
        //     .enter()
        //     .append("text")
        //     .text((d) => d)
        //     .attr("x", (d, i) => i * 72)
        //     .attr("y", (d, i) => 300 - (10 * d) -3)
    }
    render() {
        return (
            <div>
                 <div id={"#" + this.props.id}></div>
            </div>
            
        )
    }
}