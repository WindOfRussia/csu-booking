import {beforeEach, expect, jest, test} from "@jest/globals";

jest.mock('laravel-jetstream')

import {createLocalVue, mount, shallowMount} from '@vue/test-utils'
import {InertiaApp} from '@inertiajs/inertia-vue'
import {InertiaForm} from 'laravel-jetstream'
import Component from '@src/Jetstream/Checkbox'

let localVue

beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(InertiaApp)
    localVue.use(InertiaForm)

});

test('should mount without crashing', () => {
    const wrapper = shallowMount(Component, {localVue});

    expect(wrapper.text()).toBeDefined();
})

test('verify computed proxy field', (done) => {
    const wrapper = shallowMount(Component, {localVue});

    wrapper.vm.proxyChecked = true;

    wrapper.vm.$nextTick(() => {
        expect(wrapper.emitted().change).toBeTruthy();
        expect(wrapper.vm.proxyChecked).toBe(wrapper.vm.checked);
        done();
    })
})
