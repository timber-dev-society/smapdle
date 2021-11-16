import { buildGetSkin } from '../../utils/app-func'
import { GiHand, GiAk47U, GiLeeEnfield, GiSawedOffShotgun, GiWinchesterRifle, GiAspergillum, GiBarbedNails, GiBaseballBat, GiBowieKnife, GiBowArrow, GiBroadsword, GiBrokenBottle, GiChainsaw, GiClawHammer, GiColtM1911, GiCrowbar, GiFullMotorcycleHelmet } from 'react-icons/gi'

export const skins = [ '😡', '🙀','💩','👺','👹','😈','👿','🥶','🤢','🥸','🤡','😱','😨','🧔‍♀️','🧔','🧔‍♂️','👧','🧒','👵','🧓','👴','👦','👩','🧑','👨','👨‍🎤','👩‍🎤','🧑‍🎤','🧑‍🔧','👩‍🔧','👨‍🏭','🧑‍🏭','👩‍🏭','👷‍♂️','👷','👷‍♀️','👨‍🚒','🧑‍🚒','👩‍🚒','👮‍♂️','👮','👮‍♀️','🥷','🧙‍♀️','🧙','🧙‍♂️','🕵️‍♂️','🕵','🕵️‍♀️','😺','😾','🐶','🐱','🐭','🐹','🐰','🐼','🐨','🐯','🐮','🐷','🐸','🐵','🐔','🦊','🦝' ]
export const getSkin = buildGetSkin(skins)

export const weapons = [ GiHand, GiAk47U, GiLeeEnfield, GiWinchesterRifle, GiAspergillum, GiSawedOffShotgun, GiBarbedNails, GiBaseballBat, GiBowieKnife, GiBowArrow, GiBroadsword, GiBrokenBottle, GiChainsaw, GiClawHammer, GiColtM1911, GiCrowbar, GiFullMotorcycleHelmet ]
export const getWeapon = buildGetSkin(weapons)
