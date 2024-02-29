import { createStore } from 'vuex';
import { cms, CmsState } from './cms/cms.module';

export interface RootState {
	cms: CmsState;
}

export default createStore({
	modules: { cms }, 
});
