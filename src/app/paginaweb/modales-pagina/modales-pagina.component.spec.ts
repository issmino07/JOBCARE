import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalesPaginaComponent } from './modales-pagina.component';

describe('ModalesPaginaComponent', () => {
  let component: ModalesPaginaComponent;
  let fixture: ComponentFixture<ModalesPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalesPaginaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalesPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
