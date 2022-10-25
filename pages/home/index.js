import { useContext, useEffect } from "react";
import { AppContext } from "../_app";
import { getAlbums, getImages } from "../../utils/wordpress";
import Image from "next/image";
import Link from "next/link";

export default function Home({ albums }) {
  const { setAlbums } = useContext(AppContext);

  useEffect(() => {
    setAlbums(albums);
  }, [albums, setAlbums]);
  console.log(albums);

  const album = albums[5];

  return (
    <div>
      <Link href="/essentials">ALBUM</Link>

      <h1>home</h1>

      <style jsx>
        {`
          h1 {
            color: orange;
          }
        `}
      </style>
    </div>
  );
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
