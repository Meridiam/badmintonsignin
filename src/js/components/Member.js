import React from 'react';
import socketIOClient from 'socket.io-client';

export default class Member extends React.Component {
    constructor() {
        super();
        this.state = {class: "list-group-item list-group-item-action", endpoint: "http://umdbmtnsignins.herokuapp.com"};
    }

    send() {
        let socket = socketIOClient("http://umdbmtnsignins.herokuapp.com");
        socket.emit('refresh', this.props.name, (data) => {
            socket.removeAllListeners();
            socket.disconnect();
        });
    }

    sendRevert() {
        let socket = socketIOClient("http://umdbmtnsignins.herokuapp.com");
        socket.emit('revert', this.props.name, (data) => {
            socket.removeAllListeners();
            socket.disconnect();
        });
    }

    signIn() {
        if(this.state.class.indexOf("list-group-item-success") > -1) {
            /*send global revert highlighting signal*/
            this.sendRevert();
        } else {
            /*send global refresh signal*/
            this.send(); 
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.registered.includes(nextProps.name)) {
            return {class: "list-group-item list-group-item-action list-group-item-success", endpoint: "http://umdbmtnsignins.herokuapp.com"};
        } else {
           return {class: "list-group-item list-group-item-action", endpoint: "http://umdbmtnsignins.herokuapp.com"};
        }
    }

    render() {
        return (
            <button class={this.state.class} onClick={this.signIn.bind(this)}>
                {this.props.name}
            </button>
        );
    }
}