/**
 * Imports
 */

import {Flex, Card, Text} from 'vdux-ui'
import {Block, Tooltip} from 'vdux-containers'
import element from 'vdux/element'
import Color from 'color'
import * as colors from 'lib/colors'
import map from '@f/map'

/**
 * Render
 */

function render({props}) {
  const {data} = props
  const {
    totalPoints, averagePoints, averagePercent,
    numStudents, numReturned, bins, binMax
  } = data

  const step = Math.ceil(binMax / 4)
  let lineMax = (binMax / step + 1) * step || 0
  const lines = []

  for(var i = 0; i <= lineMax; i++) {
    if(!(i % step))
      lines.push(i)
  }

  lineMax = lines[lines.length-1]


  return (
    <Flex pt>
      <Card flex h={120} relative>
        <Block transform='rotate(-90deg)' absolute top bottom lh='0px' lighter>
          Students
        </Block>
        {
          map((line, i) => <Line binMax={lineMax} i={i} line={line} />, lines)
        }
        {
          map((bin, i) => <Bar bin={bin} binMax={lineMax} i={i} />, bins)
        }
      </Card>
      <Card ui={Flex} lighter column ml w={138} h={120} p align='space-between'>
        <Block fs='m' mb='s'>
          Total
        </Block>
        <Block align='space-between'>
          Students:
          <Block>
            {numReturned} / {numStudents}
          </Block>
        </Block>
        <Block align='space-between'>
          Score:
          <Block>
            {averagePoints} / {totalPoints}
          </Block>
        </Block>
        <Block align='space-between'>
          Percent:
          <Block>
            {averagePercent}
          </Block>
        </Block>
      </Card>
    </Flex>
  )
}

function Line({props}) {
  const {i, binMax, line} = props
  return (
    <Block
      borderBottom='1px solid #F2F2F2'
      absolute
      wide
      bottom={(line / (binMax)) * 100 + '%'}
      >
      <Block
        right='100%'
        absolute
        lh='0px'
        fs='xxs'
        color='grey_medium'
        mr>
        {line}
        </Block>
    </Block>
  )
}

function Bar({props}) {
  const {bin, binMax, i} = props
  const colorStyles = indexToColor(i)
  const hideStyles = bin.length ? {} : {borderWidth: '0px'}

  return (
      <Block
        tooltipProps={{whiteSpace: 'pre', lh: 1.4}}
        immediate
        message={tooltipText(bin)}
        placement='right'
        ui={Tooltip}
        h={(bin.length / (binMax)) * 100 + '%'}
        left={(i * 10) + '%'}
        {...colorStyles}
        {...hideStyles}
        absolute
        ml='.5%'
        bottom
        w='9%'>
        <Block
          color='grey_medium'
          textAlign='center'
          top='100%'
          absolute
          fs='xxs'
          mt='s'
          wide>
          {i * 10}
          <Text hide={i == 9}> - {(i + 1) * 10}</Text>%
          <Text hide={i != 9}> +</Text>
        </Block>
      </Block>
  )
}

function tooltipText(bin) {
  const text = bin.map(student => {
    const {displayName, percent} = student
    return `${displayName}: ${percent}`
  })
  return text.join('\n')
}

function indexToColor(i) {
  let {red} = colors
  red = Color(red)
  const blue = Color('#3EC1FA')
  const c1 = red.clone().saturate(.9).lighten((i * 5) / 100)
  const c2 = blue.clone().lighten(((10 - i) * 4) / 100)
  const mix = c1.clone().mix(c2, .5).saturate(.8)
  const border = mix.clone().darken(.1)

  return {
    border: `2px solid ${border.rgbString()}`,
    borderBottomWidth: 0,
    bgColor: mix.rgbString(),
    hoverProps: {
      bgColor: mix.clone().lighten(.04).rgbString(),
      borderColor: mix.clone().darken(.06).rgbString()
    }
  }
}

/**
 * Exports
 */

export default {
  render
}
