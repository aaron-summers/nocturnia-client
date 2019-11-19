import React from 'react';
import {Button} from 'react-bootstrap';

//routing
import {Link} from 'react-router-dom';

//components
import Signup from '../components/auth/Signup';
import Login from '../components/auth/Login';

export default class Forms extends React.Component {
    state = {
        displayLogin: true
    }

    handleClick = () => {
        this.setState({displayLogin: !this.state.displayLogin})
        this.props.handleFormToggle()
    }

    componentDidMount() {
        this.props.history.push("/")
    }

  render() {
    const { signup, login } = this.props;
    return (
        <div className="form-container">
        <React.Fragment>
        { this.state.displayLogin ?
             <div className="login-form">
                {this.props.error ? <span style={{color: "red"}}>{this.props.error.message}</span> : <></>}
                <Login submit={login}/>
                <div className="signup-text">Don't have an account yet? <span className="signup-link" onClick={this.handleClick} style={{margin: 0, paddingLeft: 0, paddingTop: 0, cursor: 'pointer'}}>
                        Sign Up Now!
                        </span >
                    </div>
                </div>
            :
            <div>
                <div className="signup-form">
                    {this.props.error ? <span style={{color: "red"}}>{this.props.error.message}</span> : <></>}
                    <Signup submit={signup} header={"Sign up"} />
                    <div className="login-text">Already have an account? <span className="login-link" onClick={this.handleClick} style={{margin: 0, paddingLeft: 0, paddingTop: 0, cursor: 'pointer'}}>Sign In</span ></div>
                </div>
            </div>
        }
        </React.Fragment>
        </div>
    );
  }
}