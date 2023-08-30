import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketoverviewComponent } from './marketoverview.component';

describe('MarketoverviewComponent', () => {
  let component: MarketoverviewComponent;
  let fixture: ComponentFixture<MarketoverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarketoverviewComponent]
    });
    fixture = TestBed.createComponent(MarketoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
