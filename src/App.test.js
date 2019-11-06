import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import App from "./App";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props={}, state=null) => {
  return shallow(<App {...props} />)
}

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`);
}

  test("App renders without an error", () => {
    const wrapper = setup()
    const appComponent = findByTestAttr(wrapper, 'component-app');
    expect(appComponent.length).toBe(1);
  });
  test("list of gnomes renders", () => {
    const wrapper = setup()
    const unorderedList = findByTestAttr(wrapper, 'component-unordered-list');
    expect(unorderedList.length).toBe(1);
  });
  test("Posts state starts at empty array", () => {
    const wrapper = setup()
    const initialPostsState = wrapper.state("posts").to.equal(1);
    expectwrapper.state("posts").to.equal(1);
  });

  


  // test pagination by expect currentPosts toBe < 100