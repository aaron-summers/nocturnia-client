import React from 'react';
import { Nav } from 'react-bootstrap';
import {Route, Redirect} from 'react-router-dom';

//api
import adapter from '../api/auth/adapter';

//components
import Forms from './Forms';
import Home from './Home';
import Loading from "../components/Loading";

//css
import '../client.css'
import Navigation from '../components/layout/Navbar';

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
  const response = await adapter.login(user);
    if (response.error) {
      this.setState({ error: response.error });
    }

}

  async componentDidMount() {
    if (localStorage.x_tn && localStorage.a_id) {
      const token = await localStorage.getItem("x_tn");
      const data = await adapter.validate(token);
      if (data._id) {
        console.log(data)
        this.setState({loading: false, actor: {a_id: data._id, x_dn: data.displayName}, isAuthenticated: true})
      } else {
        console.log(data.error)
        this.setState({error: data.error, loading: false, actor: null, isAuthenticated: false})
      }
    }
  }

    render() {
        return (
          <div className="container">
          {
            !localStorage.x_tn ? <Redirect to="/welcome" />
            : !this.state.isAuthenticated ? <Redirect to="/fetching" />
            : <Redirect to="home" />
          }
          {
          } 
          <React.Fragment>
            {/* <Navigation /> */}
              <Route path="/welcome" component={(props) => <Forms user={this.state.actor} signup={this.signup} login={this.login}/>}/>
            {/* <div> */}
              <Route path="/home" component={Home} />
            {/* </div> */}
            {/* <div className="loader-container"> */}
              <Route path="/fetching" component={Loading} />
            {/* </div> */}
          </React.Fragment>
          </div>
        );
    }
}