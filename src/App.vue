<template>
	<transition name="fade" mode="out-in">
		<div id="app" class="d-flex w-100 h-100 align-items-center background">
			<Card/>
		</div>
	</transition>
</template>

<script>
import Card from './components/Card.vue'

export default {
	name: 'App',
	components: {
		Card
	}
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
html, body {
	background-color: lightgrey;
}
.fade-enter, .fade-leave {
	opacity: 0;
	transform: translateX(2em);
}
.fade-enter-active, .fade-leave-active {
	transition: all .5s ease;
}
</style>
