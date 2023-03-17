export function shortHash(hash) {
  return `${hash.substr(0,4)}...${hash.substr(-4)}`
}
