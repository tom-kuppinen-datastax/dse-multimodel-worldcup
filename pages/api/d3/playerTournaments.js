import {getPlayerTournaments} from "../../../lib/graphQuery";
import {getPlayerById} from "../../../lib/cqlQuery";
export default async function handler(req, res) {
    var playerId = req.query['pid'];
    const player = await getPlayerById(playerId);
    var playerName = player.rows[0]['name'];
    const tournaments = await getPlayerTournaments(playerId);

    var resp;
    var nodes = [];
    var edges = [];
    var x = 1;
    var countryId;
    var i = 1;
    tournaments.toArray().forEach( function (e) {
            if(!e.get('country_id')) {
                var id = e.get('name') + ' ' + e.get('year');
                nodes.push(
                    {"id": id, group: x}
                );
            }
            else {
                countryId = e.get('name').toString();
                nodes.push(
                    {"id": countryId, group: x}
                );
            }
            x++;
        }
    );
    nodes.forEach(function(n){
       if(n['id'] != countryId) {
           edges.push({
               "source": playerName,
               "target": n['id'],
               "value": i,
               "linknum": i,
               "label": 'played_in'
           });
           i++;
       }
    });
    // add player node
    nodes.push(
        {"id": playerName, group: x+1}
    );
    edges.push({
        "source": playerName,
        "target": countryId,
        "value": i+1,
        "linknum": i+1,
        "label": 'plays for'
        }
    );
    /*tournaments[0].vertices.forEach(function(v) {
            nodes.push(

                {"id" : v['@value']['id'], "group" : x}
            );
            x++;
        }
    );
    var i = 1;
    tournaments[0].edges.forEach(function(e) {
        edges.push(
            {
                "source" : e['@value']['outV'],
                "target": e['@value']['inV'],
                "value": i,
                "linknum" : i,
                "label" : e['@value']['label']
            }
        );
        i++;
        }
        //\\console.log(e)
    );*/
    resp = {"nodes" : nodes, "links": edges};
    res.status = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(resp);
    res.end();
}