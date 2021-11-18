import { buildGetSkin } from 'utils/app-func'

export const skins = ['🚗', '🚚', '🚲', '🛵', '🏍️', '🛥️', '🚢', '⛵']
export const getSkin = buildGetSkin(skins)

export const getSkinSize = (skin) => {
  if (skin > 5) return 'big'
  if (skin > 2) return 'small'
  return ''
}
