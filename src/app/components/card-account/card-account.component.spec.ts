import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAccountComponent } from './card-account.component';

describe('CardAccountComponent', () => {
  let component: CardAccountComponent;
  let fixture: ComponentFixture<CardAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
