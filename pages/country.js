import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

//https://bl.ocks.org/heybignick/3faf257bbbbc7743bb72310d03b86ee8
// http://jsfiddle.net/bc4um7pc/


export default function Home({countryId}) {

    return (
        <div className={styles.container}>
            <Head>
                <title>Country Detail</title>
                <meta name="description" content="Country Tournament Particpation" />
                <link rel="stylesheet" href="/d3.css"/>
                <script src="https://d3js.org/d3.v4.min.js"></script>
                <script type="text/javascript" src='/js/d3-graph.js'></script>

            </Head>

            <main className={styles.main}>


                <div className={styles.grid}>
                    <svg className="d3Svg" width="960" height="600" data-graph-type="country-tournament" data-country-id={countryId}></svg>
                </div>

            </main>


        </div>
    )
}
export async function getServerSideProps({ preview = false , query}) {
    var countryId = query.cid;

    //const countryTournaments =- getCountyTournamnents(countryId);
    return {
        props: { countryId }
    };
}
/*

}*/