import React from 'react';
import socketIOClient from 'socket.io-client';

import Header from './Header';
import Footer from './Footer';
import List from './List';

export default class Layout extends React.Component {
    constructor() {
        super();
        this.state = {members: [], registered: [], endpoint: "https://umdbmtnsignins.herokuapp.com"};
        var currDate = new Date();
        fetch('http://umdbmtnsignins.herokuapp.com/getdata', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    date: (currDate.getMonth()+1)+"/"+currDate.getDate()+"/"+currDate.getFullYear()
                })
            })
            .then(response => response.json())
            .then(data => this.setState({ members: data["roster"], registered: data["registered"], endpoint: "https://umdbmtnsignins.herokuapp.com"}));
    }

    componentDidMount() {
        this.socket = socketIOClient(this.state.endpoint);
        this.socket.on('refresh', (n) => {
            var currDate = new Date();
            fetch('http://umdbmtnsignins.herokuapp.com/signin', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: n,
                    date: (currDate.getMonth()+1)+"/"+currDate.getDate()+"/"+currDate.getFullYear()
                })
            })
            .then(response => response.json())
            .then(data => {this.setState({members: this.state.members, registered: data["registered"], endpoint: "https://umdbmtnsignins.herokuapp.com"});});
        });

        this.socket.on('revert', (n) => {
            var currDate = new Date();
            fetch('http://umdbmtnsignins.herokuapp.com/signout', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: n,
                    date: (currDate.getMonth()+1)+"/"+currDate.getDate()+"/"+currDate.getFullYear()
                })
            })
            .then(response => response.json())
            .then(data => {this.setState({members: this.state.members, registered: data["registered"], endpoint: "https://umdbmtnsignins.herokuapp.com"});});
        });
    }

    componentWillUnmount() {
        this.socket.close();
    }

    render() {
        return (
            <div class="body">
                <Header />
                <List members={this.state.members} registered={this.state.registered}/>
                <Footer />
            </div>
        );
    }
}