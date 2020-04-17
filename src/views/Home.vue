<template>
<v-container class="home">
	<h4>This is the Home View viewing products using my node.js and express RESTful API</h4>
	<v-row>
		<v-col cols="4">
			<p>Filter by:</p>
			<v-radio-group v-model="filterType">
				<v-radio label="Search Term" value="search">Search Term</v-radio>
				<v-radio label="Category" value="category">Category</v-radio>
			</v-radio-group>
		</v-col>
		<v-col cols="4">
			<v-text-field label="Search" v-model="searchString"></v-text-field>
		</v-col>
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
					<div>{{ product.title }}</div>
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
	components: {
		//
	},
	data() {
		return {
			products: [],
			filterType: 'search',
			searchString: '',
			categories: [
				'Wakeboards',
				'Wakeboard Bindings',
				'Life Jackets',
				'Wakesurf Boards',
			],
			category: '',
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
			fetch('https://abennett-crud-server.herokuapp.com/api/products')
			// fetch('http://localhost:5000/api/products')
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					this.products = data;
				})
				.catch((err) => {
					console.error('Error getting products from REST API:', err);
				});
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
