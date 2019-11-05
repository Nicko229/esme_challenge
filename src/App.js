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
      return <p className="gnome__subtitle" itemProp="description"><strong>{itemType}:</strong> {arrayString(item)}</p>
    } else {
      return <p></p>
    }
  }

  return (
    <div className='App'>
      <header className="header container">
        <h1 className="page-title">Gnomify</h1>
        <div>
          <label className="search-label">Search</label>
          <input onChange= {onChange} type="text" />
        </div>
      </header>

      <div className="container"> 
        <ul className="gnome-list" >
          {filteredGnomes.map(post => (
          <li key={post.name} className="gnome-list__item">
            <figure className="gnome__image-wrapper">
              <img className="gnome__image" src={post.thumbnail} alt="Gnome" itemProp="image"/>              
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
        ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
