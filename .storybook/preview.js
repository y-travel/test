import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/animate/fadeInUp.css';
import '@quasar/extras/animate/fadeOutDown.css';
import '@quasar/extras/animate/fadeInRight.css';
import '@quasar/extras/animate/fadeOutRight.css';

import 'quasar/dist/quasar.css';
import { app } from '@storybook/vue3';
import { Quasar,Notify } from 'quasar';

import bootAxios from '../src/boot/axios';
import bootI18n from '../src/boot/i18n';


bootAxios({ app });
bootI18n({app});

app.use(Quasar, {
  framework: {
    config: {},

    // iconSet: 'material-icons', // Quasar icon set
    // lang: 'en-US', // Quasar language pack

    // For special cases outside of where the auto-import strategy can have an impact
    // (like functional components as one of the examples),
    // you can manually specify Quasar components/directives to be available everywhere:
    //
    // components: [],
    // directives: [],

    // Quasar plugins
    plugins: [Notify],
  },
});

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
