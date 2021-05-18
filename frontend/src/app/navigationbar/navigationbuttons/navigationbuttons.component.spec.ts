import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationbuttonsComponent } from './navigationbuttons.component';

describe('NavigationbuttonsComponent', () => {
  let component: NavigationbuttonsComponent;
  let fixture: ComponentFixture<NavigationbuttonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationbuttonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationbuttonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
