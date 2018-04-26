import React from 'react';
import socketIOClient from 'socket.io-client';

export default class Statistics extends React.Component {
    render() {
        return (
            <div class="container" id="list">
                <div class="row justify-content-center">
                    <div class="col-8 align-self-center">
                        <img
                            width="50%"
                            height="50%"
                            class="center-block"
                            src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Maryland_Terrapins_logo.svg"
                        />
                    </div>
                </div>
            </div>
        );
    }
}
