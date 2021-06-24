import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuisterenrecentComponent } from './luisterenrecent.component';

describe('LuisterenrecentComponent', () => {
  let component: LuisterenrecentComponent;
  let fixture: ComponentFixture<LuisterenrecentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuisterenrecentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LuisterenrecentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
