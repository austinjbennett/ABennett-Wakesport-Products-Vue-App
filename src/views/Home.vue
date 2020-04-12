<template>
<div class="home">
	This is the Home View with the ApolloExample component
	<ApolloExample/>
</div>
</template>

<script>
// @ is an alias to /src
import ApolloExample from '@/components/ApolloExample.vue';

export default {
	name: 'Home',
	components: {
		ApolloExample,
	},
};
</script>
