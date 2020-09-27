import React from "react";
import { shallow } from "enzyme";
import TextInput from "../TextInput";

describe("TextInput", () => {
  it("should render properly, with props", () => {
    const fn = jest.fn();
    const wrapper = shallow(
      <TextInput placeholder="p" onChange={fn} value="val" />
    );

    wrapper
      .find("TextInput__Input")
      .simulate("change", { target: { value: "value" } });

    expect(fn).toBeCalledWith({ target: { value: "value" } });
  });
});
