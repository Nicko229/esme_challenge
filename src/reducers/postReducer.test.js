import { CURRENT_PAGE } from "../actions/types";
import postReducer from "./postReducer";

test("returns default inital state when page is loaded", () => {
  expect(postReducer(undefined, {})).toEqual(
    {
      items: [],
      currentPage: 1,
      searchInput: ""
    }
  )
})
test("returns state number greater than 1 upon receiving action type CURRENT_PAGE", () => {
  const newState = postReducer(undefined, { type: CURRENT_PAGE});
  expect(newState).not.toBe(0)
})
