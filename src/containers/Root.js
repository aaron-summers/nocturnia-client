import React from 'react';

import {Switch, Route, withRouter, Redirect} from 'react-router-dom';

import Home from './Home';
import Explore from '../components/Explore';
import TokenError from '../components/error/token';
import Tag from '../components/Tag';
import Search from '../components/Search';
import Profile from '../components/Profile';


class Root extends React.Component {

    componentDidMount() {
        if (!localStorage.x_tn) {
            this.props.history.push("/")
        };
    }

    render() {
        return (
          <div>
            <div className="home-header">
              <div className="headerbar">
                {!this.props.error ? <Search/> : null}
              </div>
            </div>
            {this.props.location.pathname == "/" ? (
              <Redirect to="/" />
            ) : this.props.location.pathname == "/explore" ? (
              <Redirect to="/explore" />
            ) : (
              <></>
            )}

          {!this.props.error 
          ? <Switch>
              <Route exact path="/" render={() => <Home />} />
              <Route path="/explore" component={Explore} />
              <Route path="/:username" component={Profile} />   
              <Route path="*" component={TokenError} />
            </Switch>
            : null
            }
          </div>
        );
    }
} 

export default withRouter(Root)