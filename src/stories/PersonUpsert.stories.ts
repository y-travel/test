import { Story } from '@storybook/vue3';
import PassengerUpsert from '../pages/PassengerUpsert.vue';

export default {
  title: 'Passenger',
  component: PassengerUpsert,
  argType: {
    onClick: {},
  },
};

const Template: Story = (args) => ({
  components: { PassengerUpsert: PassengerUpsert },
  setup() {
    return { args };
  },
  template: '<passenger-upsert v-bind="args"/>',
});

export const Upsert = Template.bind({});
Upsert.args = {
  user: {},
};
