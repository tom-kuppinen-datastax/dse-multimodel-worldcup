// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {searchPlayers} from "../../lib/cqlQuery";
import {searchCountries} from "../../lib/cqlQuery";


export default async function handler(req, res) {
    const searchString = req.query['term'];
    const searchType = req.query['q'].toLowerCase();

    if (searchString != null) {


        var result = [];
        var cql_query = '';
        if (searchType == 'country') {

            const countries = await searchCountries(searchString);


            countries.rows.forEach(row => {
                    result.push({label: row['name'], value: row['country_id']});
                }
            );
        }
        if (searchType == 'player') {

            const players = await searchPlayers(searchString)


            players.rows.forEach(row => {
                    result.push({label: row['name'], value: row['player_id']});
                }
            );
        }

        res.status = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
        res.end();
    } else {
        res.status(200).json({status: 'Please pass a "term" param to perform a search'})

    }

}