import {
  FETCH_POSTS,
  CURRENT_PAGE,
  SEARCH_INPUT
} from "./types";
import axios from "axios";

  export const fetchPosts = () => dispatch => {
    fetch('https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json')
    .then(res => res.json())
    .then(posts =>
      dispatch({
      type: FETCH_POSTS,
      // get specific array posts.data.Brastlewark
      payload: posts.Brastlewark
    }));
  }

  export const getCurrentPage = (pageNumber) => {
    return {
      type: CURRENT_PAGE,
      payload: pageNumber
    }
  }

  export const getSearchInput = (e) => {
    return {
      type: SEARCH_INPUT,
      payload: e.target.value
    }
  }