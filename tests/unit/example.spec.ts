import { mount } from "@vue/test-utils";
import App from "@/App.vue";

describe("App.vue", () => {
  it("앱이 생성되어야 한다.", () => {
    const wrapper = mount(App);
    expect(wrapper.exists()).toBeTruthy();
  });

  it("올바른 제목을 렌더링해야 한다.", () => {
    const wrapper = mount(App);
    expect(wrapper.html()).toContain('<div id="app">');
  });
});
