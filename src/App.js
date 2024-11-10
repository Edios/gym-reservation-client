import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/Auth/Login';
import CalendarView from './components/Calendar/CalendarView';
import {isAuthenticated} from './services/authService';

const App = ()=>(
  <Router>
    <Routes>
      <Route path="/" element={<Login/>}/>
      {isAuthenticated() && <Route path="/calendar" element={<CalendarView/>}/>}
    </Routes>
  </Router>
);

export default App;
