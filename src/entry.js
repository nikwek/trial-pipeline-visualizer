import React from 'react';
import ReactDOM from 'react-dom';
import TrialsLayout from './trials-layout';
import './app.css';

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <TrialsLayout statsUrl={STATS_URL} pollSeconds={10} />,
    document.getElementById('trials-layout')
  );
});
