import React from "react";
import { shallow } from "enzyme";
import Close from "../Close";

describe("CloseIcon", () => {
  it("should render properly, with default props ", () => {
    const wrapper = shallow(<Close />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render properly, with props ", () => {
    const wrapper = shallow(<Close fill="#E2574C" size="20px" />);
    expect(wrapper).toMatchSnapshot();
  });
});
