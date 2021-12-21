const cassandra = require("cassandra-driver");
const client = new cassandra.Client
({
    contactPoints: process.env.DSE_CONTACT_POINTS,
    keyspace: process.env.DSE_KEYSPACE,
    localDataCenter: process.env.DSE_LOCAL_DATA_CENTER
});

export const searchCountries = async (searchString) => {
    var cql_query = 'select country_id, name from country where solr_query=\'name:' + searchString + '*\'';
    const countries = await client.execute(cql_query);
    return countries;
}

export const searchPlayers = async(searchString) => {
    var cql_query = 'select player_id, name from player where solr_query=\'name:*' + searchString + '*\'';
    const players = await client.execute(cql_query);
    return players;
}

export const getCountryById = async(countryId) => {

    var cql_query = 'select country_id, name from country where country_id = ? limit 1';
    const country = await client.execute(cql_query, countryId);
    return country;
}

export const getPlayerById = async(playerId) => {
    var cql_query = 'select name, player_id from player where player_id = ? limit 1';
    var params = [];
    params.push(playerId);
    const player = await client.execute(cql_query, params, { prepare: true });
    return player;
}