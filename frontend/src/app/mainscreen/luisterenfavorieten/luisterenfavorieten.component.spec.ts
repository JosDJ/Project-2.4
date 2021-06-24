import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuisterenfavorietenComponent } from './luisterenfavorieten.component';

describe('LuisterenfavorietenComponent', () => {
  let component: LuisterenfavorietenComponent;
  let fixture: ComponentFixture<LuisterenfavorietenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuisterenfavorietenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LuisterenfavorietenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
