# Crokinole Tourney

A web application to manage a crokinole tournament.

Manage your own crokinole tournament [here](https://argylesock.github.io/crokinole-tourney/).

It features a two-stage tournament that consists of an initial [swiss-system tournament][1]
that gives everyone a chance to play at least N games, followed by a [single-elimination][2]
stage amongst the top N ranked players.

[1]: https://en.wikipedia.org/wiki/Swiss-system_tournament
[2]: https://en.wikipedia.org/wiki/Single-elimination_tournament

At the [Denver Cronkinole Club][3], we've found this approach works well for 20 players. The initial
stage consists of 4 competition rounds and lasts about 2 1/2 hours followed by
a stage of 3 elimnation rounds, starting with 8 players, that lasts about 1 1/2 hours.

[3]: https://www.denvercrokinoleclub.com/

During the swiss stage:
  - In the first round, competitors are paired randomly
  - For each subsequent round, competitors are sorted according to their cumulative
    scores and are assigned opponents with the same or similar score up to that point.
  - No two players ever oppose each other twice.

During the elimination stage:
  - Standard seeding pairs the highest and lowest, then second highest and second lowest and so on
  - An option for "random knockout" will pair opponents randomly.


---
## TODO

1. Add ability to pair players into teams for a double's tournament

---
In order to reduce costs of hosting this web application to ***zero***,
this application is meant to be run entirely within a browser, requiring no
server-side database.

Hosting the application itself can be accomplished with no cost using [Github Pages][10].

[10]: https://pages.github.com/

The database will be cached locally using localstorage in the browser.

This architecture decision means that only a single browser instance will have
access to the data. See [Developer Notes][docs/develoepr-notes.md] for options
to consider for expanding the application to allow 'client' access in the future.

The intention is that this will be hosted using Github Pages, a free option for
open-source projects.