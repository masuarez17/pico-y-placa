<template>
	<div class="container-fluid background mt-5 flex-fill">
		<div class="row justify-content-center">
			<div class="card max-vw-50 shadow p-4">
				<div class="container mb-3">
					<div class="row justify-content-start" @click="changeLanguage">
						<div class="col-2 col-sm-2 col-xs-12 justify-content-start">
							<br/>
							<img v-if="language === 'spanish'" class="esflag" alt="Flag" src="../assets/spanish.png">
							<img v-else alt="Flag" class="enflag" src="../assets/english.png">
							<span class="text-align-centertext-muted mt-4 d-inline">{{ languageText.languageName }}</span>
						</div>
						<div class="col-12"></div>
					</div>
				</div>
				<div class="card-body mt-n3">
					<form>
						<h1>Pico y placa </h1>
						<p class="text-muted mt-5">{{ languageText.explanation }}</p>
						<form>
							<b-form-input
								v-model="licensePlate"
								id="licensePlate"
								class="form-control mt-4 text-monospace text-center"
								v-maska="'AAA-####'"
								:state="isValidLicense"
								:placeholder="languageText.licensePlate"
								@blur="validateLicense"
							/>
							<b-form-datepicker
								v-model="date"
								id="date"
								v-bind="languageText.calendar"
								:locale="languageText.languageCalendar"
								menu-class="w-100"
								:state="isValidDate"
								calendar-width="100%"
								class="mt-3 text-monospace text-center"
								size="sm"
								required
							/>
							<button id="submit" type="button" class="form-control btn btn-outline-primary mt-3" @click="check">{{ languageText.submitButton }}</button>
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
			date: '',
			isValidLicense: null,
			isValidDate: null,
			hasRestriction: false
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
		validateLicense () {
			this.isValidLicense = null
			if (!this.licensePlate) {
				this.isValidLicense = false
				this.$bvModal.msgBoxOk(this.languageText.required)
				return false
			}
			if (!this.validateLicensePlate()) {
				this.isValidLicense = false
				this.$bvModal.msgBoxOk(this.languageText.invalidLicense)
				return false
			}
			return true
		},
		validateDate () {
			this.isValidDate = null
			if (!this.date) {
				this.isValidDate = false
				this.$bvModal.msgBoxOk(this.languageText.invalidDate)
				return false
			}
			return true
		},
		getInvalidDigits (day) {
			if (day === 0 || day === 6) {
				return false
			}
			return licenseValidation.invalidDays[day]
		},
		validateForm () {
			if (!this.validateLicense()) {
				return false
			}
			if (!this.validateDate()) {
				return false
			}
			return true
		},
		check () {
			if (!this.validateForm()) {
				return
			}
			console.log(this.date)
			const date = new Date(this.date)
			date.setDate(date.getDate() + 1)
			const invalidDigits = this.getInvalidDigits(date.getDay())
			if (invalidDigits !== false) {
				if (invalidDigits.includes(this.licensePlate.charAt(7))) {
					this.$bvModal.msgBoxOk(this.languageText.cantDriveMessage)
					this.hasRestriction = true
				} else {
					this.$bvModal.msgBoxOk(this.languageText.canDriveMessage)
					this.hasRestriction = false
				}
			} else {
				this.$bvModal.msgBoxOk(this.languageText.weekends)
				this.hasRestriction = false
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
.licenseplate {
	height: 10vh;
}
</style>
