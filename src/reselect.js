export function createSelector(...selectors) {
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
        if (input[i] !== prevInput[i]) {
          inputUnchanged = false;
          break;
        }
      }
    }

    if (!inputUnchanged) {
      const finalSelector = selectors[selectors.length - 1];
      prevInput = input;
      prevOutput = finalSelector(...input);
    }
    return prevOutput;
  };
}