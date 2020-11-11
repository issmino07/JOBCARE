import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cajas1Component } from './cajas1.component';

describe('Cajas1Component', () => {
  let component: Cajas1Component;
  let fixture: ComponentFixture<Cajas1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cajas1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cajas1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
