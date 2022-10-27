import Head from "next/head";
import { useEffect, useState } from "react";
import "../styles/globals.scss";
import { createContext } from "react";
import { useRouter } from "next/router";
import { getCategories, getPaths } from "../utils/wordpress";
import Header from "../components/Header/Header";
import Menu from "../components/Menu/Menu";

export const AppContext = createContext();

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const [paths, setPaths] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [theme, setTheme] = useState("");

  const getMenuPaths = async () => {
    const paths = await getPaths();
    setPaths(paths);
  };

  const getCategoriesList = async () => {
    const categories = await getCategories();
    setCategories(categories);
  };

  useEffect(() => {
    getMenuPaths();
    getCategoriesList();
  }, [router]);

  const state = {
    paths,
    setPaths,
    categories,
    setCategories,
    isOpenMenu,
    setIsOpenMenu,
    theme,
    setTheme,
    isOpenModal,
    setIsOpenModal,
  };

  return (
    <AppContext.Provider value={state}>
      <Head>
        <title>Alma Debenath</title>
        <meta name="description" content="Page for Alma Debenath, a professional photographer" />
        <link rel="icon" href="./img/favicon.svg" />
      </Head>
      <Menu paths={paths} categories={categories} />
      <section style={{ height: "100vh", overflowY: "hidden" }}>
        <Component {...pageProps} />
      </section>
    </AppContext.Provider>
  );
}

export default MyApp;
