import React from "react";
import { shallow } from "enzyme";
import Cart from "../Cart";

describe("CartIcon", () => {
  it("should render properly", () => {
    const wrapper = shallow(<Cart />);
    expect(wrapper).toMatchSnapshot();
  });
});
