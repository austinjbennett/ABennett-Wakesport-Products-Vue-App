<template>
<v-container>
	GraphQL View

	<ApolloQuery
		:query="require('../graphql/AllProducts.gql')"
		:variables="{ searchString }"
	>
		<template slot-scope="{ result: { loading, error, data } }">
			<!-- Loading -->
			<div v-if="loading" class="loading apollo">Loading...</div>

			<!-- Error -->
			<div v-else-if="error" class="error apollo">An error occured</div>

			<!-- Result -->
			<div v-else-if="data" class="result apollo">
				<v-row>
					<v-col cols="12" sm="6" md="4" lg="3" xl="2" v-for="(product, i) in data.Products" :key="i" >
						<v-card class="mx-auto" max-width="350">
							<v-img :src="product.imageUrl"></v-img>
							<v-card-text>
								<div>{{ product.title }}</div>
								<p class="courseName">
									{{ product.category }}
								</p>
								<div class="text--primary">
									{{ product.description }}
								</div>
								<p>{{ product.price }}</p>
							</v-card-text>
							<v-card-actions>
								<v-btn color="primary" fab x-small dark @click="editCourse(item)">
							<v-icon>mdi-pencil</v-icon>
						</v-btn>
							</v-card-actions>
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

	components: {
		//
	},

	data() {
		return {
			searchString: '',
		};
	},
};
</script>

<style lang="scss" scoped>

.error {
	color: black;
}

</style>
