import { createSelector } from '../src/reselect';

it('accepts only one selector', () => {
  const preSelector = jest.fn((x) => x * 2);
  const selector = createSelector(preSelector);

  expect(selector(1)).toBe(undefined);
  expect(preSelector).toHaveBeenCalledTimes(0);
});

it('accepts pre-selectors returning undefined', () => {
  const preSelector = jest.fn(() => undefined);
  const finalSelector = jest.fn(() => 100);
  const selector = createSelector(preSelector, finalSelector);

  expect(selector()).toBe(100);
});

describe('recalculates if input changes', () => {
  it('recalculates if the only input changes', () => {
    const preSelector = jest.fn((x) => x * 2);
    const finalSelector = jest.fn((x) => x / 2);
    const selector = createSelector(preSelector, finalSelector);

    expect(selector(1)).toBe(1);
    expect(preSelector).toHaveBeenCalledTimes(1);
    expect(finalSelector).toHaveBeenCalledTimes(1);

    expect(selector(2)).toBe(2);
    expect(preSelector).toHaveBeenCalledTimes(2);
    expect(finalSelector).toHaveBeenCalledTimes(2);
  });
  it('recalculates if one of the inputs changes', () => {
    const preSelectorA = jest.fn((x) => x * x);
    const preSelectorB = jest.fn((x) => x * x * x * x);
    const preSelectorC = jest.fn((x) => x + 1);
    const finalSelector = jest.fn((x, y, z) => x + y + z);
    const selector = createSelector(preSelectorA, preSelectorB, preSelectorC, finalSelector);

    expect(selector(2)).toBe(23);
    expect(preSelectorA).toHaveBeenCalledTimes(1);
    expect(preSelectorB).toHaveBeenCalledTimes(1);
    expect(preSelectorC).toHaveBeenCalledTimes(1);
    expect(finalSelector).toHaveBeenCalledTimes(1);

    expect(selector(-2)).toBe(19);
    expect(preSelectorA).toHaveBeenCalledTimes(2);
    expect(preSelectorB).toHaveBeenCalledTimes(2);
    expect(preSelectorC).toHaveBeenCalledTimes(2);
    expect(finalSelector).toHaveBeenCalledTimes(2);
  });
});

describe('returns the cached output if input does not change', () => {
  it('accepts one pre-selector and one final selector', () => {
    const preSelector = jest.fn((x) => x * 2);
    const finalSelector = jest.fn((x) => x / 2);
    const selector = createSelector(preSelector, finalSelector);

    expect(selector(1)).toBe(1);
    expect(preSelector).toHaveBeenCalledTimes(1);
    expect(finalSelector).toHaveBeenCalledTimes(1);

    expect(selector(1)).toBe(1);
    expect(preSelector).toHaveBeenCalledTimes(2);
    expect(finalSelector).toHaveBeenCalledTimes(1);
  });

  it('accepts more than one pre-selectors', () => {
    const preSelectorA = jest.fn((x) => x * 2);
    const preSelectorB = jest.fn((x) => x * 3);
    const preSelectorC = jest.fn((x) => x * 5);
    const finalSelector = jest.fn((x, y, z) => x + y + z);
    const selector = createSelector(preSelectorA, preSelectorB, preSelectorC, finalSelector);

    expect(selector(1)).toBe(10);
    expect(preSelectorA).toHaveBeenCalledTimes(1);
    expect(preSelectorB).toHaveBeenCalledTimes(1);
    expect(preSelectorC).toHaveBeenCalledTimes(1);
    expect(finalSelector).toHaveBeenCalledTimes(1);

    expect(selector(1)).toBe(10);
    expect(preSelectorA).toHaveBeenCalledTimes(2);
    expect(preSelectorB).toHaveBeenCalledTimes(2);
    expect(preSelectorC).toHaveBeenCalledTimes(2);
    expect(finalSelector).toHaveBeenCalledTimes(1);
  });
});
