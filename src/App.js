import React from 'react';
import './App.css';
import LineChart from './LineChart';

function App() {
  const data = [
    ['14/04/20', '10815'],
    ['15/04/20', '13933'],
    ['16/04/20', '12759'],
    ['17/04/20', '13835'],
    ['18/04/20', '14792'],
    ['19/04/20', '16116'],
    ['20/04/20', '17656'],
    ['21/04/20', '18985'],
    ['22/04/20', '20471'],
    ['23/04/20', '21700'],
    ['24/04/20', '23077'],
  ];
  return (
    <div className='App'>
      <LineChart data={data} />
    </div>
  );
}

export default App;
