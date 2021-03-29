import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertasPremiumComponent } from './ofertas-premium.component';

describe('OfertasPremiumComponent', () => {
  let component: OfertasPremiumComponent;
  let fixture: ComponentFixture<OfertasPremiumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfertasPremiumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertasPremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
