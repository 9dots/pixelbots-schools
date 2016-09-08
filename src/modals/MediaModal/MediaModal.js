/**
 * Imports
 */

import {Modal, ModalFooter, Block, Base} from 'vdux-ui'
import BlockInput from 'components/BlockInput'
import FileUpload from 'components/FileUpload'
import DropZone from 'components/DropZone'
import {closeModal} from 'reducer/modal'
import {Button} from 'vdux-containers'
import element from 'vdux/element'
import summon from 'vdux-summon'
import Form from 'vdux-form'

/**
 * <MediaModal/>
 */

function render ({props}) {
  const {type, onAccept, scrapeMedia, scraping = {}} = props
  const uploadable = type === 'document' || type === 'image' || type === 'file'

  return (
    <Modal onDismiss={closeModal} w='col_xl'>
      <Block color='blue' p boxShadow='z1' capitalize textAlign='center' fs='m' lighter>
        Add {type}
      </Block>
      <Block p='l' h={275} align='stretch'>
        {
           uploadable
            ? <FileUpload onDrop={onDrop} onUpload={done} message={<Upload loading={scraping.loading} {...props} onSubmit={done} />} align='center center' wide {...props} />
            : <ScrapeFile {...props} loading={scraping.loading} onSubmit={done} />
        }
      </Block>
      <ModalFooter mt={0} bg='grey'>
        <Button bgColor='white' color='text' hoverProps={{highlight: 0.03}} focusProps={{highlight: 0.03}} onClick={closeModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )

  function * done ({name, url}) {
    const object = yield scrapeMedia(url)
    yield closeModal()
    yield onAccept({
      ...object,
      originalFilename: name,
      originalContent: url
    })
  }

  function onDrop (e) {
    if (e._rawEvent.dataTransfer.types.indexOf('text/uri-list') !== -1) {
      e.preventDefault()

      const url = e._rawEvent.dataTransfer.getData('text/uri-list')
      return done(url)
    }
  }
}

function ScrapeFile({props}) {

  return (
    <Block column align='center center' wide>
      <Block mb='l' fs='s' lighter>
        Paste your link below.
      </Block>
      <MediaInput mb={40} {...props}/>
    </Block>
  )
}

function Upload ({props}) {
  const {onUpload} = props

  return (
    <Block flex textAlign='center'>
      Drag File or Click Here
      <Block mb='xl' fs='xs' fw='normal' mt>
        or paste a URL below
      </Block>
      <MediaInput relative z={1} {...props} mx='auto' />
    </Block>
  )
}

function MediaInput ({props}) {
  const {placeholder, loading, onSubmit, ...rest} = props

  return (
    <Form align='start stretch' onClick={e => e.stopPropagation()} w='60%' onSubmit={onSubmit} {...rest}>
      <BlockInput
        placeholder={placeholder || 'Enter a url...'}
        borderRightWidth={0}
        inputProps={{py: 8}}
        name='url'
        autofocus
        lighter
        fs='s'
        mb={0}/>
      <Button borderRadius='0' type='submit' busy={loading} >
        Submit
      </Button>
    </Form>
  )
}


/**
 * Exports
 */

export default summon(() => ({
  scrapeMedia: url => ({
    scraping: {
      method: 'PUT',
      url: '/share/scrape/',
      body: {url}
    }
  })
}))({
  render
})
