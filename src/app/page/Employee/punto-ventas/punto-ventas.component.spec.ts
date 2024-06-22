import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntoVentasComponent } from './punto-ventas.component';

describe('PuntoVentasComponent', () => {
  let component: PuntoVentasComponent;
  let fixture: ComponentFixture<PuntoVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuntoVentasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PuntoVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
