import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegisCustComponent } from './modal-regis-cust.component';

describe('ModalRegisCustComponent', () => {
  let component: ModalRegisCustComponent;
  let fixture: ComponentFixture<ModalRegisCustComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalRegisCustComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalRegisCustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
