<template>
	<div class="container-fluid background mt-5 flex-fill">
		<div class="row justify-content-center">
			<div class="card max-vw-50 shadow p-4">
				<div class="container">
					<div class="row justify-content-start" @click="changeLanguage">
						<div class="col-2">
							<img v-if="language === 'spanish'" class="esflag" alt="Flag" src="../assets/spanish.png">
							<img v-else alt="Flag" class="enflag" src="../assets/english.png">
							<span class="text-align-centertext-muted mt-4">{{ languageText.languageName }}</span>
						</div>
					</div>
				</div>
				<div class="card-body">
					<form>
						<h1>Pico y placa</h1>
						<p class="text-muted mt-5">{{ languageText.explanation }}</p>
						<form>
							<input class="form-control mt-4" type="text" :placeholder="languageText.licensePlate">
							<input class="form-control mt-3" type="text" :placeholder="languageText.date">
							<button type="button" class="form-control btn btn-outline-primary mt-3">{{ languageText.submitButton }}</button>
						</form>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import spanishText from '../languages/spanish'
import englishText from '../languages/english'

export default {
	data () {
		return {
			language: 'spanish'
		}
	},
	computed: {
		languageText () {
			const language = this.language === 'spanish' ? spanishText : englishText
			console.log(language)
			return language
		}
	},
	methods: {
		changeLanguage () {
			if (this.language === 'spanish') {
				this.language = 'english'
			} else {
				this.language = 'spanish'
			}
		}
	}
}
</script>

<style>
.background {
	background-color: lightgrey;
}
.esflag {
	width: 6vh;
	height: auto;
}
.enflag {
	width: 5vh;
	height: auto;
}
</style>
