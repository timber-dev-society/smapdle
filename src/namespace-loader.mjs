import { URL, pathToFileURL } from 'url'

const baseURL = pathToFileURL(__dirname).href

export function resolve(specifier, context, defaultResolve) {
  const { parentURL = baseURL } = context;
  console.log(specifier, context, defaultResolve)

  // Normally Node.js would error on specifiers starting with 'https://', so
  // this hook intercepts them and converts them into absolute URLs to be
  // passed along to the later hooks below.
  if (specifier.startsWith('utils')) {
    return {
      url: new URL(specifier, parentURL).href
    };
  } 

  // Let Node.js handle all other specifiers.
  return defaultResolve(specifier, context, defaultResolve);
}
