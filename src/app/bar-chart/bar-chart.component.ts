import { Component, ElementRef, OnDestroy, OnInit, NgZone } from '@angular/core';

import {
  D3Service,
  D3,
  Axis,
  BrushBehavior,
  BrushSelection,
  D3BrushEvent,
  ScaleLinear,
  ScaleOrdinal,
  Selection,
  Transition
} from 'd3-ng2-service';

import { Chart } from '../chart';

@Component({
  selector: 'app-bar-chart',
  template: '<svg width="200" height="200"></svg>'

})
export class BarChartComponent implements OnInit, OnDestroy {
  private d3: D3;
  private parentNativeElement: any;
  private d3Svg: Selection<SVGSVGElement, any, null, undefined>;

  cconstructor(element: ElementRef, private ngZone: NgZone, d3Service: D3Service) {
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {
    const self = this;
    const d3 = this.d3;
    const padding = 25;
    const width = 500;
    const height = 150;
    let svg: any;
    let colors: any = [];
    let data: Chart[] = [];
    let xScale: any;
    let yScale: any;
    let xAxis: any;
    let yAxis: any;
    console.log(d3, 'jbhvjvv>>>>.');
    console.log(this.parentNativeElement, 'parent elmmm>>>');
    if (this.parentNativeElement !== null) {
      svg = this.d3.select(this.parentNativeElement)
        .append('svg')        // create an <svg> element
        .attr('width', width) // set its dimensions
        .attr('height', height);

      colors = ['red', 'yellow', 'green', 'blue'];

      data = [
        { name: 'A', yVal: 1 },
        { name: 'B', yVal: 4 },
        { name: 'C', yVal: 2 },
        { name: 'D', yVal: 3 }
      ];

      xScale = this.d3.scaleBand()
        .domain(data.map(function (d) { return d.name; }))
        .range([0, 200]);

      yScale = this.d3.scaleLinear()
        .domain([0, this.d3.max(data, function (d) { return d.yVal; })])
        .range([100, 0]);

      xAxis = this.d3.axisBottom(xScale) // d3.js v.4
        .ticks(5)
        .scale(xScale);

      yAxis = this.d3.axisLeft(xScale) // d3.js v.4
        .scale(yScale)
        .ticks(7);

      svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + (padding) + ',' + padding + ')')
        .call(yAxis);

      svg.append('g')            // create a <g> element
        .attr('class', 'axis')   // specify classes
        .attr('transform', 'translate(' + padding + ',' + (height - padding) + ')')
        .call(xAxis);            // let the axis do its thing
      const rects = svg.selectAll('rect')
        .data(data);
      rects.size();

      const newRects = rects.enter();

      newRects.append('rect')
        .attr('x', function (d, i) {
          return xScale(d.name);
        })
        .attr('y', function (d) {
          return yScale(d.yVal);
        })
        .attr('transform', 'translate(' + (padding - 5 + 25) + ',' + (padding - 5) + ')')
        .attr('height', function (d) {
          return height - yScale(d.yVal) - (2 * padding) + 5
        })
        .attr('width', 10)
        .attr('fill', function (d, i) {
          return colors[i];
        });
    }
  }

  ngOnDestroy() {
  }
}
