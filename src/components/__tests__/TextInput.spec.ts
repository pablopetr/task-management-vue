import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TextInput from '@/components/input/TextInput.vue'

describe('Component TextInput', () => {
  it('renders properly with given props', () => {
    const wrapper = mount(TextInput, {
      props: {
        id: 'test',
        name: 'test',
        label: 'Test',
        type: 'text',
        modelValue: 'initial value',
        placeholder: 'Enter text',
        description: 'This is a description',
        errors: {}
      }
    })
    expect(wrapper.find('label').text()).toBe('Test')
    expect(wrapper.find('input').element.value).toBe('initial value')
    expect(wrapper.find('input').attributes('placeholder')).toBe('Enter text')
    expect(wrapper.find('p').text()).toBe('This is a description')
  })

  it('updates the input value when modelValue prop changes', async () => {
    const wrapper = mount(TextInput, {
      props: {
        id: 'test',
        name: 'test',
        label: 'Test',
        type: 'text',
        modelValue: 'initial value',
        errors: {}
      }
    })
    await wrapper.setProps({ modelValue: 'new value' })
    expect(wrapper.find('input').element.value).toBe('new value')
  })

  it('displays error message when there is an error', () => {
    const wrapper = mount(TextInput, {
      props: {
        id: 'test',
        name: 'test',
        label: 'Test',
        type: 'text',
        modelValue: '',
        errors: { errors: { test: ['This field is required'] } }
      }
    })

    expect(wrapper.find('p').text()).toBe('This field is required')
  })
})
