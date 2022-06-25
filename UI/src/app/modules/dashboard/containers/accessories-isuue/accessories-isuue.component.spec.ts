import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoriesIsuueComponent } from './accessories-isuue.component';

describe('AccessoriesIsuueComponent', () => {
  let component: AccessoriesIsuueComponent;
  let fixture: ComponentFixture<AccessoriesIsuueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessoriesIsuueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessoriesIsuueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
