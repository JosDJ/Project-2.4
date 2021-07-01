import { IsFirstPlayingPipe } from './is-first-playing.pipe';

describe('IsFirstPlayingPipe', () => {
  it('create an instance', () => {
    const pipe = new IsFirstPlayingPipe();
    expect(pipe).toBeTruthy();
  });
});
