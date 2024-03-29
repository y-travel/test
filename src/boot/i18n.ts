import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';

import messages from '../i18n';

const i18n = createI18n({
  locale: 'fa-IR',
  messages,
});
const loc = (statement: string,params=[]) => i18n.global.t(statement??'',params);
export default boot(({ app }) => {
  // Set i18n instance on app
  app.use(i18n);
	
});
export { i18n, loc };
