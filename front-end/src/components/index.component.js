import React, { Component } from 'react';
import axios from 'axios';
import TextEditor from './TextEditor';
import MarkdownList from './MarkdownList';
import { NotificationManager } from 'react-notifications';

export default class Index extends Component {

  constructor(props) {
    super(props);
    this.state = { markdowns: [{}] };
  }

  componentDidMount() {
    this.loadMarkdowns();
  }

  loadMarkdowns() {
    axios.get('http://localhost:8082/markdown')
      .then(response => {
        this.setState({ markdowns: response.data });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  handleChange = event => {
    this.setState({
      inputValue: event.target.value
    });
  };

  handleDelete() {
    let view = this;
    let markdownId = this.props.match.params.id ? this.props.match.params.id : this.state.markdowns.length > 0 ? this.state.markdowns[0]._id : null;
    axios.delete('http://localhost:8082/markdown/' + markdownId)
      .then(
        function (res) {
          console.log(res);
          view.loadMarkdowns();
          NotificationManager.info('Markdown deleted');
          view.props.history.push('/');
        }
      )
      .catch(err => console.log(err))
  }

  render() {
    let markdownId = this.props.match.params.id ? this.props.match.params.id : this.state.markdowns.length > 0 ? this.state.markdowns[0]._id : null;
    return (
      <React.Fragment>
        <div className="container-fluid" style={{ marginTop: 10 }}>
          <div className="row" >
            <div className="col-sm-2" >
              <div className="list-group-flush h-100 d-inline-block border rounded" onChange={this.handleChange}>
                {this.state.markdowns.map((markdown, index) => (
                  <MarkdownList markdown={markdown} key={index} />
                ))}
              </div>
            </div>
            <div className="col-sm-10" >
              <TextEditor markdownId={markdownId} handleDelete={this.handleDelete.bind(this)} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
