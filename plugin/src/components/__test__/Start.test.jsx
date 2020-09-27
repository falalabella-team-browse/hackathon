import React from "react";
import { shallow } from "enzyme";
import Star from "../Star";

describe("Star", () => {
  it("should render properly, with default props", () => {
    const wrapper = shallow(<Star />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render properly, with some props", () => {
    const wrapper = shallow(
      <Star width={25} height={25} view="EMPTY" gap={0} />
    );
    wrapper.find("svg").simulate("click");
    expect(wrapper).toMatchSnapshot();
  });

  it("should be clickable", () => {
    const fn = jest.fn();
    const wrapper = shallow(
      <Star width={25} height={25} view="HALF" onClick={fn} gap={0} />
    );
    wrapper.find("svg").simulate("click");
    expect(fn).toBeCalled();
  });
});
