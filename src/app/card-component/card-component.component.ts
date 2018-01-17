import { Component, OnInit } from '@angular/core';
import { Chart } from '../chart';

@Component({
  selector: 'app-card-component',
  templateUrl: './card-component.component.html',
  styleUrls: ['./card-component.component.less']
})
export class CardComponentComponent implements OnInit {
  svgClass: any[] = ['bw-svg', 'cpu-svg', 'memory-svg'];

  bandwidthData: Chart[] = [
    { time: 1000, per: '10' },
    { time: 1100, per: '20' },
    { time: 1500, per: '70' },
    { time: 1600, per: '50' },
    { time: 200, per: '30' },
    { time: 2100, per: '50' },
    { time: 1800, per: '80' },
    { time: 2300, per: '90' }
  ];

  cpuData: Chart[] = [
    { time: 1000, per: '15' },
    { time: 1100, per: '30' },
    { time: 1500, per: '70' },
    { time: 1600, per: '60' },
    { time: 200, per: '75' },
    { time: 2100, per: '50' },
    { time: 1800, per: '80' },
    { time: 2300, per: '20' }
  ];

  memoryData: Chart[] = [
    { time: 1000, per: '05' },
    { time: 1100, per: '25' },
    { time: 1500, per: '70' },
    { time: 1600, per: '55' },
    { time: 200, per: '30' },
    { time: 2100, per: '70' },
    { time: 1800, per: '80' },
    { time: 2300, per: '10' }
  ];
  constructor() { }

  ngOnInit() {
  }

}
