import { createSelector } from '../src/reselect';

it('accepts only one selector', () => {
  const inputSelector = jest.fn((x) => x * 2);
  const selector = createSelector(inputSelector);

  expect(selector(1)).toBe(undefined);
  expect(inputSelector).toHaveBeenCalledTimes(0);
});

it('accepts input selectors returning undefined', () => {
  const inputSelector = jest.fn(() => undefined);
  const outputSelector = jest.fn(() => 100);
  const selector = createSelector(inputSelector, outputSelector);

  expect(selector()).toBe(100);
});

describe('recalculates if input changes', () => {
  it('recalculates if the only input changes', () => {
    const inputSelector = jest.fn((x) => x * 2);
    const outputSelector = jest.fn((x) => x / 2);
    const selector = createSelector(inputSelector, outputSelector);

    expect(selector(1)).toBe(1);
    expect(inputSelector).toHaveBeenCalledTimes(1);
    expect(outputSelector).toHaveBeenCalledTimes(1);

    expect(selector(2)).toBe(2);
    expect(inputSelector).toHaveBeenCalledTimes(2);
    expect(outputSelector).toHaveBeenCalledTimes(2);
  });
  it('recalculates if one of the inputs changes', () => {
    const inputSelectorA = jest.fn((x) => x * x);
    const inputSelectorB = jest.fn((x) => x * x * x * x);
    const inputSelectorC = jest.fn((x) => x + 1);
    const outputSelector = jest.fn((x, y, z) => x + y + z);
    const selector = createSelector(inputSelectorA, inputSelectorB, inputSelectorC, outputSelector);

    expect(selector(2)).toBe(23);
    expect(inputSelectorA).toHaveBeenCalledTimes(1);
    expect(inputSelectorB).toHaveBeenCalledTimes(1);
    expect(inputSelectorC).toHaveBeenCalledTimes(1);
    expect(outputSelector).toHaveBeenCalledTimes(1);

    expect(selector(-2)).toBe(19);
    expect(inputSelectorA).toHaveBeenCalledTimes(2);
    expect(inputSelectorB).toHaveBeenCalledTimes(2);
    expect(inputSelectorC).toHaveBeenCalledTimes(2);
    expect(outputSelector).toHaveBeenCalledTimes(2);
  });
});

describe('returns the cached output if input does not change', () => {
  it('accepts one pre-selector and one output selector', () => {
    const inputSelector = jest.fn((x) => x * 2);
    const outputSelector = jest.fn((x) => x / 2);
    const selector = createSelector(inputSelector, outputSelector);

    expect(selector(1)).toBe(1);
    expect(inputSelector).toHaveBeenCalledTimes(1);
    expect(outputSelector).toHaveBeenCalledTimes(1);

    expect(selector(1)).toBe(1);
    expect(inputSelector).toHaveBeenCalledTimes(2);
    expect(outputSelector).toHaveBeenCalledTimes(1);
  });

  it('accepts more than one input selectors', () => {
    const inputSelectorA = jest.fn((x) => x * 2);
    const inputSelectorB = jest.fn((x) => x * 3);
    const inputSelectorC = jest.fn((x) => x * 5);
    const outputSelector = jest.fn((x, y, z) => x + y + z);
    const selector = createSelector(inputSelectorA, inputSelectorB, inputSelectorC, outputSelector);

    expect(selector(1)).toBe(10);
    expect(inputSelectorA).toHaveBeenCalledTimes(1);
    expect(inputSelectorB).toHaveBeenCalledTimes(1);
    expect(inputSelectorC).toHaveBeenCalledTimes(1);
    expect(outputSelector).toHaveBeenCalledTimes(1);

    expect(selector(1)).toBe(10);
    expect(inputSelectorA).toHaveBeenCalledTimes(2);
    expect(inputSelectorB).toHaveBeenCalledTimes(2);
    expect(inputSelectorC).toHaveBeenCalledTimes(2);
    expect(outputSelector).toHaveBeenCalledTimes(1);
  });
});
