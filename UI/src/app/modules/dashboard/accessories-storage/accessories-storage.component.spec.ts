import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoriesStorageComponent } from './accessories-storage.component';

describe('AccessoriesStorageComponent', () => {
  let component: AccessoriesStorageComponent;
  let fixture: ComponentFixture<AccessoriesStorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessoriesStorageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessoriesStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
