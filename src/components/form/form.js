/**
 * Imports
 */

import serialize from '@f/serialize-form'
import identity from '@f/identity'
import element from 'vdux/element'

/**
 * Constants
 */

const defaultValidate = () => ({valid: true})

/**
 * Form component
 */

function render ({props, children}) {
  const {onSubmit, validate = defaultValidate, cast = identity, loading = false} = props

  return (
    <form no-validate onSubmit={handleSubmit} onChange={handleChange}>
      {children}
    </form>
  )

  function handleSubmit (e) {
    e.preventDefault()

    const form = e.target
    const valid = checkValidity(form)

    if (!loading && valid) {
      const model = cast(serialize(form))
      return onSubmit(model, (res, err) => err && invalidate(form, err))
    }
  }

  function handleChange (e) {
    const {name, form} = e.target
    checkValidity(form, name)
  }

  function checkValidity (form, name) {
    const model = cast(serialize(form))
    const {valid, errors} = validate(model, name)

    if (!valid) {
      invalidate(form, errors, name)
    }

    return valid
  }

  function invalidate (form, errors, name) {
    if (name) {
      errors = errors.filter(({field}) => field === name)
    }

    errors.forEach(({field, message}) => {
      const ctrl = form.querySelector(`[name="${field}"]`)

      if (ctrl) {
        ctrl.setCustomValidity(message)
        ctrl.checkValidity()
      }
    })
  }
}

/**
 * Exports
 */

export default {
  render
}
