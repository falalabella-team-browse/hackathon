import React from "react";
import { shallow } from "enzyme";
import TextArea from "../TextArea";

describe("TextArea", () => {
  it("should render properly, with props", () => {
    const fn = jest.fn();
    const wrapper = shallow(
      <TextArea placeholder="p" onChange={fn} value="val" />
    );

    wrapper
      .find("TextArea__Input")
      .simulate("change", { target: { value: "value" } });

    expect(fn).toBeCalledWith({ target: { value: "value" } });
  });
});
