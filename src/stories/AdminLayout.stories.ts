import { Story } from '@storybook/vue3'
import AdminLayout from '../layouts/AdminLayout.vue';

export default {
  title: 'Layout',
  component: AdminLayout,
  argType: {
    onClick: {},
  },
}

const Template:Story = (args) => ({
  components: {AdminLayout:AdminLayout },
  setup() {
    return { args };
  },
  template: '<main-layout v-bind="args"/>',
});


export const test1 = Template.bind({});
test1.args={
  user: {},
};
