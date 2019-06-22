import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import Create from './components/create.component';
import Index from './components/index.component';

class App extends Component {
  render() {
    return (
      <Router >
        <React.Fragment>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/index'} className="navbar-brand">Markdown</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={'/create'} className="nav-link">Create</Link>
                </li>
              </ul>
            </div>
          </nav>
          <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path='/create' component={Create} />
            <Route path='/index' component={Index} />
            <Route path='/view/:id' component={Index} />
          </Switch>
          <NotificationContainer />
        </React.Fragment>
      </Router>
    );
  }
}

export default withRouter(App);
