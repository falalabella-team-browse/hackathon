import React from "react";
import { shallow } from "enzyme";
import DoneIcon from "../DoneIcon";

describe("DoneIcon", () => {
  it("should render properly", () => {
    const wrapper = shallow(<DoneIcon />);
    expect(wrapper).toMatchSnapshot();
  });
});
