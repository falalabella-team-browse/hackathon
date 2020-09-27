import React from "react";
import { shallow } from "enzyme";
import Heading from "../Heading";

describe("Heading", () => {
  it("H1 should render properly", () => {
    const wrapper = shallow(<Heading.H1>this is h1</Heading.H1>);

    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("H2 should render properly", () => {
    const wrapper = shallow(<Heading.H2>this is h2</Heading.H2>);

    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("H4 should render properly", () => {
    const wrapper = shallow(<Heading.H4>this is h1</Heading.H4>);

    expect(wrapper.debug()).toMatchSnapshot();
  });
});
