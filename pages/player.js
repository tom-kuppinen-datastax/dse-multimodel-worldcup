import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'




export default function Home({playerId}) {

    return (
        <div className={styles.container}>
            <Head>
                <title>Player Detail</title>
                <meta name="description" content="Player Detail" />
                <link rel="stylesheet" href="/d3.css"/>
                <script src="https://d3js.org/d3.v4.min.js"></script>
                <script type="text/javascript" src='/js/d3-graph.js'></script>

            </Head>

            <main className={styles.main}>


                <div className={styles.grid}>
                    <svg className="d3Svg" width="960" height="600" data-graph-type="player-tournament" data-player-id={playerId}></svg>
                </div>

            </main>


        </div>
    )
}
export async function getServerSideProps({ preview = false , query}) {
    var playerId = query.pid
    return {
        props: { playerId }
    };
}
/*

}*/