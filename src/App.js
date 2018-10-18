import React, { Component } from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';
import './App.css';
import Trails from './Components/Trails';
import Login from './Components/Login';

class App extends Component {
  render() {
    
    return (
      <HashRouter>
        <Switch>
          <Route path='/' component={Login} exact/>
          <Route path='/trails' component={Trails} />
        </Switch>
      </HashRouter>
    );
  }
}
export default App;
