import { useContext, useEffect } from "react";
import { AppContext } from "../_app";
import { getAlbums, getImages } from "../../utils/wordpress";
import Image from "next/image";
import Link from "next/link";

export default function Home({ albums }) {
  // const { theme, setTheme, } = useContext(AppContext);

  // useEffect(() => {
  //   setAlbums(albums);
  // }, [albums, setAlbums]);

  return <h1>home</h1>;
}

export async function getStaticProps() {
  const albums = await getAlbums();

  return {
    props: {
      albums,
    },
    revalidate: 10,
  };
}
