import { createSelector } from './reselect';

const sum = createSelector((n) => {
  return n;
}, (n) => {
  let sum = 0;
  for (let i = 0; i <= n; i++) {
    sum += i;
  }
  return sum;
});

console.time('first run');
console.log(sum(1000000000));
console.timeEnd('first run');

console.time('second run');
console.log(sum(1000000000));
console.timeEnd('second run');
