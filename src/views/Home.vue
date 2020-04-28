<template>
<v-container class="home">
	<h4>This is the Home View viewing products using my node.js and express RESTful API</h4>
	<v-row>
		<v-col cols="4">
			<v-select :items="categories" label="Select a Category" v-model="category"></v-select>
		</v-col>
	</v-row>
	<v-row v-if="loading">
		<v-col>
			<h3>Loading Products...</h3>
		</v-col>
	</v-row>
	<v-row v-else>
		<v-col cols="12" sm="6" md="4" lg="3" xl="2" v-for="(product, i) in products" :key="i">
			<router-link :to="'/restProduct/' + product._id" class="product-card" link>
			<v-card class="mx-auto product-card" max-width="350" link>
				<p class="text-center">Click To Edit</p>
				<v-img :src="product.imageUrl"></v-img>
				<v-card-text>
					<h4 class="headline black--text">{{ product.title }}</h4>
					<p class="courseName">
						{{ product.productCategory }}
					</p>
					<div class="text--primary">
						{{ product.description }}
					</div>
					<p>${{ product.price }}</p>
				</v-card-text>
			</v-card>
			</router-link>
		</v-col>
	</v-row>
</v-container>
</template>

<script>
// @ is an alias to /src

export default {
	name: 'Home',
	data() {
		return {
			products: [],
			filterType: 'search',
			searchString: '',
			categories: [
				'All',
				'Wakeboards',
				'Wakeboard Bindings',
				'Life Jackets',
				'Wakesurf Boards',
			],
			category: 'All',
			type: 'search',
		};
	},
	computed: {
		loading() {
			return !(this.products.length > 0);
		},
	},
	methods: {
		getProducts() {
			if (this.category === 'All') {
				fetch('https://abennett-crud-server.herokuapp.com/api/products')
					.then((response) => {
						return response.json();
					})
					.then((data) => {
						this.products = data;
					})
					.catch((err) => {
						console.error('Error getting products from REST API:', err);
					});
			} else {
				fetch(`https://abennett-crud-server.herokuapp.com/api/products/category/${this.category}`)
					.then((response) => {
						return response.json();
					})
					.then((data) => {
						this.products = data;
					})
					.catch((err) => {
						console.error('Error getting products by Category from REST API:', err);
					});
			}
		},
	},
	watch: {
		category() {
			this.getProducts();
		},
	},
	beforeMount() {
		this.getProducts();
	},
};
</script>

<style>
	.product-card {
		text-decoration: none !important;
	}
</style>
