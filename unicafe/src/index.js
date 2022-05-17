import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';

const store = configureStore({ reducer });

function Statistics() {
  const { good, ok, bad } = store.getState();

  const results = () => (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="ok" value={ok} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={good + ok + bad} />
        <StatisticLine text="average" value={(good - bad) / (good + bad + ok)} />
        <StatisticLine text="positive" value={`${good / (good + ok + bad) * 100} %`} />
      </tbody>
    </table>
  );

  return (
    <div>
      <h1>statistics</h1>

      {
        (good + ok + bad) > 0
          ? results()
          : <p>No feedback given</p>
      }

    </div>
  );
}

function StatisticLine({ text, value }) {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
}

function App() {
  const good = () => store.dispatch({ type: 'GOOD' });
  const ok = () => store.dispatch({ type: 'OK' });
  const bad = () => store.dispatch({ type: 'BAD' });
  const zero = () => store.dispatch({ type: 'ZERO' });

  return (
    <div>
      <h1>give feedback</h1>

      <div>
        <button type="button" onClick={good}>good</button>
        <button type="button" onClick={ok}>ok</button>
        <button type="button" onClick={bad}>bad</button>
        <button type="button" onClick={zero}>reset stats</button>
      </div>

      <Statistics />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
