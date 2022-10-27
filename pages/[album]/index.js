import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { getAlbum, getPaths, getSlugs, shapeAlbum } from "../../utils/wordpress";
import { AppContext } from "../_app";

export default function Album({ album }) {
  const [isDetail, setIsDetail] = useState(false);

  useEffect(() => {
    return () => setIsDetail(false);
  });

  return (
    <>
      <h1>{album.title}</h1>
      {album.images?.map((image, i) => (
        <Image key={i} src={image} width="200" height="200" alt="Picture of alma" />
      ))}
      <style jsx>
        {`
          h1 {
            color: orange;
          }
        `}
      </style>
    </>
  );
}

export async function getStaticPaths() {
  const paths = await getSlugs();
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const data = await getAlbum(params.album);

  if (!data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const album = await shapeAlbum(data);

  return {
    props: {
      album,
    },
    revalidate: 10,
  };
}
