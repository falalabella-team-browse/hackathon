import React from "react";
import { shallow } from "enzyme";
import WarningIcon from "../WarningIcon";

describe("WarningIconIcon", () => {
  it("should render properly", () => {
    const wrapper = shallow(<WarningIcon />);
    expect(wrapper).toMatchSnapshot();
  });
});
