/**
 * Imports
 */

import {component, element} from 'vdux'
import {Input} from 'vdux-containers'

/**
 * <RoundedInput/>
 */

export default component({
  render ({props}) {
    return (
      <Input
        cursor='text'
        fs='xs'
        border='1px solid rgba(75, 82, 87, 0.15)'
        pill={true}
        px='20'
        py='10'
        boxShadow='0 0'
        background='#FFF'
        color='#777'
        focusProps={{border: '1px solid rgba(37, 168, 224, 0.35)'}}
        activeProps={{border: '1px solid rgba(37, 168, 224, 0.35)'}}
        {...props}
        inputProps={{
          borderWidth: '0px',
          background: 'transparent',
          textAlign: 'center',
          ...(props.inputProps || {})
        }}/>
    )
  }
})
