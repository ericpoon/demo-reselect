import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { createSelector } from '../../src/reselect';

class Main extends Component {
  calculatingSum = () => {
    const sum = createSelector(n => n, n => {
      let sum = 0;
      for (let i = 0; i <= n; i++) {
        sum += i;
      }
      return sum;
    });

    console.log('********** Start calculating sum **********');

    console.time('first run');
    console.log('\nsum(1000000000) = ' + sum(1000000000));
    console.timeEnd('first run');

    console.time('second run');
    console.log('\nsum(1000000000) = ' + sum(1000000000));
    console.timeEnd('second run');

    console.time('third run');
    console.log('\nsum(1000000000) = ' + sum(1000000000));
    console.timeEnd('third run');
  };

  render() {
    return (
      <div>
        <h2>Demo - Reselect</h2>
        <p>Calculate: sum 1+2+...+1000000000</p>
        <button onClick={this.calculatingSum}>Start</button>
      </div>
    );
  }
}

const app = document.getElementById('sum-app');
if (app) ReactDom.render(<Main />, app);
