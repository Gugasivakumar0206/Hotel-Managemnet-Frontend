import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search'; // Ensure Search is imported

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/search" component={Search} /> {/* Ensure /search path is mapped */}
        {/* Add other routes */}
      </Switch>
    </Router>
  );
}

export default App;
