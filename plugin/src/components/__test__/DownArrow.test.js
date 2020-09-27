import React from "react";
import { shallow } from "enzyme";
import DownArrow from "../DownArrow";

describe("DownArrow", () => {
  it("should render properly, with default props", () => {
    const wrapper = shallow(<DownArrow />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render properly, with props", () => {
    const wrapper = shallow(<DownArrow fill="#000" size="15px" rotate="0" />);
    expect(wrapper).toMatchSnapshot();
  });
});
