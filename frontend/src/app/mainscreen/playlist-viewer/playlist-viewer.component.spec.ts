import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistViewerComponent } from './playlist-viewer.component';

describe('PlaylistViewerComponent', () => {
  let component: PlaylistViewerComponent;
  let fixture: ComponentFixture<PlaylistViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
