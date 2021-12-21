

const graph = require('cassandra-driver');
const dseGraph = require('cassandra-driver-graph');
const client = new graph.Client
({
    contactPoints: process.env.DSE_CONTACT_POINTS,
    localDataCenter: process.env.DSE_LOCAL_DATA_CENTER,
    keyspace: process.env.DSE_KEYSPACE,
    profiles: [
        new graph.ExecutionProfile('default', { graphOptions: { name: process.env.DSE_KEYSPACE, results: 'graphson-3.0' }}),
        ,
        dseGraph.createExecutionProfile('explicit-exec', { graphOptions:  { name: process.env.DSE_KEYSPACE, results: 'graphson-3.0' } } )
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


