// create graph
// TO DO: FIX SEARCH INDEX CREATION

CREATE KEYSPACE "WORLD_CUP" WITH replication = {'class': 'NetworkTopologyStrategy', 'dc1': '1'}  AND durable_writes = true AND graph_engine = 'Core';

// create vertex schema
// country vertex
schema.vertexLabel('country').
ifNotExists().
partitionBy('country_id', Text).
property('name', Text).
create()
// index
schema.vertexLabel('country').
searchIndex().
ifNotExists().
by('name').
create()

// tournament
schema.vertexLabel('tournament').
ifNotExists().
partitionBy('tournament_id', Text).
property('name', Text).
property('year', Int).
property('total_teams', Int).
property('total_matches', Int).
property('total_goals', Int).
property('avg_goals', Float).
create()
// index
schema.vertexLabel('tournament').
searchIndex().
ifNotExists().
by('name').
by('year').
create()

// player vertex
schema.vertexLabel('player').
ifNotExists().
partitionBy('player_id', Text).
property('name', Text).
create()
// index
schema.vertexLabel('player').
searchIndex().
ifNotExists().
by('name').
create()

// edge schema creation
schema.edgeLabel('hosted').
ifNotExists().
from('country').to('tournament').
create()

// edge schema creation
schema.edgeLabel('participated').
ifNotExists().
from('country').to('tournament').
property('finish_order', Int).
create()

// edge schema creation
schema.edgeLabel('plays_for').
ifNotExists().
from('player').to('country').
create()

schema.edgeLabel('played_in').
ifNotExists().
from('player').to('tournament').
property('goals_z', Float).
property('xg_z', Float).
property('xg_z', Float).
property('crosses_z', Float).
property('boxtouches_z', Float).
property('passes_z', Float).
property('progpasses_z', Float).
property('takeons_z', Float).
property('progruns_z', Float).
property('tackles_z', Float).
property('interceptions_z', Float).
property('clearances_z', Float).
property('blocks_z', Float).
property('aerials_z', Float).
property('fouls_z', Float).
property('fouled_z', Float).
property('nsxg_z', Float).
create()



