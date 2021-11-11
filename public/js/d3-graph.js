
// helper functions for d3 visualization library, future efforts will include allowing for multiple graph vis on a
// single page

window.onload = function(){ initGraph() }
function initGraph() {
    var svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");

    var color = d3.scaleOrdinal(d3.schemeCategory20);

    var simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function(d) { return d.id; }).distance(150))
        .force("charge", d3.forceManyBody().strength(-40))
        .force("center", d3.forceCenter(width / 2, height / 2));

    var graphType = d3.select('svg')._groups[0][0].dataset.graphType;

    var dataUrl = '';
    switch (graphType) {
        case 'country-tournament':
            var countryId = d3.select('svg')._groups[0][0].dataset.countryId;
            dataUrl = `/api/d3/countryTournaments?cid=${countryId}`;
            break;
        case 'player-tournament':
            var playerId = d3.select('svg')._groups[0][0].dataset.playerId;
            dataUrl = `/api/d3/playerTournaments?pid=${playerId}`;
            break;
        default:
            break;

    }


    d3.json(dataUrl, function (error, graph) {
        if (error) throw error;
        //console.log(graph);
        var link = svg.append("g")
            .attr("class", "links")
            .selectAll("path")
            .data(graph.links)
            .enter().append("path")
            .attr("id",function(d,i) { return "linkId_" + i; })
            .attr("class", "link")
            .attr("stroke-width1", function (d) {
                return Math.sqrt(d.value);
            });


        var labelText = svg.selectAll(".labelText")
            .data(graph.links)
            .enter().append("text")
            .attr("class","labelText")
            .attr("x",50)
            .attr("y",-20)
            .style("fill","red")
            .style("font-size", "13px")
            .append("textPath")
            .attr("xlink:href",function(d,i) { return "#linkId_" + i;})
            .text(function(d,i) { return d.label;});


        var node = svg.append("g")
            .attr("class", "nodes")
            .selectAll("g")
            .data(graph.nodes)
            .enter().append("g")

        var circles = node.append("circle")
            .attr("r", 20)
            .attr("fill", function (d) {
                return color(d.group);
            });

        // Create a drag handler and append it to the node object instead
        var drag_handler = d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);

        drag_handler(node);

        var lables = node.append("text")
            .text(function (d) {
                return d.id;
            })
            .attr('x', 6)
            .attr('y', 3);

        node.append("title")
            .text(function (d) {
                //console.log(d.id);
                return d.id;
            });

        simulation
            .nodes(graph.nodes)
            .on("tick", ticked);

        simulation.force("link")
            .links(graph.links);

        function ticked() {
            /*link
                .attr("x1", function (d) {
                    return d.source.x;
                })
                .attr("y1", function (d) {
                    return d.source.y;
                })
                .attr("x2", function (d) {
                    return d.target.x;
                })
                .attr("y2", function (d) {
                    return d.target.y;
                });*/
            link.attr("d", function(d) {
                var dx = d.target.x - d.source.x,
                    dy = d.target.y - d.source.y,
                    dr = 0;//75/d.linknum;  //linknum is defined above
                return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
            });
            node
                .attr("transform", function (d) {
                    return "translate(" + d.x + "," + d.y + ")";
                })
        }
    });
    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(1.0).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
}
