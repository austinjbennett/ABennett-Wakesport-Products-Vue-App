<template>
	<v-container>
		<v-row>
			<v-col>
				<v-card class="mx-auto" max-width="900">
					<v-img :src="product.imageUrl" max-height="200" contain></v-img>
					<v-card-text>
						<v-form @submit.prevent="updateProduct">
							<v-text-field v-model="product.title" label="Title"></v-text-field>
							<v-select :items="categories" label="Category" v-model="product.productCategory"></v-select>
							<v-textarea v-model="product.description" label="Description"></v-textarea>
							<v-text-field v-model="product.price" prefix="$" label="Price"></v-text-field>
							<v-text-field v-model="product.imageUrl" label="Image URL"></v-text-field>
							<v-btn color="secondary" class="mr-6" @click="returnHome">Cancel</v-btn>
							<v-btn type="submit" color="primary">Commit Changes</v-btn>
							<v-btn color="error" absolute right @click="deleteProduct">Delete Product</v-btn>
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
			categories: [
				'Wakeboards',
				'Wakeboard Bindings',
				'Life Jackets',
				'Wakesurf Boards',
			],
			serverBaseUrl: 'https://abennett-crud-server.herokuapp.com/api',
		};
	},
	methods: {
		updateProduct() {
			const payload = {
				productId: this.productId,
				title: this.product.title,
				productCategory: this.product.productCategory,
				description: this.product.description,
				price: parseInt(this.product.price, 10),
				imageUrl: this.product.imageUrl,
			};
			fetch(`${this.serverBaseUrl}/edit-product/`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
				},
				body: JSON.stringify(payload),
			})
				.then((response) => {
					return response.json();
				})
				.then(() => {
					//
				})
				.catch((err) => {
					console.error('Error PUTing:', err);
				});
			this.$router.push('/');
		},
		deleteProduct() {
			fetch(`${this.serverBaseUrl}/delete-product`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
				},
				body: JSON.stringify({
					productId: this.productId,
				}),
			})
				.then(() => {
					this.returnHome();
				})
				.catch((err) => {
					console.error('Error Deleting Product:', err);
				});
		},
		returnHome() {
			this.$router.push('/');
		},
	},
	beforeMount() {
		fetch(`${this.serverBaseUrl}/product/${this.productId}`)
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
