import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuisterenComponent } from './luisteren.component';

describe('LuisterenComponent', () => {
  let component: LuisterenComponent;
  let fixture: ComponentFixture<LuisterenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuisterenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LuisterenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
