<template>
	<v-container>
		<v-row>
			<v-col>
				<v-card class="mx-auto" max-width="900">
					<v-img :src="product.imageUrl" max-height="200" contain></v-img>
					<v-card-text>
						<v-form @submit.prevent="updateProduct">
							<v-text-field v-model="product.title" label="Title"></v-text-field>
							<v-text-field class="courseName" v-model="product.productCategory" label="Category"></v-text-field>
							<v-textarea class="text--primary" v-model="product.description" label="Description"></v-textarea>
							<v-text-field v-model="product.price" prefix="$" label="Price"></v-text-field>
							<v-text-field v-model="product.imageUrl" label="Image URL"></v-text-field>
							<v-btn color="secondary" class="mr-6" @click="returnHome">Cancel</v-btn>
							<v-btn type="submit" color="primary">Commit Changes</v-btn>
						</v-form>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import axios from 'axios';

export default {
	name: 'RestProduct.vue',
	data() {
		return {
			product: {},
			productId: this.$route.params.productId,
		};
	},
	methods: {
		updateProduct() {
			console.log('this.product._id', this.product._id);
			console.log('stringified product:', JSON.stringify(this.product));
			// fetch('http://localhost:5000/api/edit-product', {
			axios({
				method: 'PUT',
				// url: `http://localhost:5000/api/edit-product?id=${this.product._id}&title=${this.product.title}&description=${this.product.description}&category=${this.product.category}&price=${this.product.price}&imageUrl=${this.product.imageUrl}`,
				url: 'http://localhost:5000/api/edit-product',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				data: this.product,
			})
				// .then((response) => {
				// 	return response.json();
				// })
				.then((data) => {
					console.log('fetch put:', data);
				})
				.catch((err) => {
					console.error('Error PUTing:', err);
				});
			// this.$router.push('/');
		},
	},
	beforeMount() {
		fetch(`https://abennett-crud-server.herokuapp.com/api/product/${this.productId}`)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				this.product = data;
			})
			.catch((err) => {
				console.error('Error getting product from api', err);
			});
	},
};
</script>

<style scoped>

</style>
