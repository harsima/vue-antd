import { basicRouter } from './basicRouter'

const whiteList = basicRouter.map(item => {
  if (item.path !== '/' || item.path !== '*') {
    return item.path
  }
})

export default whiteList
