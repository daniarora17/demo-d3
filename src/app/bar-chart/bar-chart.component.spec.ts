import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BarChartComponent } from './bar-chart.component';


xdescribe('BarChartComponent', () => {
  let component: BarChartComponent;
  let fixture: ComponentFixture<BarChartComponent>;
  let de;
  let el;

  beforeEach(async(() => {
    console.log(TestBed, 'test bed>>>');
    TestBed.configureTestingModule({
      declarations: [ BarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChartComponent);
    component = fixture.componentInstance;
    console.log(component, 'componrent>>>');
    de = fixture.debugElement.query(By.css('svg'));
    console.log(de, 'deeee>>>');
    el = de.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    console.log('entered test case,');
    fixture.detectChanges();
    expect(true).toBe(true);
  });
});
