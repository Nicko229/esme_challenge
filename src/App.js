import React, {
  useEffect, 
  Suspense 
} from 'react';
import Pagination from "./components/Pagination";
import Img from 'react-image';
import VisibilitySensor from 'react-visibility-sensor';
import { connect } from "react-redux";
import { 
  fetchPosts,
  getCurrentPage,
  getSearchInput
 } from "./actions/postActions";
import './App.css';

const App = (props) => {

  useEffect(() => {
    props.fetchPosts();
  }, []);

  let onChange = (e) => {
    e.preventDefault();
    props.getSearchInput(e)
  }

  let filteredGnomes = props.posts.filter(
    (gnome) => {
      return gnome.name.toLowerCase().indexOf(props.searchInput.toLowerCase()) !== -1;
    }
  )
 
  let arrayString = (arr) => {
    return arr.toString().split(/[,]+/).join(', ')
  }

  let details = (itemType, item) => {
    if(item.length > 1) {
      return <p className="gnome__subtitle" itemProp="description"><strong>{itemType}:</strong> {arrayString(item)}</p>
    } else {
      return <p></p>
    }
  }

  const indexOfLastPost = props.currentPage * 100;
  const indexOfFirstPost = indexOfLastPost - 100;
  const currentPosts = filteredGnomes.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => props.getCurrentPage(pageNumber)

  return (

    <div className='App' >
      <header className="header container">
        <h1 id="header-text" className="page-title">Gnomify</h1>
        <div>
          <label className="search-label">Search</label>
          <input onChange= {onChange} type="text" />
        </div>
      </header>

      <Suspense fallback={<div>Loading...</div>}>
      <div className="container"> 
        <ul className="gnome-list" >
          {currentPosts.map(post => (
          <VisibilitySensor>
            <li key={post.name} className="gnome-list__item">
              <figure className="gnome__image-wrapper">
                <Img className="gnome__image" src={post.thumbnail} alt="Gnome" itemProp="image"/>              
              </figure>
              <div className="personal__details">
                <h1 className="name" ><strong>{post.name}</strong></h1>
                <p className="gnome__subtitle" itemProp="description"><strong>Height:</strong> {Math.floor(post.height)}cm</p>
                <p className="gnome__subtitle" itemProp="description"><strong>Weight:</strong> {Math.floor(post.weight)}kg</p>
                <p className="gnome__subtitle" itemProp="description"><strong>Age:</strong> {Math.floor(post.age)}</p>
                {details("Friends", post.friends)}
                {details("Professions", post.professions)}
              </div>
            </li>
          </VisibilitySensor>
          ))}
        </ul>
        <Pagination postsPerPage={100} totalPosts={filteredGnomes.length} paginate={paginate} />
      </div>
      </Suspense>
    </div>
  );
};

let mapStateToProps = (state) => ({
  posts: state.posts.items,
  currentPage: state.posts.currentPage,
  searchInput: state.posts.searchInput
})

export default connect(mapStateToProps, { fetchPosts, getCurrentPage, getSearchInput })(App);