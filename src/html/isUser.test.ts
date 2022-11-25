import { isUser } from './isUser';

describe('isUser()', () => {
  test('detects user', () => {
    expect(isUser({ type: 'User' })).toBe(true);
  });
  test('detects bot', () => {
    expect(isUser({ type: 'Bot' })).toBe(false);
  });
});
