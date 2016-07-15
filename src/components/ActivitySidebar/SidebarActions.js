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
        <Button wide bgColor='grey_medium' relative p={0} overflow='hidden' disabled hide={canTurnIn} h={32}>
          <Block
            w={count / questions.length * 100 + '%'}
            absolute={{top: 0, left: 0}}
            transition='width .6s ease'
            bg='blue'
            tall/>
          <Text relative z='2'>Progress: {count} of {questions.length}</Text>
        </Button>
        <Button wide hide={!canTurnIn} h={32}>
          Turn In
        </Button>
      </Block>
      <Block align='start space-between' hide={isStudent}>
        <Button flex>
          Return
        </Button>
        <Btn />
      </Block>
    </Block>
  )
}

function Btn() {
  return (
    <Button
      activeProps={{bgColor: 'rgba(black, .1)'}}
      icon='more_vert'
      bgColor='white'
      color='text'
      circle='32'
      fs='m'
      ml />
  )
}

/**
 * Export
 */

export default {
  render
}