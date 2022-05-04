const i18n = require('i18next')
const { dialog } = require('./dialog')
const { STATUS } = require('../daemon/consts')
const logger = require('../common/logger')
const handleError = require('../handleError')

module.exports = async function ({ startIpfs }) {
  logger.info('[ipfs-not-running] an action needs ipfs to be running')

  try {
    const option = await dialog({
      title: i18n.t('ipfsNotRunningDialog.title'),
      message: i18n.t('ipfsNotRunningDialog.message'),
      buttons: [
        i18n.t('start'),
        i18n.t('cancel')
      ]
    })

    if (option !== 0) {
      return false
    }
  } catch (err) {
    logger.error('Could not display ipfsNotRunningDialog dialog')
    handleError(err)
  }

  return (await startIpfs()) === STATUS.STARTING_FINISHED
}
