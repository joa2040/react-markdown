import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      text: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8082/markdown/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          text: response.data.text
        });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  onChangeText(e) {
    this.setState({
      text: e.target.value
    });
  }

  onSubmit(e) {
    let view = this;
    e.preventDefault();
    const obj = {
      text: view.state.text
    };
    axios.put('http://localhost:8082/markdown/' + view.props.match.params.id, obj)
      .then(
        function (res) {
          console.log(res);
          view.props.history.push('/index');
        }
      );
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3 align="center">Update Markdown</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Text:  </label>
            <input
              type="text"
              className="form-control"
              value={this.state.text}
              onChange={this.onChangeText}
            />
          </div>
          <div className="form-group">
            <input type="submit"
              value="Update"
              className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}