import Image from "next/image";
import { getAlbum, getPaths, shapeAlbum } from "../../utils/wordpress";

export default function Album({ album }) {
  return (
    <>
      <h1>{album.title}</h1>
      {album.images?.map((image, i) => (
        <Image
          key={i}
          src={image}
          width="200"
          height="200"
          alt="Picture of alma"
        />
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
  const paths = await getPaths();

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
