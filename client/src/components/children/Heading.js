import React from "react";
import {Link} from "react-router-dom";

const Heading = () => <div id="heading">
  <div className="intro-text">
    <h1>NY Times React</h1>
    <p>Search articles and save your favorites!</p>
    <div className="btnRow">
      <Link to="/search">
        <button className="btn btn-primary">
          Search Articles</button>
      </Link>
      <Link to="/saved">
        <button className="btn btn-primary">
          Saved Articles</button>
      </Link>
    </div>
  </div>
</div>

export default Heading;