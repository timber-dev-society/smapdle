import { flashErrorMsg } from './flash'

export const buildGetSkin = (skins) => (skinId) => {
  if (skinId) {
    return skins[skinId - 1]
  }

  return skins
}


export const createMiddleware = ({ name, middleware }) => store => next => async (action) => {

  if (middleware.hasOwnProperty(action.type)) {
    try {
      await middleware[action.type]({ action, state: store.getState(), dispatch: store.dispatch })
    } catch (e) {
      flashErrorMsg(`Something wrong append ${name} middleware`, e)
    }
  }

  return next(action)
}
