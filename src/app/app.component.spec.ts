import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CardComponentComponent } from './card-component/card-component.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CardComponentComponent,
        BarChartComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
