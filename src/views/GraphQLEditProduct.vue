<template>
	<ApolloMutation
		:mutation="require('../graphql/UpdateProduct.gql')"
		:variables="{
			id,
			name,
			category,
			description,
			price: sendPrice,
			imageUrl,
		}"
		@done="onDone"
	>
		<template v-slot="{ mutate, loading, error }">
			<v-container>
				<v-row>
					<v-col>
						<v-card class="mx-auto" max-width="900">
							<v-img :src="imageUrl" max-height="200" contain></v-img>
							<v-card-text>
								<v-form @submit.prevent="mutate()">
									<v-text-field v-model="name" label="Name"></v-text-field>
									<v-select :items="categories" label="Category" v-model="category"></v-select>
									<v-textarea class="text--primary" v-model="description" label="Description"></v-textarea>
									<v-text-field v-model="price" prefix="$" label="Price"></v-text-field>
									<v-text-field v-model="imageUrl" label="Image URL"></v-text-field>
									<v-btn color="secondary" class="mr-6" :disabled="loading" @click="returnHome">Cancel</v-btn>
									<v-btn type="submit" color="primary" :disabled="loading">Commit Changes</v-btn>
									<v-btn color="error" absolute right :disabled="loading" @click="deleteProduct">Delete Product</v-btn>
									<p v-if="error">An error occurred: {{ error }}</p>
								</v-form>
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</template>
	</ApolloMutation>
</template>

<script>
import DELETE_PRODUCT from '../graphql/DeleteProduct.gql';

export default {
	name: 'GraphQLProduct',
	data() {
		return {
			id: this.$route.params.productId,
			name: this.$store.state.editingProduct.name,
			category: this.$store.state.editingProduct.category,
			description: this.$store.state.editingProduct.description,
			price: this.$store.state.editingProduct.price,
			imageUrl: this.$store.state.editingProduct.imageUrl,
			categories: [
				'Wakeboards',
				'Wakeboard Bindings',
				'Life Jackets',
				'Wakesurf Boards',
			],
		};
	},
	computed: {
		sendPrice() {
			return parseInt(this.price, 10);
		},
	},
	methods: {
		returnHome() {
			this.$router.push('/');
		},
		async deleteProduct() {
			await this.$apollo.mutate({
				mutation: DELETE_PRODUCT,
				variables: {
					id: this.id,
				},
			});
			await this.$router.push('/graphql');
		},
	},
};
</script>

<style scoped>

</style>
