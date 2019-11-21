import React, {
  useEffect, 
  Suspense
} from 'react';
import { connect } from "react-redux";
import { 
  fetchPosts,
  getCurrentPage
 } from "./actions/postActions";
 import Pagination from "./components/Pagination";
 import Header from "./components/Header";
 import List from "./components/List";
 import filteredGnomes from "./utils/filteredGnomes";
import './App.css';

const App = (props) => {

  useEffect(() => {
    props.fetchPosts();
  }, []);

  const paginate = (pageNumber) => props.getCurrentPage(pageNumber)

  return (
    <div className='App' >
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
      <div className="container-div"> 
        <List  />
        <Pagination postsPerPage={100} totalPosts={filteredGnomes(props).length} paginate={paginate} />
      </div>
      </Suspense>
    </div>
  );
};

let mapStateToProps = (state) => ({
  posts: state.posts.items,
  currentPage: state.posts.currentPage,
  searchInput: state.posts.searchInput,
})

export default connect(mapStateToProps, { fetchPosts, getCurrentPage })(App);