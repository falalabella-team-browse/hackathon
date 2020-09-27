import React from "react";
import { shallow } from "enzyme";
import CircularLoader from "../CircluarLoader";

describe("CircularLoader", () => {
  it("should render properly, with default props", () => {
    const wrapper = shallow(<CircularLoader />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render properly, with props", () => {
    const wrapper = shallow(<CircularLoader size="40px" color="#000" />);
    expect(wrapper).toMatchSnapshot();
  });
});
