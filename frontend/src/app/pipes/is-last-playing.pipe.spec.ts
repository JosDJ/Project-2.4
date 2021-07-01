import { IsLastPlayingPipe } from './is-last-playing.pipe';

describe('IsLastPlayingPipe', () => {
  it('create an instance', () => {
    const pipe = new IsLastPlayingPipe();
    expect(pipe).toBeTruthy();
  });
});
