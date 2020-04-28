<template>
<v-container>
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
	<v-divider  class="my-12"/>
	<ApolloQuery
		:query="require('../graphql/AllProducts.gql')"
		:variables="{ searchString }"
		v-if="filterType === 'search'"
	>
		<template slot-scope="{ result: { loading, error, data } }">
			<!-- Loading -->
			<div v-if="loading" class="loading apollo">Loading...</div>

			<!-- Error -->
			<div v-else-if="error" class="error apollo">An error occurred</div>

			<!-- Result -->
			<div v-else-if="data" class="result apollo">
				<v-row>
					<v-col cols="12" sm="6" md="4" lg="3" xl="2" v-for="(product, i) in data.Products" :key="i" >
						<v-card class="mx-auto" max-width="350" link @click="editProduct(product)">
							<p class="text-center">Click To Edit</p>
							<v-img :src="product.imageUrl"></v-img>
							<v-card-text>
								<h4 class="headline black--text">{{ product.name }}</h4>
								<p class="courseName">
									{{ product.category }}
								</p>
								<div class="text--primary">
									{{ product.description }}
								</div>
								<p>${{ product.price }}</p>
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</div>

			<!-- No result -->
			<div v-else class="no-result apollo">No result :(</div>
		</template>
	</ApolloQuery>
	<ApolloQuery
		:query="require('../graphql/Categories.gql')"
		:variables="{ category }"
		v-if="filterType === 'category'"
	>
		Categories
		<template slot-scope="{ result: { loading, error, data } }">
			<!-- Loading -->
			<div v-if="loading" class="loading apollo">Loading...</div>

			<!-- Error -->
			<div v-else-if="error" class="error apollo">An error occurred</div>

			<!-- Result -->
			<div v-else-if="data" class="result apollo">
				<v-row>
					<v-col cols="12" sm="6" md="4" lg="3" xl="2" v-for="(product, i) in data.Category" :key="i" >
						<v-card class="mx-auto" max-width="350" link @click="editProduct(product)">
							<p class="text-center">Click To Edit</p>
							<v-img :src="product.imageUrl"></v-img>
							<v-card-text>
								<h4 class="headline black--text">{{ product.name }}</h4>
								<p class="courseName">
									{{ product.category }}
								</p>
								<div class="text--primary">
									{{ product.description }}
								</div>
								<p>${{ product.price }}</p>
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</div>

			<!-- No result -->
			<div v-else class="no-result apollo">No result :(</div>
		</template>
	</ApolloQuery>

</v-container>
</template>

<script>
export default {
	name: 'GraphQL',
	data() {
		return {
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
	methods: {
		editProduct(product) {
			this.$store.dispatch('editProduct', product);
			this.$router.push(`/graphqlProduct/${product.id}`);
		},
	},
};
</script>

<style lang="scss" scoped>

.error {
	color: black;
}

</style>
