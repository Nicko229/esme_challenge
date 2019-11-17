import {
  FETCH_POSTS,
  CURRENT_PAGE,
  SEARCH_INPUT
} from "../actions/types";

const initialState = {
  items: [],
  currentPage: 1,
  searchInput: "",
  filteredGnomes: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        items: action.payload
      }
    case CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      }
    case SEARCH_INPUT:
      return {
        ...state,
        searchInput: action.payload
      }
    default:
      return state;
  }
};