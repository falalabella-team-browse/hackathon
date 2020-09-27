import React from "react";
import { shallow } from "enzyme";
import { FilledButton, OutlinedButton } from "../Button";

describe("Button", () => {
  it("should render filled button properly", () => {
    const fn = jest.fn();
    const wrapper = shallow(<FilledButton onClick={fn}>Button</FilledButton>);

    wrapper.find("Button__FillButton").simulate("click");

    expect(fn).toBeCalled();
  });

  it("should render outline button properly", () => {
    const fn = jest.fn();
    const wrapper = shallow(
      <OutlinedButton onClick={fn}>Button</OutlinedButton>
    );

    wrapper.find("Button__OutlineButton").simulate("click");

    expect(fn).toBeCalled();
  });
});
