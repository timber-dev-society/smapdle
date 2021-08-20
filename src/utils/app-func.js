export const buildGetSkin = (skins) => (skinId) => {
  if (skinId) {
    return skins[skinId - 1]
  }

  return skins
}
