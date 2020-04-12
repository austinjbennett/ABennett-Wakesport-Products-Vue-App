import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home.vue';
import Admin from './views/Admin.vue';
import GraphQL from './views/GraphQL.vue';
import GraphQLAdmin from './views/GraphQLAdmin.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/admin',
		name: 'REST Admin',
		component: Admin,
	},
	{
		path: '/graphql',
		name: 'GraphQL',
		component: GraphQL,
	},
	{
		path: '/graphqlAdmin',
		name: 'GraphQL Admin',
		component: GraphQLAdmin,
	},

];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
