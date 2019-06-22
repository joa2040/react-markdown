import React, { Component } from 'react';
import { Converter } from 'react-showdown';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';

class TextEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      markdownId: this.props.markdownId,
      markdown: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    this.getMarkdown(this.props.markdownId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.markdownId !== prevProps.markdownId) {
      this.getMarkdown(this.props.markdownId);
    }
  }

  getMarkdown(markdownId) {
    let view = this;
    axios.get('http://localhost:8082/markdown/' + markdownId)
      .then(response => {
        view.setState({ markdown: response.data });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  handleDelete() {
    this.props.handleDelete();
  }

  handleUpdate(e) {
    let view = this;
    e.preventDefault();
    axios.put('http://localhost:8082/markdown/' + view.props.markdownId, view.state.markdown)
      .then(
        function (res) {
          console.log(res);
          NotificationManager.info('Markdown udpated');
        }
      );
  }

  handleChange(event) {
    this.setState({
      markdown: { text: event.target.value }
    });
  }

  renderButtons() {
    if (this.props.markdownId) {
      return <React.Fragment><div className="col-sm-1">
        <button onClick={this.handleUpdate} className="btn btn-primary">Save</button>
      </div>
        <div className="col-sm-1">
          <button onClick={this.handleDelete} className="btn btn-danger">Delete</button>
        </div>
      </React.Fragment>
    }
  }

  render() {
    var converter = new Converter();
    return (
      <React.Fragment>
        <div className="row" >
          <div className="col-sm-5" style={{ maxHeight: 500 }}>
            <textarea className="form-control" rows="20" value={this.state.markdown.text} onChange={this.handleChange} />
          </div>
          <div className="col-sm-5 border border-primary rounded overflow-auto" style={{ maxHeight: 500 }}>
            {converter.convert(this.state.markdown.text)}
          </div>
        </div>
        <br />
        <div className="row" >
          {this.renderButtons()}
        </div>
      </React.Fragment >
    );
  }
}

export default TextEditor;