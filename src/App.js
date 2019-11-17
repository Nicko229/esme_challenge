import React, {
  useEffect, 
  Suspense
} from 'react';
import Pagination from "./components/Pagination";
import { connect } from "react-redux";
import { 
  fetchPosts,
  getCurrentPage
 } from "./actions/postActions";
 import Header from "./components/Header";
 import List from "./components/List";
import './App.css';

const App = (props) => {

  useEffect(() => {
    props.fetchPosts();
  }, []);

  const filteredGnomes = props.posts.filter(
    (gnome) => {
      return gnome.name.toLowerCase().indexOf(props.searchInput.toLowerCase()) !== -1;
    }
  )

  const paginate = (pageNumber) => props.getCurrentPage(pageNumber)

  return (
    <div className='App' >
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
      <div className="container"> 
        <List filteredGnomes={filteredGnomes} />
        <Pagination postsPerPage={100} totalPosts={filteredGnomes.length} paginate={paginate} />
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