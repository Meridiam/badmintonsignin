import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
    render() {
        return (
            <nav class="navbar navbar-expand-lg sticky-top">
                <Link to="/" class="navbar-brand">Sign In</Link>
                {/*<Link to="openplay" class="nav-link">Open Play</Link>*/}
                <Link to="statistics" class="nav-link">Statistics</Link>
            </nav> 
        );
    }
}