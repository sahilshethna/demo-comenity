import '../public/assets/css/style.css'
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return <>
   <Head> 
   <title>Comenity Mastercard | Simple Cashback Credit Card</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap"></link>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"></link>
    <script async src="https://code.jquery.com/jquery-3.6.0.slim.min.js"></script> 
    
    </Head>
    
    <Component {...pageProps} />
    
  </>
}

export default MyApp
