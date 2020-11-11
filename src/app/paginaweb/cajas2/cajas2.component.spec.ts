import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cajas2Component } from './cajas2.component';

describe('Cajas2Component', () => {
  let component: Cajas2Component;
  let fixture: ComponentFixture<Cajas2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cajas2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cajas2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
