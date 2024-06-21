// import logo from './logo.svg';

import './App.css';
import './index.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import FeedFish from './components/FeedFish';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/feed" element={<PrivateRoute><FeedFish /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
