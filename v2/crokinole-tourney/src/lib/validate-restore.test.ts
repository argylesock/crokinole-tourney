import validateRestore from "./validate-restore"

describe('validateRestore', ()=>{
  it('should validate players', ()=>{
    validateRestore({ players: [ { id: 1, name: 'John' } ] })
  })
  it('should not validate empty players', ()=>{
    expect(()=>validateRestore({ players: [] })).toThrow()
  })
  it('should not validate bad players', ()=>{
    expect(()=>validateRestore({ players: [ { name: 'John'} ] })).toThrow()
    expect(()=>validateRestore({ players: [ { id: 0 } ] })).toThrow()
    expect(()=>validateRestore({ players: [ 'string' ] })).toThrow()
  })
  it('should validate games', ()=>{
    validateRestore({
      players: [ { id: 1, name: 'Victor' }, { id: 2, name: 'Roger' } ],
      games: [
        { id: 10, stage: 'seed', round: 0, n: 0, p1id: 1, p2id: 2 },
        { id: 11, stage: 'seed', round: 1, n: 0, p1id: 1 }, // p2 is bye
        { id: 12, stage: 'seed', round: 2, n: 0, p2id: 1 }, // p1 is bye
      ]
    })
  })
  it('should validate games with no players', ()=>{
    expect(()=>validateRestore({
      players: [ { id: 1, name: 'Victor' }, {id: 2, name: 'Roger'} ],
      games: [ { id: 10, stage: 'seed', round: 0, n: 0 } ]
    })).toThrow()
  })
  it('should validate games with missing players', ()=>{
    expect(()=>validateRestore({
      players: [ { id: 1, name: 'Victor' }, {id: 2, name: 'Roger'} ],
      games: [ { id: 10, stage: 'seed', round: 0, n: 0, p1id: 3 } ]
    })).toThrow()
    expect(()=>validateRestore({
      players: [ { id: 1, name: 'Victor' }, {id: 2, name: 'Roger'} ],
      games: [ { id: 10, stage: 'seed', round: 0, n: 0, p2id: 4 } ]
    })).toThrow()
  })
})