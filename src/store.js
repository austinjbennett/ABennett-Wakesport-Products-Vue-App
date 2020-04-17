import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		editingProduct: null,
	},
	mutations: {
		editProduct(state, product) {
			state.editingProduct = product;
		},
	},
	actions: {
		editProduct(context, product) {
			context.commit('editProduct', product);
		},
	},
});
