<template>
	<transition name="fade" mode="out-in">
		<div id="app" class="d-flex w-100 h-100 align-items-center">
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
body {
	background: url(https://images.wallpaperscraft.com/image/road_junction_interchange_road_roads_131526_3840x2400.jpg) no-repeat center center fixed;
	background-size: cover;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	-o-background-size: cover;
}
.fade-enter, .fade-leave {
	opacity: 0;
	transform: translateX(2em);
}
.fade-enter-active, .fade-leave-active {
	transition: all .5s ease;
}
</style>
