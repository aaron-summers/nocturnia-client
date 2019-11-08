import React from 'react';

//css
// import {InputGroup} from 'react-bootstrap';

export default class Search extends React.Component {
    render() {
        return (
          <input className="searchbar" type="search" placeholder="Search:">
          </input>
        );
    }
}