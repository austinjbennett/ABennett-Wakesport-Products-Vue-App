<template>
<v-app>
	<v-app-bar
		app
		dark
	>
		<v-spacer></v-spacer>
		<div>
			<router-link class="routerLink" to="/">Home</router-link><span class="routerLink"> | </span>
			<router-link class="routerLink" to="/admin">Admin</router-link>
			<router-link class="routerLink" to="/graphql">Home</router-link><span class="routerLink"> | </span>
			<router-link class="routerLink" to="/graphqlAdmin">Admin</router-link>
		</div>
		<v-spacer></v-spacer>
	</v-app-bar>

	<v-content>
		<!-- <CourseCard/> -->
		<!-- <Admin/> -->
		<router-view/>
	</v-content>
</v-app>
</template>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

#nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
