export const parseNameAlias = (s:string) => {
  const withAliasPattern = /^([^ ]*) "([^"]+)" (.*)$/
  const re = withAliasPattern.exec(s)
  let name:string, alias:string|undefined
  if (re != null) {
    name = `${re[1]} ${re[3]}`
    alias = re[2]
  } else {
    name = s
    alias = undefined
  }
  return {name, alias}
}

export const formatNameAlias = (name:string, alias?:string) => {
  if (!alias) return name
  const parts = name.split(' ')
  const rest = parts.slice(1).join(' ')
  const value = alias ? `${parts[0]} "${alias}" ${rest}` : name
  return value
}