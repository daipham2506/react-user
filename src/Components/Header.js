import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (

            <div className="jumbotron jumbotron-fluid">
              <div className="container text-center">
                <h3 className="display-5">Management Users with React JS</h3>
                <p className="lead">Database type Json</p>
                <hr className="my-2" />
              </div>
            </div>
        );
    }
}

export default Header;