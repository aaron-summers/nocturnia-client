import React from 'react';

//bootstrap
import {Spinner} from 'react-bootstrap';

export default class Loading extends React.Component{
    render() {
        return (
          <div className="loader-wrapper">
            <Spinner animation="grow" variant="danger" />
            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="warning" />
          </div>
        );
    }
}