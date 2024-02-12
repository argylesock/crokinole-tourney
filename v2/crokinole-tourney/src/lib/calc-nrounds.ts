  // optimal number of seed rounds for ranking n players
  export const calcSeedRounds = (nPresent:number)=>Math.ceil(Math.log2(nPresent))
  // between one and two thirds of players play in the elimination rounds
  export const calcElimRounds = (nPresent:number)=>Math.round(-0.25+Math.log2(nPresent/2))