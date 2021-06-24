import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuisterenplaylistsComponent } from './luisterenplaylists.component';

describe('LuisterenplaylistsComponent', () => {
  let component: LuisterenplaylistsComponent;
  let fixture: ComponentFixture<LuisterenplaylistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuisterenplaylistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LuisterenplaylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
