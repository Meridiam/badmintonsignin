import React from 'react';
import socketIOClient from 'socket.io-client';
import {Line} from 'react-chartjs-2';

export default class Statistics extends React.Component {
    constructor() {
        super();
        this.state = {endpoint: 'https://umdbmtnsignins.herokuapp.com', chartData: {}};
        fetch('https://umdbmtnsignins.herokuapp.com/getstats')
        .then(response => response.json())
        .then(res => {
            res["practices"].sort((a, b) => {
                if (a["date"] < b["date"])
                    return -1;
                if (a["date"] > b["date"])
                    return 1;
                return 0;
            });
            let chartData = res["practices"].map(v => v["registered"].length);
            let chartLabels = res["practices"].map(v => v["date"]);
            var data = {
                labels: chartLabels,
                datasets: [
                    {
                        label: "Attendance",
                        lineTension: 0.5,
                        backgroundColor: 'rgba(255,81,0,0.4)',
                        borderColor: 'rgba(0,174,255,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(0,174,255,0.7)',
                        pointBackgroundColor: 'rgba(255,81,0,1)',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(255,81,0,1)',
                        pointHoverBorderColor: 'rgba(0,174,255,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: chartData
                    }
                ]
            }
            this.setState({endpoint: 'https://umdbmtnsignins.herokuapp.com', chartData: data});}
        );
    }

    render() {
        return (
            <div class="container" id="list">
                <div class="row justify-content-center">
                    <h1>Attendance</h1>
                    <Line data={this.state.chartData}/>
                </div>
            </div>
        );
    }
}
