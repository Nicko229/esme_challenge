import React, {
  useState, 
  useEffect, 
  Suspense 
} from 'react';
import Pagination from "./components/Pagination";
import axios from 'axios';
import Img from 'react-image';
import VisibilitySensor from 'react-visibility-sensor';
import { connect } from "react-redux";
import { fetchPosts } from "./actions/postActions";
import './App.css';

const App = (props) => {
  // const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(100);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    props.fetchPosts();
    // const fetchPosts = async () => {
    //   const res = await axios.get('https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json');
    //   const firstPosts = res.data.Brastlewark
    //   setPosts(firstPosts);
    // };
    // fetchPosts();
  }, []);

  console.log("props.posts", props.posts)

  let onChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value)
  }

  let filteredGnomes = props.posts.filter(
    (gnome) => {
      return gnome.name.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1;
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

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredGnomes.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (

    <div className='App' data-test="component-app">
      <header className="header container">
        <h1 id="header-text" className="page-title">Gnomify</h1>
        <div>
          <label className="search-label">Search</label>
          <input onChange= {onChange} type="text" />
        </div>
      </header>

      <Suspense fallback={<div>Loading...</div>}>
      <div className="container"> 
        <ul data-test="component-unordered-list" className="gnome-list" >
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
        <Pagination postsPerPage={postsPerPage} totalPosts={filteredGnomes.length} paginate={paginate} />
      </div>
      </Suspense>
    </div>
  );
};

let mapStateToProps = (state) => ({
  posts: state.posts.items
})

export default connect(mapStateToProps, { fetchPosts })(App);
