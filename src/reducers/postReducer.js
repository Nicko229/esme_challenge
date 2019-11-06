import {
  FETCH_POSTS,
  CURRENT_PAGE,
  SEARCH_INPUT
} from "../actions/types";

const initialState = {
  items: [],
  currentPage: 1,
  searchInput: ""
}

export default function(state = initialState, action) {
  switch(action.type) {
    default:
      return state;
    case FETCH_POSTS:
      console.log("hello from reducer")
      return {
        ...state,
        items: action.payload
      }
  }
};