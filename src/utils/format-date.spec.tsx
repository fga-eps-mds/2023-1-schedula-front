import { parseSelectedDate } from './format-date';

describe('parseSelectedDate', () => {
  it('should return the formatted date string', () => {
    const input = '2023-06-21T12:34:56Z';
    const expectedOutput = '2023-06-21';
    expect(parseSelectedDate(input)).toEqual(expectedOutput);
  });
});
