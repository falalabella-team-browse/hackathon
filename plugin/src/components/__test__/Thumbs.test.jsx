import React from "react";
import { shallow } from "enzyme";
import Thumbs from "../Thumbs";

describe("Thumbs", () => {
  it("should render properly, with props", () => {
    const wrapper = shallow(<Thumbs options={{ color: "#fff" }} />);
    expect(wrapper).toMatchSnapshot();
  });
});
