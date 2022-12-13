import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NguxDropdownComponent } from './dropdown.component';

describe('NguxComponent', () => {
  let component: NguxDropdownComponent;
  let fixture: ComponentFixture<NguxDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NguxDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NguxDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
