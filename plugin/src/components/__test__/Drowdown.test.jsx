import React from "react";
import { mount, shallow } from "enzyme";
import Dropdown from "../Dropdown";
import { act } from "react-dom/test-utils";

const OPTION = [
  { label: "Option 1", value: "v1" },
  { label: "Option 2", value: "v2" },
];

describe("Dropdown", () => {
  it("should render properly without any props", () => {
    const fn = jest.fn();
    const wrapper = mount(<Dropdown onChange={fn} />);

    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("should change value on click", () => {
    const fn = jest.fn();
    const wrapper = mount(<Dropdown options={OPTION} onChange={fn} />);

    wrapper.find("div").first().simulate("click");
    wrapper.find("li").first().simulate("click");

    expect(fn).toBeCalled;
    wrapper.unmount();
  });

  it("should close dropdown when focus is lost", () => {
    const mock = {};
    const oal = document.addEventListener;

    document.addEventListener = (type, cb) => {
      mock[type] = cb;
    };

    const fn = jest.fn();
    const wrapper = mount(
      <section>
        <a>link</a>
        <Dropdown options={OPTION} onChange={fn} />
      </section>
    );

    expect(mock.mousedown).toBeDefined();

    wrapper.find("div").first().simulate("click");
    expect(wrapper.find("li").length).toBe(2);

    act(() => {
      mock.mousedown({
        target: document.createElement("p"),
      });
    });

    wrapper.update();

    expect(wrapper.find("li").length).toBe(0);

    document.addEventListener = oal;
  });
});
