import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Roster from './components/Roster';
import Header from './components/Header';
import Footer from './components/Footer';
import OpenPlay from './components/OpenPlay';
import Statistics from './components/Statistics';

const app = document.getElementById('app');

ReactDOM.render(
    <Router>
        <div class="body">
            <Header />
            <Route exact path="/" component={Roster}/>
            <Route path="/openplay" component={OpenPlay}/>
            <Route path="/statistics" component={Statistics}/>
            <Footer />
        </div>
    </Router>,
app);