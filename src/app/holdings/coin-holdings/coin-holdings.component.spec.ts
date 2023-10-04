import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinHoldingsComponent } from './coin-holdings.component';

describe('CoinHoldingsComponent', () => {
  let component: CoinHoldingsComponent;
  let fixture: ComponentFixture<CoinHoldingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoinHoldingsComponent]
    });
    fixture = TestBed.createComponent(CoinHoldingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
