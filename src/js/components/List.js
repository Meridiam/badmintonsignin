import React from 'react';
import Member from './Member'

export default class List extends React.Component {
    constructor() {
        super();
        this.state = {search: '', loading: "true"};
    }

    searchHandler(event) {
        this.setState({search: event.target.value.toLowerCase()});
    }

    render() {
        var refresh = this.props.refresh;
        var registered = this.props.registered;
        var counter = 0;
        let filtered = this.props.members
        filtered = filtered.map(member => {
            return(member.split(" ").map(v => v.charAt(0).toUpperCase() + v.substring(1)).join(" "));
        });
        filtered = filtered.map(member => {
            return(member.split("-").map(v => v.charAt(0).toUpperCase() + v.substring(1)).join("-"));
        });
        filtered = filtered.filter(e => e.toLowerCase().indexOf(this.state.search) !== -1).sort();
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
                <div class="row justify-content-center">
                    <div class="col-8 align-self-center">
                        <input type="text" class="form-control" placeholder="Search" onChange={this.searchHandler.bind(this)}/>
                    </div>
                </div>
                <div class={this.props.loaderContainer}>
                    <div class={this.props.loader}></div>
                </div>
                <div class="row justify-content-center" id="memberlist">
                    <div class="col-8 align-self-center">
                        <ul class="list-group">
                            {filtered.map(function(member) {
                                counter += 1;
                                return(
                                    <Member name={member} registered={registered} refresh={refresh} key={member+counter} />
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

List.defaultProps = {
    loader: '',
    loaderContainer: ''
};
