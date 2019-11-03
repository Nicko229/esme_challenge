import React, { useState, useEffect } from 'react';
import Pagination from './components/Pagination';
import axios from 'axios';
import './App.css';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);


  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json');
      const firstPosts = res.data.Brastlewark.slice(0, 90)
      setPosts(firstPosts);
    };
    fetchPosts();
  }, []);


  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='App'>
       <header className="header container">
        <h1 className="page-title">Gnomify</h1>
      </header>

      {/* <main className="product-page"> */}
        <div className="container"> 
          <ul className="gnome-list" >
            {currentPosts.map(post => (
            <li  className="gnome-list__item">
            {/* <article className="product" itemScope itemType="http://schema.org/Product"> */}
                <figure className="gnome__image-wrapper">
                  <img className="gnome__image" src={post.thumbnail} alt="Gnome picture" itemProp="image"/>
                  
                </figure>
                <div className="personal__details">
                  <h1 className="name" itemProp="brand">{post.name}</h1>
                  <p className="product__subtitle" itemProp="description">{post.friends}</p>
                  <p className="product__subtitle" itemProp="description">{post.professions}</p>

                  <div className="product__price" itemScope itemType="http://schema.org/Offer">
                  </div>
                </div>
              {/* </article> */}
            </li>
          ))}
          </ul>
                  
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
          />
        </div>
      {/* </main> */}
    </div>
  );
};

export default App;
