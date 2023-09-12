async function findAsync<T>(arr:T[], asyncCallback:(x:T)=>Promise<boolean>) {
  const promises = arr.map(asyncCallback)
  const results = await Promise.all(promises)
  const index = results.findIndex(result => result)
  return arr[index]
}

export default findAsync