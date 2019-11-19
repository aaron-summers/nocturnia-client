import React from 'react';
import TokenError from './error/token';
import {Route} from 'react-router-dom'

export default class Tag extends React.Component {


    render() {
        return (
          <div>
              <h1>Individual tag</h1>
            {/* <Route path={`${this.props.match.url}/t/${this.props.tag}`} render={(props) => <TokenError {...props}/>}/> */}
          </div>
        );
    }
}