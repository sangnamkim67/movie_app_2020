import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
class Navigation extends Component {
    render() {
        return (
            <div className="nav">
                <Link to="/">HOME</Link>
                <Link to="/search">Search</Link>
                <Link to="/about">About</Link>
            </div>
        );
    }
}

export default Navigation;
