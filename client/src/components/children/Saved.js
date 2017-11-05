import React, {Component} from "react";
import {Link} from "react-router-dom";
import API from "../../utils/helpers";
import moment from "moment";

class Saved extends Component {

  state = {
    articles: [],
    title: "",
    term: ""
  }

  componentDidMount() {
    this.loadSaved();
  }

  loadSaved = () => {
    API
      .getSavedArticles()
      .then(res => {
        console.log(res.data);
        this.setState({articles: res.data, title: ""})
      })
      .catch(err => console.log(err));
  }

  deleteSaved = data => {
    let articleId = data.id
    API
      .deleteArticle(articleId)
      .then(res => this.loadSaved())
      .catch(err => console.log(err));
  }

  render() {

    return (
      <section id="saved-articles">
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
                      Saved Articles</strong>
                  </h3>
                </div>

                <div className="panel-body" id="well-section"></div>
                <div className="list-overflow-container">
                  <ul className="list-group">
                    {this
                      .state
                      .articles
                      .map(article => (
                        <li className="list-group-item" key={article._id}>
                          <a href={article.url}>{article.title}</a>
                          <button
                            className="btn btn-danger"
                            data-id={article._id}
                            style={{
                            float: "right"
                          }}
                            onClick={() => this.deleteSaved({id: article._id})}>Delete</button>
                          <p>Date Saved: {moment
                              .utc(article.date)
                              .format('MMMM Qo YYYY hh:MM A')}
                            <em>(UTC)</em>
                          </p>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
export default Saved;