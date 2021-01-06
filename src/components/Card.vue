<template>
	<div class="container-fluid background mt-5 flex-fill">
		<div class="row justify-content-center">
			<div class="card max-vw-50 shadow p-4">
				<div class="container">
					<div class="row justify-content-start" @click="changeLanguage">
						<div class="col-2 col-sm-4 col-xs-12">
							<br/>
							<img v-if="language === 'spanish'" class="esflag" alt="Flag" src="../assets/spanish.png">
							<img v-else alt="Flag" class="enflag" src="../assets/english.png">
							<span class="text-align-centertext-muted mt-4 d-inline">{{ languageText.languageName }}</span>
						</div>
					</div>
				</div>
				<div class="card-body mt-n3">
					<form>
						<h1>Pico y placa</h1>
						<p class="text-muted mt-5">{{ languageText.explanation }}</p>
						<form>
							<input v-model="licensePlate" class="form-control mt-4 text-center" v-maska="'AAA-####'" type="text" :placeholder="languageText.licensePlate">
							<b-form-datepicker
								v-bind="languageText.calendar"
								:locale="languageText.languageCalendar"
								menu-class="w-100"
								calendar-width="100%"
								class="mt-3 text-monospace text-center"
								size="sm"
								v-model="date"
							/>
							<button type="button" class="form-control btn btn-outline-primary mt-3" @click="check">{{ languageText.submitButton }}</button>
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
import licenseValidation from '../utils/licenseValidation'
import { maska } from 'maska'

export default {
	directives: {
		maska
	},
	data () {
		return {
			language: 'spanish',
			licensePlate: '',
			date: ''
		}
	},
	computed: {
		languageText () {
			return this.language === 'spanish' ? spanishText : englishText
		}
	},
	methods: {
		changeLanguage () {
			if (this.language === 'spanish') {
				this.language = 'english'
			} else {
				this.language = 'spanish'
			}
		},
		validateLicensePlate () {
			if (licenseValidation.validStarts.includes(this.licensePlate.charAt(0))) {
				return true
			}
			return false
		},
		getInvalidDigits (day) {
			if (day === 0 || day === 6) {
				return false
			}
			return licenseValidation.invalidDays[day]
		},
		check () {
			console.log(this.licensePlate)
			console.log(this.validateLicensePlate())
			console.log(this.date)
			const date = new Date(this.date)
			date.setDate(date.getDate() + 1)
			console.log('Date: ', date)
			const invalidDigits = this.getInvalidDigits(date.getDay())
			console.log('Invalid digits: ', invalidDigits)
			if (invalidDigits !== false) {
				if (invalidDigits.includes(this.licensePlate.charAt(7))) {
					this.$bvModal.msgBoxOk(this.languageText.cantDriveMessage)
					console.log('NO PUEDE MANEJAR')
				} else {
					this.$bvModal.msgBoxOk(this.languageText.canDriveMessage)
				}
			} else {
				this.$bvModal.msgBoxOk('There are no restrictions on weekends')
			}
			console.log('Checking')
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
