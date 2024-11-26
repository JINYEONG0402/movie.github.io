import { mount } from "@vue/test-utils";
import App from "@/App.vue";

describe("App.vue", () => {
  it("should render the app", () => {
    const wrapper = mount(App);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render the title", () => {
    const wrapper = mount(App);
    const title = wrapper.find("h1");
    expect(title.text()).toContain("Hello, Vue App");
  });
});
