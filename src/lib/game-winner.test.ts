import { Game } from '@/db'
import { gameIsTie } from './game-winner'
describe('game-winner', ()=>{
  describe('gameIsTie', ()=>{
    it('should return false for twenties mismatch', ()=>{
      const g:Game = {
        stage: 'seed', round: 0, n: 0, p1id: undefined, p2id: undefined,
        p1twenties: 4,
        p2twenties: 2,
        gameRounds: [
          { p1points: 1, p2points: 1 },
          { p1points: 1, p2points: 1 },
          { p1points: 1, p2points: 1 },
          { p1points: 1, p2points: 1 },
        ],
      }
      expect(gameIsTie(g, 4)).toBe(false)
    })
    it('should return false for point mismatch', ()=>{
      const g:Game = {
        stage: 'seed', round: 0, n: 0, p1id: undefined, p2id: undefined,
        p1twenties: 4,
        p2twenties: 4,
        gameRounds: [
          { p1points: 0, p2points: 2 },
          { p1points: 0, p2points: 2 },
          { p1points: 0, p2points: 2 },
          { p1points: 0, p2points: 2 },
        ],
      }
      expect(gameIsTie(g, 4)).toBe(false)
    })
    it('should return true for fully scored tie', ()=>{
      const g:Game = {
        stage: 'seed', round: 0, n: 0, p1id: undefined, p2id: undefined,
        p1twenties: 4,
        p2twenties: 4,
        gameRounds: [
          { p1points: 0, p2points: 2 },
          { p1points: 0, p2points: 2 },
          { p1points: 2, p2points: 0 },
          { p1points: 2, p2points: 0 },
        ],
      }
      expect(gameIsTie(g, 4)).toBe(true)
    })
    it('should return false for incomplete game', ()=>{
      const g:Game = {
        stage: 'seed', round: 0, n: 0, p1id: undefined, p2id: undefined,
        p1twenties: 4,
        p2twenties: 4,
        gameRounds: [
          { p1points: 1, p2points: 1 },
          { p1points: 1, p2points: 1 },
          { p1points: 1, p2points: 1 },
          { p1points: 0, p2points: 0 },
        ],
      }
      expect(gameIsTie(g, 4)).toBe(false)
    })
  })
})