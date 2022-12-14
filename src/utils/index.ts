export function getArrayRandom(array: any[] = [], num: number = 1, repeat: boolean = false) {
  if(!Array.isArray(array)) return []
  if(num > array.length && !repeat) return array
  const randomNumArray: number[] = []
  for(let i = 0; i < num; i ++) {
    let intRandom = getIntRandom(array.length)
    if(randomNumArray.includes(intRandom) && !repeat) {
      i --
    }else {
      randomNumArray.push(intRandom)
    }
  }
  return randomNumArray.map(v => array[v])
}

export function getIntRandom(range: number | [number, number]) {
  if(typeof range === 'number') {
    return Math.floor(Math.random() * Math.floor(range))
  }
  if(Array.isArray(range) && typeof range[0] === 'number' && typeof range[1] === 'number') {
    let diff = Math.floor(range[1] - range[0])
    return Math.floor(Math.random() * diff) + diff
  }
  return 0
}