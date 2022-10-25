import Head from "next/head";
import { useState } from "react";
import "../styles/globals.css";
import { createContext } from "react";

export const AppContext = createContext();

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState("");
  const [albums, setAlbums] = useState([]);

  const state = {
    theme,
    setTheme,
    albums,
    setAlbums,
  };

  return (
    <AppContext.Provider value={state}>
      <Head>
        <title>Alma Debenath</title>
        <meta
          name="description"
          content="Page for Alma Debenath, a professional photographer"
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;
