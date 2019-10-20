import React from 'react';

//bootstrap
import {Navbar} from 'react-bootstrap';

export default class Navigation extends React.Component{
    render() {
        return(
            <Navbar expand="lg" sticky="top">
                <Navbar.Brand>Nocturnia</Navbar.Brand>
            </Navbar>
        )
    }
}