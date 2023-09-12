```mermaid
erDiagram
  Player {
    id      number
    name    string
    present boolean
  }
  Game {
    stage      string
    round      number
    n          number
    p1id       number-undef
    p2id       number-undef
    p1points   number
    p2points   number
    p1twenties number
    p2twenties number
  }

  Player }|--o{ Game : ""
  Stage }|--o{ Game : ""

```