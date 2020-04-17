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
							<v-btn type="submit" color="primary">Commit Changes</v-btn>
						</v-form>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: 'RestProduct.vue',
	data() {
		return {
			product: {},
			productId: this.$route.params.productId,
		};
	},
	methods: {
		async updateProduct() {
			const response = await fetch('http://localhost:5000/api/edit-product', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
				},
				body: JSON.stringify(this.product),
			});
			console.log('fetch put:', response);
			// this.$router.push('/');
		},
	},
	beforeMount() {
		fetch(`http://localhost:5000/api/product/${this.productId}`)
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
