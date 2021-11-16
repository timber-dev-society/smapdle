import { buildGetSkin } from '../../utils/app-func'

export const skins = ['🧟', '🧟‍♂️', '🧟‍♀️', '🐺', '🐻', '🦁', '🎃','🤖','👽' ]
export const getSkin = buildGetSkin(skins)

export const getSpeed = skin => {
  switch (skin) {
    case 2:
    case 7:
      return 7.5
    case 3:
    case 9:
      return 10
    case 5:
      return 12.5
    case 4:
    case 6:
      return 15
    default:
      return 5   
  }
}
