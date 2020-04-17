import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home.vue';
import RestEditProduct from './views/RestEditProduct.vue';
import RestAdd from './views/RestAdd.vue';
import GraphQL from './views/GraphQL.vue';
import GraphQLEditProduct from './views/GraphQLEditProduct.vue';
import GraphQLAdd from './views/GraphQLAdd.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/restProduct/:productId',
		name: 'REST Product Page',
		component: RestEditProduct,
	},
	{
		path: '/restAdd',
		name: 'REST Add',
		component: RestAdd,
	},
	{
		path: '/graphql',
		name: 'GraphQL',
		component: GraphQL,
	},
	{
		path: '/product/:productId',
		name: 'Product Page',
		component: GraphQLEditProduct,
	},
	{
		path: '/graphqlAdd',
		name: 'GraphQL Add Product',
		component: GraphQLAdd,
	},

];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
