import { buildGetSkin } from 'utils/app-func'

const carSkins = ['🚗', '🚚']
const bikeSkins = ['🚲', '🛵', '🏍️']

export const skins = [...carSkins, ...bikeSkins]
export const getSkin = buildGetSkin(skins)

export const getSkinSize = (skin) => {
  if (skin > (carSkins.length + bikeSkins.length)) return 'big'
  if (skin > carSkins.length) return 'small'
  return ''
}
