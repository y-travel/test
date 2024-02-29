import { Module } from 'vuex/types/index.js';
import { CMS_ACTIONS } from './cms.action';
import { CMS_MUTATIONS } from './cms.mutation';
import { RootState } from '..';
import { MetaPackageListModel } from '@/src/interface/metaPackageList.model';

export interface CmsState {
	//TODO:
	// create interface package list
	packageList: any;
	metaPackageList: MetaPackageListModel;
}

const INITIAL_STATE: CmsState = {
	packageList: [],
	metaPackageList: {
		limit: 0,
		total: 0,
		start: 0,
	},
};

export const cms: Module<CmsState, RootState> = {
	actions: CMS_ACTIONS,
	mutations: CMS_MUTATIONS,
	getters: {},
	state: INITIAL_STATE,
	namespaced: true,
};
