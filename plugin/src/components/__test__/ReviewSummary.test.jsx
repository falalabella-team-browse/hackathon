import React from "react";
import { shallow } from "enzyme";
import ReviewSummary from "../ReviewSummary";

describe("ReviewSummary", () => {
  it("should render properly", () => {
    const wrapper = shallow(<ReviewSummary rating={4} count={3} />);
    expect(wrapper).toMatchSnapshot();
  });
});
