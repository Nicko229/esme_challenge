import React from "react";
import Img from 'react-image';
import VisibilitySensor from 'react-visibility-sensor';
import { connect } from "react-redux";
import filteredGnomes from "../constants/filteredGnomes";

const List = (props) => {

  const arrayString = (arr) => {
    return arr.toString().split(/[,]+/).join(', ')
  }

  const details = (itemType, item) => {
    if(item.length > 1) {
      return <p className="gnome__subtitle" itemProp="description"><strong>{itemType}:</strong> {arrayString(item)}</p>
    } else {
      return null;
    }
  }

  const indexOfLastPost = props.currentPage * 100;
  const indexOfFirstPost = indexOfLastPost - 100;
  const currentPosts = filteredGnomes(props).slice(indexOfFirstPost, indexOfLastPost);

  return(
    <ul className="gnome-list" >
    {currentPosts.map(post => (
    <VisibilitySensor>
      <li key={post.name} className="gnome-list__item">
        <figure className="gnome__image-wrapper">
          <Img className="gnome__image" src={post.thumbnail} alt="Gnome" itemProp="image"/>              
        </figure>
        <div className="personal__details">
          <h2 className="name" ><strong>{post.name}</strong></h2>
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
  )
}

let mapStateToProps = (state) => ({
  posts: state.posts.items,
  currentPage: state.posts.currentPage,
  searchInput: state.posts.searchInput
})

export default connect(mapStateToProps, {})(List);