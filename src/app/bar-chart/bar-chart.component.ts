import { Component, OnInit, Input } from '@angular/core';
import { Chart } from '../chart';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.less']
})

export class BarChartComponent implements OnInit {
  @Input() chartData: Chart;
  private width: number;
  private height: number;
  private margin = { top: 20, right: 20, bottom: 30, left: 40 };
  private x: any;
  private y: any;
  private svg: any;
  private g: any;

  private data: any = [];

  constructor() { }

  ngOnInit() {
    this.data = this.chartData;
    this.initSvg();
    this.initAxis();
    this.drawAxis();
    this.drawBars();
    // this.getChartClass();
  }

  private initSvg() {
    this.svg = d3.select('svg');
    console.log(this.svg, 'get svg element>>>');
    this.width = +this.svg.attr('width') - this.margin.left - this.margin.right;
    console.log(this.width, 'this.width>>>>>');
    this.height = +this.svg.attr('height') - this.margin.top - this.margin.bottom;
    console.log(this.height, 'heohgrt>>>');
    this.g = this.svg.append('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
    console.log(this.g, 'this.g>>>');
  }

  private initAxis() {
    const sortData: any = this.data.sort((a: any, b: any) => {
      if (a.time > b.time) {
        return a.time - b.time;
      }
    });
    this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(sortData.map((d) => d.time));
    // this.x.domain(STATISTICS.map((d) => d.letter));
    this.y.domain([0, 100]);
    // console.log(d3Array.max(STATISTICS, (d) => d.frequency), 'array max>>>>');

  }

  private drawAxis() {
    this.g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x));
    this.g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y).ticks(3))
      .append('text')
      .attr('class', 'axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Percentage');
  }

  // private getChartClass() {
  //   // console.log('chart color called>>>');
  //   // this.data.forEach((d) => {
  //   //   if(d.per >= '70') {
  //   //     this.g.selectAll('.bar').enter().append('rect').attr('class', 'dynamic-bar');
  //   //   }
  //   // })
  //   this.g.selectAll('.bar')
  //         .data(this.data)
  //         .enter().append('rect')
  //         .attr('class', (d) => (d.per >= '70') ? 'dynamic-bar': 'bar')
  //         .attr('x', (d) => this.x(d.time))
  //         .attr('y', (d) => this.y(d.per))
  //         .attr('width', this.x.bandwidth())
  //         .attr('height', (d) => this.height - this.y(d.per))
  // }

  private drawBars() {
    this.g.selectAll('.bar')
      .data(this.data)
      .enter().append('rect')
      .attr('class', (d) => (d.per >= '70') ? 'dynamic-bar' : 'bar')
      .attr('x', (d) => this.x(d.time))
      .attr('y', (d) => this.y(d.per))
      .attr('width', this.x.bandwidth())
      .attr('height', (d) => this.height - this.y(d.per));
    // .style('fill', this.getChartColor());
  }
}
