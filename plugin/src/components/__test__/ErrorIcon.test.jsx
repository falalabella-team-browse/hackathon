import React from "react";
import { shallow } from "enzyme";
import ErrorIcon from "../ErrorIcon";

describe("ErrorIcon", () => {
  it("should render properly, with default props", () => {
    const wrapper = shallow(<ErrorIcon />);
    expect(wrapper).toMatchSnapshot();
  });
});
