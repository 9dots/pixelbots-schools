/**
 * Imports
 */

import {Button} from 'vdux-containers'
import {Block, Text} from 'vdux-ui'
import element from 'vdux/element'

/**
 * Render
 */

function render({props}) {
  const {questions, count, isStudent} = props
  const canTurnIn = count === questions.length
  return (
    <Block>
      <Block hide={!isStudent}>
        <Button wide bgColor='grey_medium' relative p={0} overflow='hidden' disabled hide={canTurnIn}>
          <Block
            w={count / questions.length * 100 + '%'}
            absolute={{top: 0, left: 0}}
            transition='width .6s ease'
            bg='blue'
            tall/>
          <Text relative z='2'>Progress: {count} of {questions.length}</Text>
        </Button>
        <Button wide hide={!canTurnIn}>
          Turn In
        </Button>
      </Block>
      <Block align='start space-between' hide={isStudent}>
        <Button flex>
          Return
        </Button>
        <Button
          ml
          icon='more_vert'
          bgColor='white'
          activeProps={{bgColor: 'rgba(black, .1)'}}
          circle='32'
          color='text'
          fs='m' />
      </Block>
    </Block>
  )
}

/**
 * Export
 */

export default {
  render
}