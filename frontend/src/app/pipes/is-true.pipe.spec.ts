import { IsTruePipe } from './is-true.pipe';

describe('IsTruePipe', () => {
  it('create an instance', () => {
    const pipe = new IsTruePipe();
    expect(pipe).toBeTruthy();
  });
});
