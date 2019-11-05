import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json');
      const firstPosts = res.data.Brastlewark
      setPosts(firstPosts);
    };
    fetchPosts();
  }, []);

  let onChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value)
  }

  let filteredGnomes = posts.filter(
    (gnome) => {
      return gnome.name.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1;
    }
  )
 
  let arrayString = (arr) => {
    return arr.toString().split(/[,]+/).join(', ')
  }

  let details = (itemType, item) => {
    if(item.length > 1) {
      return <p className="product__subtitle" itemProp="description">{itemType}: {arrayString(item)}</p>
    } else {
      return <p></p>
    }
  }

  console.log("posts", posts)

  return (
    <div className='App'>
       <header className="header container">
        <h1 className="page-title">Gnomify</h1>
        <div>
          <label className="search-label">Search</label>
          <input onChange= {onChange} type="text" />
        </div>
      </header>

      {/* <main className="product-page"> */}
        <div className="container"> 
          <ul className="gnome-list" >
            {filteredGnomes.map(post => (
            <li  className="gnome-list__item">
            {/* <article className="product" itemScope itemType="http://schema.org/Product"> */}
                <figure className="gnome__image-wrapper">
                  <img className="gnome__image" hello={console.log("typeof", typeof post.name)} src={post.thumbnail} alt="Gnome picture" itemProp="image"/>
                  
                </figure>
                <div className="personal__details">
                  <h1 className="name" itemProp="brand">{post.name}</h1>
                  <p className="product__subtitle" itemProp="description">Height: {Math.floor(post.height)}cm</p>
                  <p className="product__subtitle" itemProp="description">Weight: {Math.floor(post.weight)}kg</p>

                  {details("Friends", post.friends)}
                  {details("Professions", post.professions)}

                  <div className="product__price" itemScope itemType="http://schema.org/Offer">
                  </div>
                </div>
              {/* </article> */}
            </li>
          ))}
          </ul>
        </div>
      {/* </main> */}
    </div>
  );
};

export default App;
