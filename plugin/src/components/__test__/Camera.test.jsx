import React from "react";
import { shallow } from "enzyme";
import Camera from "../Camera";

describe("CameraIcon", () => {
  it("should render properly", () => {
    const wrapper = shallow(<Camera />);
    expect(wrapper).toMatchSnapshot();
  });
});
