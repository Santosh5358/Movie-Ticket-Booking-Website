import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMoiveComponent } from './add-moive.component';

describe('AddMoiveComponent', () => {
  let component: AddMoiveComponent;
  let fixture: ComponentFixture<AddMoiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddMoiveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddMoiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
