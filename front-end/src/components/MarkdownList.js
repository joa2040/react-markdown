import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FaFileAlt } from 'react-icons/fa';
import ReactTimeAgo from 'react-time-ago'

class MarkdownList extends Component {

    constructor(props) {
        super(props);
        this.state = { markdown: this.props.markdown }; 
    }

    render() {
        let date = this.props.markdown.updated ? new Date(this.props.markdown.updated) : new Date();
        return (
            <React.Fragment>
                <NavLink to={"/view/" + this.props.markdown._id} className="list-group-item list-group-item-action">
                    <div className="row">
                        <div className="col-2">
                            <FaFileAlt size="2em" />
                        </div>
                        <div className="col-10">
                            <div className="row no-gutters">
                                <small><strong>{this.props.markdown.title}</strong></small>
                            </div>
                            <div className="row no-gutters">
                                <small><small><ReactTimeAgo date={date} /></small></small>
                            </div>
                        </div>
                    </div>
                </NavLink>
            </React.Fragment>
        );
    }
}

export default MarkdownList;