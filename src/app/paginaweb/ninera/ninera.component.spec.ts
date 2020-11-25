import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NineraComponent } from './ninera.component';

describe('NineraComponent', () => {
  let component: NineraComponent;
  let fixture: ComponentFixture<NineraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NineraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NineraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
