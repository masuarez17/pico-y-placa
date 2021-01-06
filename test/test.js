/* eslint-disable no-undef */
import { createLocalVue, mount } from '@vue/test-utils'
import Card from '../src/components/Card.vue'
import { expect } from 'chai'
import { BootstrapVue } from 'bootstrap-vue'
import Maska from 'maska'
import LicenseValidation from '../src/utils/licenseValidation'

const localVue = createLocalVue()

localVue.use(Maska)
localVue.use(BootstrapVue)

const wrapper = mount(Card, {
	localVue
})

describe('Card.vue', function () {
	const licenseInput = wrapper.find('#licensePlate')

	it('Changing license plate input', (done) => {
		licenseInput.element.value = 'AWE-4122'
		licenseInput.trigger('input')
		expect(wrapper.vm.licensePlate).to.equal('AWE-4122')
		done()
	})

	it('Changing date input', (done) => {
		// Debido a un problema de compatibilidad con el datepicker de vue bootstrap y mocha, se asignara directamente el valor por vm
		// Due to a compatibility problem with the vue bootstrap datepicker and mocha, the value will be assigned directly by vm
		wrapper.vm.date = '2021-02-01'
		expect(wrapper.vm.date).to.equal('2021-02-01')
		done()
	})

	it('Restarting value of the license after testing', (done) => {
		restartLicense()
		expect(wrapper.vm.licensePlate).to.equal('')
		done()
	})

	it('Restarting value of the date after testing', (done) => {
		restartDate()
		expect(wrapper.vm.date).to.equal('')
		done()
	})

	it('Validate license field on empty submit', (done) => {
		submitForm()
		expect(wrapper.vm.isValidLicense).to.equal(false)
		done()
	})

	it('Validate date field on empty submit', (done) => {
		licenseInput.element.value = 'AWE-4122'
		licenseInput.trigger('input')
		submitForm()
		expect(wrapper.vm.isValidDate).to.equal(false)
		done()
	})

	checkDateRestriction('AWE-4122')
})

// General functions
function restartLicense () {
	wrapper.vm.licensePlate = ''
}

function restartDate () {
	wrapper.vm.date = ''
}

// Bootstrap warn its because of the modals shown after submit
function submitForm () {
	wrapper.find('#submit').trigger('click')
}
// License plate testing function
function checkDateRestriction (license) {
	wrapper.vm.licensePlate = license
	const days = getRestriction()
	it('Checking restriction on monday', (done) => {
		wrapper.vm.date = '2021-01-04'
		submitForm()
		console.debug('\tExpected: ', days[1])
		console.debug('\tResult: ', wrapper.vm.hasRestriction)
		expect(wrapper.vm.hasRestriction).to.equal(days[1])
		done()
	})
	it('Checking restriction on tuesday', (done) => {
		wrapper.vm.date = '2021-01-05'
		submitForm()
		console.debug('\tExpected: ', days[2])
		console.debug('\tResult: ', wrapper.vm.hasRestriction)
		expect(wrapper.vm.hasRestriction).to.equal(days[2])
		done()
	})
	it('Checking restriction on wednesday', (done) => {
		wrapper.vm.date = '2021-01-06'
		submitForm()
		console.debug('\tExpected: ', days[3])
		console.debug('\tResult: ', wrapper.vm.hasRestriction)
		expect(wrapper.vm.hasRestriction).to.equal(days[3])
		done()
	})
	it('Checking restriction on thursday', (done) => {
		wrapper.vm.date = '2021-01-07'
		submitForm()
		console.debug('\tExpected: ', days[4])
		console.debug('\tResult: ', wrapper.vm.hasRestriction)
		expect(wrapper.vm.hasRestriction).to.equal(days[4])
		done()
	})
	it('Checking restriction on friday', (done) => {
		wrapper.vm.date = '2021-01-08'
		submitForm()
		console.debug('\tExpected: ', days[5])
		console.debug('\tResult: ', wrapper.vm.hasRestriction)
		expect(wrapper.vm.hasRestriction).to.equal(days[5])
		done()
	})
	it('Checking restriction on saturday', (done) => {
		wrapper.vm.date = '2021-01-09'
		submitForm()
		console.debug('\tExpected: ', days[6])
		console.debug('\tResult: ', wrapper.vm.hasRestriction)
		expect(wrapper.vm.hasRestriction).to.equal(days[6])
		done()
	})
	it('Checking restriction on sunday', (done) => {
		wrapper.vm.date = '2021-01-03'
		submitForm()
		console.debug('\tExpected: ', days[0])
		console.debug('\tResult: ', wrapper.vm.hasRestriction)
		expect(wrapper.vm.hasRestriction).to.equal(days[0])
		done()
	})
}

function getRestriction () {
	const days = []
	LicenseValidation.invalidDays.forEach(day => {
		days.push(day.includes(wrapper.vm.licensePlate.charAt(7)))
	})
	return days
}
