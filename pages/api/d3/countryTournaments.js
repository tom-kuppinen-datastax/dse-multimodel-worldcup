import {getCountyTournamnents} from "../../../lib/graphQuery";

export default async function handler(req, res) {
    var countryId = req.query['cid'];
    const tournaments = await getCountyTournamnents(countryId);

    var resp;
    var nodes = [];
    var edges = [];
    var x = 1;
    tournaments[0].vertices.forEach(function(v) {
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
    );
    resp = {"nodes" : nodes, "links": edges};
    res.status = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(resp);
    res.end();
}