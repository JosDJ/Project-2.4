import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuisterengenresComponent } from './luisterengenres.component';

describe('LuisterengenresComponent', () => {
  let component: LuisterengenresComponent;
  let fixture: ComponentFixture<LuisterengenresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuisterengenresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LuisterengenresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
