import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilesPremiumComponent } from './perfiles-premium.component';

describe('PerfilesPremiumComponent', () => {
  let component: PerfilesPremiumComponent;
  let fixture: ComponentFixture<PerfilesPremiumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilesPremiumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilesPremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
