import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import NavBar from "./components/NavBar";
import ScrollTop from './components/ScrollTop';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <ScrollTop />
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/explore" component={Explore} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
