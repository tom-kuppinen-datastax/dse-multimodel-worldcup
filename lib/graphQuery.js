

const graph = require('cassandra-driver');
const dseGraph = require('cassandra-driver-graph');
const client = new graph.Client
({
    contactPoints: ['ec2-52-90-126-1.compute-1.amazonaws.com'],
    localDataCenter: 'dc1',
    keyspace: 'WORLD_CUP',
    profiles: [
        new graph.ExecutionProfile('default', { graphOptions: { name: 'WORLD_CUP', results: 'graphson-3.0' }}),
        ,
        dseGraph.createExecutionProfile('explicit-exec', { graphOptions:  { name: 'WORLD_CUP', results: 'graphson-3.0' } } )
    ]


});

export const getCountyTournamnents = async (countryId) => {

    const g = dseGraph.traversalSource(client);
    const result = await g.V("dseg:/country/" + countryId).outE("participated", "hosted").subgraph('e').cap('e').toList();
    return result;
}

export const getPlayerTournaments = async (playerId) => {
    const g = dseGraph.traversalSource(client);
    //const result = await g.V("dseg:/player/" + playerId).bothE('plays_for', 'played_in').inV().valueMap();
    const query = dseGraph.queryFromTraversal(g.V("dseg:/player/" + playerId).bothE('plays_for', 'played_in').inV().valueMap());
    const result = await client.executeGraph(query, null, {executionProfile: 'explicit-exec'})

    return result;

}


