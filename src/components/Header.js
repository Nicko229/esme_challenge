import React from "react";
import { getSearchInput } from "../actions/postActions";
import { connect } from "react-redux";
import "./Header.css";


const Header = (props) => {

  const onChange = (e) => {
    e.preventDefault();
    props.getSearchInput(e)
  }

  return(
    <header className="header container-div">
      <h1 id="header-text" className="page-title">Gnomify</h1>
      <div>
        <label className="search-label">Search</label>
        <input onChange= {onChange} type="text" />
      </div>
    </header>
  )
}

export default connect(null, { getSearchInput })( Header );