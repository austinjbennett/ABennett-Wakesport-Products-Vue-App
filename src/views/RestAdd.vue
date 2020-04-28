<template>
<v-container>
	<v-container>
		<v-row>
			<v-col>
				<v-card class="mx-auto" max-width="900">
					<v-img :src="product.imageUrl" max-height="200" contain></v-img>
					<v-card-text>
						<v-form @submit.prevent="addProduct">
							<v-text-field v-model="product.title" label="Title"></v-text-field>
							<v-select :items="categories" label="Category" v-model="product.productCategory"></v-select>
							<v-textarea v-model="product.description" label="Description"></v-textarea>
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

</v-container>
</template>

<script>
export default {
	name: 'RESTAddProduct',
	data: () => ({
		product: {},
		categories: [
			'Wakeboards',
			'Wakeboard Bindings',
			'Life Jackets',
			'Wakesurf Boards',
		],
	}),
	methods: {
		addProduct() {
			const payload = {
				title: this.product.title,
				productCategory: this.product.productCategory,
				description: this.product.description,
				price: parseInt(this.product.price, 10),
				imageUrl: this.product.imageUrl,
			};
			fetch('https://abennett-crud-server.herokuapp.com/api/add-product', {
				method: 'POST',
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
		returnHome() {
			this.$router.push('/');
		},
	},
};
</script>
