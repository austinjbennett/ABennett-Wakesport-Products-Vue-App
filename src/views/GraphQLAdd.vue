<template>
<v-container>
	<ApolloMutation
		:mutation="require('../graphql/AddProduct.gql')"
		:variables="{
			name: product.name,
			category: product.category,
			description: product.description,
			price: sendPrice,
			imageUrl: product.imageUrl,
		}"
		@done="onDone"
	>
		<template v-slot="{ mutate, loading, error }">
			<v-container>
				<v-row>
					<v-col>
						<v-card class="mx-auto" max-width="900">
							<v-card-text>
								<v-form @submit.prevent="mutate()">
									<v-text-field v-model="product.name" label="Name"></v-text-field>
									<v-select :items="categories" label="Category" v-model="product.category"></v-select>
									<v-textarea class="text--primary" v-model="product.description" label="Description"></v-textarea>
									<v-text-field v-model="product.price" prefix="$" label="Price"></v-text-field>
									<v-text-field v-model="product.imageUrl" label="Image URL"></v-text-field>
									<v-btn color="secondary" class="mr-6" :disabled="loading" @click="returnHome">Cancel</v-btn>
									<v-btn type="submit" color="primary" :disabled="loading">Commit Changes</v-btn>
									<p v-if="error">An error occurred: {{ error }}</p>
								</v-form>
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</template>
	</ApolloMutation>

</v-container>
</template>

<script>
export default {
	name: 'GraphQLAddProduct',

	components: {
		//
	},

	data: () => ({
		product: {},
		categories: [
			'Wakeboards',
			'Wakeboard Bindings',
			'Life Jackets',
			'Wakesurf Boards',
		],
	}),
	computed: {
		sendPrice() {
			return parseInt(this.product.price, 10);
		},
	},
	methods: {
		onDone() {
			this.$router.push('/graphql');
		},
		returnHome() {
			this.$router.push('/graphql');
		},
	},
};
</script>
