import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {



  return (
    <div className={styles.container}>
      <Head>
        <title>DSE Graph & Search demo</title>
        <meta name="description" content="demo featuring advanced workload features built on DSE" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://datastax.com">DataStax graph demo</a>
        </h1>



        <div className={styles.grid}>
          <a href="/search" className={styles.card}>
            <h2>Search &rarr;</h2>
            <p>Find world cup participation by country or player</p>
          </a>


        </div>
      </main>


    </div>
  )
}
export async function getServerSideProps({ preview = false , query}) {


  return {

    props: {  }
  };
}