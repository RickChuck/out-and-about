import React, { Component } from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';
import './App.css';
import Trails from './Components/Trails/Trails';
import Login from './Components/Login/Login';
import User from './Components/User/User';

class App extends Component {
  render() {
    
    return (
      <HashRouter>
        <Switch>
          <Route path='/' component={Login} exact/>
          <Route path='/trails' component={Trails} />
          <Route path='/user' component={User} />
        </Switch>
      </HashRouter>
    );
  }
}
export default App;
