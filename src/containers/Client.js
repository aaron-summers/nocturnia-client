import React from 'react';
import {} from 'react-bootstrap';
import {Route, Redirect} from 'react-router-dom';

//api
import adapter from '../api/adapter';

//components
import Forms from './Forms';
import Home from './Home';

//css
import '../client.css'
import Loading from '../components/Loading';

export default class Index extends React.Component {
  state = {
    actor: null,
    isAuthenticated: false,
    error: null,
    loading: true
  }

  signup = async (user) => {
    const data = await adapter.signup(user)
    if (!data.error) {
      await adapter.validate(data.token);
    } else {
      this.setState({error: data.error})
    }
  }

  login = async (user) => {
  const data = await adapter.login(user);
    if (!data.error) {
      const actor = await adapter.validate(data)
      if (!actor._id) return this.setState({isAuthenticated: false})
      
      this.setState({actor: actor, isAuthenticated: true })

     } else {
      console.clear();
      this.setState({error: data.error})
    }
}

  async componentDidMount() {
    if (localStorage.token) {
      const token = await localStorage.getItem("token");
      const data = await adapter.validate(token);
      if (data._id) {
        this.setState({loading: false, actor: data, isAuthenticated: true})
      } else {
        // console.log(data.error)
        this.setState({error: data.error, loading: false, actor: null, isAuthenticated: false})
      }
    }
  }

    render() {
        return (
          <div className="container">
          {
            !localStorage.token ? <Redirect to="/welcome" />
            : !this.state.isAuthenticated ? <Redirect to="/fetching" />
            : <Redirect to="home" />
          }
          {
          } 
          <React.Fragment>
            <Route path="/fetching" component={Loading} />
            <Route path="/welcome" component={(props) => <Forms user={this.state.actor} signup={this.signup} login={this.login}/>}/>
            <Route path="/home" component={Home} />
          </React.Fragment>
          </div>
        );
    }
}