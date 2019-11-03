import React, { useState, useEffect } from 'react';
import Pagination from './components/Pagination';
import axios from 'axios';
import './App.css';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);


  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json');
      setPosts(res.data.Brastlewark);
      console.log("res.sata", res.data.Brastlewark)
    };
    fetchPosts();
  }, []);

  console.log("posts", posts)


  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='App'>
      {/* <header className="header container">
        <h1 className="page-title">MUSEMENT</h1>
        <aside className="header-bag">
          <div className="header-bag__item header-bag__count">
            <div className="header-bag__price">
            {bagItems}
            </div>
            <img src={bag} />
            <span className="bag__item-counter">{bagIcon}</span>
          </div>
          <div className="header-bag__item header-bag__wishlist-count">
            <img src={wishlistIcon} />
              <span className="bag__item-counter">{wishlist}</span>
          </div>
        </aside>
      </header> */}

      <main className="product-page">
        <div className="container"> 
          <ul className="product-list" >
            {posts.map(post => (
            <li  className="product-list__item">
            <article className="product" itemScope itemType="http://schema.org/Product">
                <figure className="product__image-wrapper">
                  <img className="product__image" src={post.thumbnail} alt="Product" itemProp="image"/>
                  
                </figure>
                <div className="product__details">
                  <h1 className="product__title" itemProp="brand">{post.name}</h1>
                  <p className="product__subtitle" itemProp="description">{post.friends}</p>
                  <p className="product__subtitle" itemProp="description">{post.professions}</p>

                  <div className="product__price" itemScope itemType="http://schema.org/Offer">
                  {/* <span className="product__price--strike">${post.original_retail_price.value}</span><span className="product__price--discounted" itemProp="price">${post.retail_price.value}</span> */}
                  </div>
                  {/* <button
                  onClick={() => setBagState(post)} 
                  className="product__add-to-cart button button--primary">Add to Cart</button> */}
                </div>
              </article>
            </li>
          ))}
          </ul>
                  
          {/* <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
          /> */}
        </div>
      </main>
    </div>
  );
};

export default App;
