import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {

// leverages jquery for auto-complete search functionality

    return (
        <div className={styles.container}>
            <Head>
                <meta charSet="utf-8"/>
                    <title>Node js DSE Autocomplete Search</title>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.css"/>
                    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
                    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
                    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                          rel="stylesheet"/>
            </Head>

            <main className={styles.main}>
                <div className="dsp container">
                    <div className="row dsp">
                        <h2>Node js Autocomplete Search using DSE search</h2>
                    </div>
                    <div className="row dsp">

                        <h3>Search By Country</h3>
                        <input type="text" name="search-country" id="search-country" autoComplete="off"
                               placeholder="find any country..." class="form-control litanswer"/>

                    </div>
                    <div className="row dsp">
                        <h3>Search By Player</h3>
                        <input type="text" name="search-player" id="search-player" autoComplete="off"
                               placeholder="find any player..." className="form-control litanswer"/>

                    </div>
                </div>

            </main>
            <script src="/js/auto-complete.js" type="text/javascript"/>
        </div>
    )
}
export async function getServerSideProps({ preview = false , query}) {


    return {
        props: {  }
    };
}