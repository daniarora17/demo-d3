import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Chart } from '../chart';

import { select } from 'd3-selection';
import { scaleBand, scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.less']
})

export class BarChartComponent implements OnInit, AfterViewInit {
  @Input() chartData: Chart;
  @Input() ngClass;
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
  }

  ngAfterViewInit() {
    this.initSvg();
    this.initAxis();
    this.drawAxis();
    this.drawBars();
  }

  private initSvg() {
    const svgClass = 'svg.' + this.ngClass;
    this.svg = select(svgClass);
    this.width = +this.svg.attr('width') - this.margin.left - this.margin.right;
    this.height = +this.svg.attr('height') - this.margin.top - this.margin.bottom;
    this.g = this.svg.append('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  private initAxis() {
    const sortData: any = this.data.sort((a: any, b: any) => {
      if (a.time > b.time) {
        return a.time - b.time;
      }
    });
    this.x = scaleBand().rangeRound([0, this.width]).padding(0.1);
    this.y = scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(sortData.map((d) => d.time));
    this.y.domain([0, 100]);
  }

  private drawAxis() {
    this.g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(axisBottom(this.x));
    this.g.append('g')
      .attr('class', 'axis axis--y')
      .call(axisLeft(this.y).ticks(3))
      .append('text')
      .attr('class', 'axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Percentage');
  }

  private drawBars() {
    this.g.selectAll('.bar')
      .data(this.data)
      .enter().append('rect')
      .attr('class', (d) => (d.per >= '70') ? 'dynamic-bar' : 'bar')
      .attr('x', (d) => this.x(d.time))
      .attr('y', (d) => this.y(d.per))
      .attr('width', this.x.bandwidth())
      .attr('height', (d) => this.height - this.y(d.per));
  }
}
