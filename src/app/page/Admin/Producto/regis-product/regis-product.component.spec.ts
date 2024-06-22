import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisProductComponent } from './regis-product.component';

describe('RegisProductComponent', () => {
  let component: RegisProductComponent;
  let fixture: ComponentFixture<RegisProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
