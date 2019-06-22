import React, { Component } from 'react';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: '',
      text: ''
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onSubmit(e) {
    let view = this;
    e.preventDefault();
    const obj = {
      title: this.state.title,
      text: this.state.text
    };
    axios.post('http://localhost:8082/markdown', obj)
      .then(
        function (res) {
          console.log(res);
          NotificationManager.info('Markdown saved');
          view.props.history.push('/index');
        }
      );
  }

  render() {
    return (
      <div className="container-fluid" style={{ marginTop: 10 }}>
        <div className="row-fluid col-md-6">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Title:  </label>
              <input name="title"
                type="text"
                className="form-control"
                value={this.state.title}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Markdown:  </label>
              <textarea name="text"
                rows="10"
                className="form-control"
                value={this.state.text}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <input type="submit"
                value="Save"
                className="btn btn-primary" />
            </div>
          </form>
        </div>
      </div>
    )
  }
}