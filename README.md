# Multi-Model Graph Database demo

##Overview
The purpose of this demo is to show the multi-model capabilities of [DataStax Enterprise](https://www.datastax.com/resources/datasheet/datastax-enterprise). 
This application uses graph and search functionality in the same schema.  

##Data
The data used in this demo is largely from 538, source [GitHub](https://github.com/fivethirtyeight/data/tree/master/world-cup-comparisons).  Application uses graph to explore relationships between players/countries and the World Cup tournaments in which they've participated.     


##Prequisites

1. Install DSE single-node instance, options and instructions can be found on the DataStax [website](https://docs.datastax.com/en/install/6.8/install/installTOC.html).  Highly recommend using a container install method such as [docker](https://hub.docker.com/r/datastax/dse-server/).  
2. (*Optional*) Install [DataStax studio](https://www.datastax.com/dev/datastax-studio) for running CQL and grelmin queries.  Also available on [docker](https://hub.docker.com/r/datastax/dse-studio/).
3. (*Optional*) To use the web UI pieces of this repo, the following components are required:
   1. [Node.js](https://nodejs.org/en/)
   2. [Next.js](https://nextjs.org/docs)
   3. [DataStax node.js driver](https://docs.datastax.com/en/developer/nodejs-driver/4.6/)

##Load Data
Within the data directory there are data files you can use to load the graph schema.  The goal of this data is provide a comparison of performances in World Cup play since 1966 and was created by the team at 538.  Original source can be found within their [github repository](https://github.com/fivethirtyeight/data/blob/master/world-cup-comparisons/README.md).  

To load data, strongly recommend using the [dsbulk tool] (https://docs.datastax.com/en/dsbulk/doc/dsbulk/dsbulkRef.html).  In terms of order, as long as the player, country, and tournament tables are loaded first there will be no issues.



