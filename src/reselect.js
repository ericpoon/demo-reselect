export function createSelectorCreator(isEqual) {

  function createSelector(...selectors) {
    let prevInput = [];
    let prevOutput;
    return function (...args) {
      const input = [];
      for (let i = 0; i < selectors.length - 1; i++) {
        input.push(selectors[i](...args));
      }

      let inputUnchanged = true;

      if (input.length !== prevInput.length) {
        inputUnchanged = false;
      } else {
        for (let i = 0; i < input.length; i++) {
          if (!isEqual(input[i], prevInput[i])) {
            inputUnchanged = false;
            break;
          }
        }
      }

      if (!inputUnchanged) {
        const outputSelector = selectors[selectors.length - 1];
        prevInput = input;
        prevOutput = outputSelector(...input);
      }
      return prevOutput;
    };
  }

  return createSelector;
}

export function createSelector(...selectors) {
  return createSelectorCreator(referenceEqual)(...selectors);
}

export function referenceEqual(a, b) {
  return a === b;
}

export function shallowObjectEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) {
      return false;
    }

    for (let i = 0; i < aKeys.length; i++) {
      if (a[aKeys] !== b[bKeys]) {
        return false;
      }
    }

    return true;
  }

  return a === b;
}
