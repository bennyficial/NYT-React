import React, {Component} from "react";
import {Link} from "react-router-dom";
import API from "../../utils/helpers";
import moment from "moment";

class Search extends Component {

  state = {
    articles: [],
    historyList: [],
    title: "",
    term: "",
    startYear: "",
    endYear: "",
    noSearch: false
  }

  componentDidMount() {
    this.state.noSearch = false;
    this.loadHistory();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    let startYear = parseInt(this.state.startYear);
    let endYear = parseInt(this.state.endYear);
    let term = this.state.term;
    console.log(startYear, endYear);

    if (!this.state.startYear && !this.state.endYear) {
      this.saveHistory(this.state.term, 1900, 2017);
      this.loadArticles(this.state.term, 1900, 2017);
    } else if (!this.stateYear) {
      this.saveHistory(this.state.term, 1900, this.state.endYear)
      this.loadArticles(this.state.term, 1900, this.state.endYear);
    } else if (!this.endYear) {
      this.saveHistory(this.state.term, this.state.startYear, 2017)
      this.loadArticles(this.state.term, this.state.startYear, 2017);
    } else if (term.length <= 2 || isNaN(startYear) || isNaN(endYear)) {
      alert("Search Parameters Incorrect")
    } else {
      this.saveHistory(this.state.term, this.state.startYear, this.state.endYear);
      this.loadArticles(this.state.term, this.state.startYear, this.state.endYear);
    }
    this.setState({term: "", startYear: "", endYear: ""})
  }
  clearForm = event => {
    event.preventDefault();
    this.refs.startYear.value = "";
    this.refs.endYear.value = "";
    this.refs.term.value = "";
    this.setState({noSearch: false})
  }

  handleInputChange = event => {
    const {name, value} = event.target;
    this.setState({[name]: value})
  };

  saveHistory = (search, startYear, endYear) => {
    API
      .saveHistory({title: search, startYear: startYear, endYear: endYear})
      .then(res => {
        if (res.data.response.docs.length === 0) {
          // TODO replace with modal <--
          alert("No Results Found");
        } else {
          this.setState({historyList: res.data.response.docs})
        }
      })
      .catch(err => console.log(err));
  }

  loadHistory = () => {
    API
      .getHistory()
      .then(res => {
        console.log(res.data);
        this.setState({historyList: res.data})
      })
      .catch(err => console.log(err));
  }

  loadArticles = (search, startYear, endYear) => {
    this.loadHistory();
    this.state.noSearch = true;
    API
      .runQuery(search, startYear, endYear)
      .then(res => {
        if (res.data.response.docs.length === 0) {
          // TODO replace with modal <--
          alert("No Results Found");
        } else {
          this.setState({articles: res.data.response.docs, title: ""})
        }
      })
      .catch(err => console.log(err));
  }

  saveArticle = (article) => {
    API
      .saveArticle({title: article.title, url: article.url})
      .catch(err => console.log(err));
  }

  render() {

    return (
      <section id="searc-results">
        <div className="container">
          <div id = "j1" className="jumbotron">
            <h1 className="text-center jumbo-text">
              <strong>
                NY Times React</strong>
            </h1>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <br/>
              <div className="panel panel-primary">
                <div className="panel-heading">
                  <h3 className="panel-title">
                    <strong>
                      Search Parameters</strong>
                  </h3>
                </div>
                <div className="panel-body">

                  <form role="form">

                    <div className="form-group">
                      <label>Search Term:</label>
                      <input
                        value={this.state.term}
                        onChange={this.handleInputChange}
                        name="term"
                        placeholder="Example: Technology"
                        type="text"
                        className="form-control"
                        id="search-term"
                        ref="term"
                        required/>
                        
                    </div>

                    <div className="form-group">
                      <label>Start Year (Optional):</label>
                      <input
                        value={this.state.startYear}
                        onChange={this.handleInputChange}
                        name="startYear"
                        placeholder="Example: 2000"
                        type="text"
                        className="form-control"
                        id="start-year"
                        ref="startYear"/>
                    </div>

                    <div className="form-group">
                      <label>End Year (Optional):</label>
                      <input
                        value={this.state.endYear}
                        onChange={this.handleInputChange}
                        name="endYear"
                        placeholder="Example: 2017"
                        type="text"
                        className="form-control"
                        id="end-year"
                        ref="endYear"/>
                    </div>

                    <button
                      onClick={this.handleFormSubmit}
                      type="submit"
                      className="btn btn-primary"
                      disabled={!this.state.term}
                      id="run-search">
                      Search</button>
                    <button
                      onClick={this.clearForm}
                      type="button"
                      className="btn btn-danger"
                      id="clear-all">
                      Clear</button>

                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <br/>

              <div className="panel panel-primary">

                <div className="panel-heading">
                  <h3 className="panel-title">
                    <strong>
                      Results</strong>
                  </h3>
                </div>
                <hr/>

                <div className="panel-body" id="well-section"></div>
                <div className="list-overflow-container">
                  <ul className="list-group">
                    {!this.state.noSearch
                      ? <p className="no-results">
                          <em>No Search Results</em>
                        </p>
                      : this
                        .state
                        .articles
                        .map(article => (
                          <li className="list-group-item" key={article._id}>
                            <a target="_blank" href={article.web_url}>{article.headline.main}</a>
                            <button
                              data-id={article}
                              style={{
                              float: "right"
                            }}
                              className="btn btn-primary"
                              onClick={() => this.saveArticle({title: article.headline.main, url: article.web_url})}>Save</button>
                            <p>Published Date: {moment
                                .utc(article.pub_date)
                                .format('MMMM Qo YYYY hh:MM A')}</p>
                          </li>
                        ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="row">
            <div className="col-sm-12">
              <br/>

              <div className="panel panel-primary">

                <div className="panel-heading">
                  <h3 className="panel-title">
                    <strong>
                      Search History</strong>
                  </h3>
                </div>
                <hr/>

                <div className="panel-body" id="well-section"></div>
                <div className="list-overflow-container">
                  <ul className="list-group">
                    {this
                      .state
                      .historyList
                      .map(history => (
                        <li className="list-group-item" key={history._id}>
                          <h5>{history.title}</h5>
                          <p>Start Year: {history.startYear}
                            &nbsp;| End Year: {history.endYear}
                            <button
                              data-title={history.title}
                              data-start={history.startYear}
                              data-end={history.endYear}
                              style={{
                              float: "right"
                            }}
                              className="btn btn-info"
                              onClick={() => this.loadArticles(history.title, history.startYear, history.endYear)}>Search Again</button>
                          </p>
                          <p>Date Searched: {moment
                              .utc(history.date)
                              .format('MMMM Qo YYYY hh:MM A')}</p>

                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div> */}

        </div>
      </section>
    );
  }
}
export default Search;