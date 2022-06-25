import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsbitsComponent } from './newsbits.component';

describe('NewsbitsComponent', () => {
  let component: NewsbitsComponent;
  let fixture: ComponentFixture<NewsbitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsbitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsbitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
