import { getCurrentPage, getSearchInput } from "./postActions";
import { CURRENT_PAGE } from "./types";

  test("returns an action with type CURRENT_PAGE", () => {
    const action = getCurrentPage();
    expect(action).toEqual({ type: CURRENT_PAGE })
  })
