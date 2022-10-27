import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Detail from "../../components/Detail/Detail";
import { getAlbum, getPaths, getSlugs, shapeAlbum } from "../../utils/wordpress";
import { AppContext } from "../_app";

export default function Album({ album }) {
  const { isOpenModal, setIsOpenModal } = useContext(AppContext);

  const [detail, setDetail] = useState(false);
  const { title, images, categorie } = album;

  const onMove = (indexMovement) => {
    const currentIndex = images.indexOf(detail);

    if (currentIndex + indexMovement >= 0 && currentIndex + indexMovement < images.length) {
      setDetail(images[currentIndex + indexMovement]);
    }
  };

  const handleDetail = ({ image }) => {
    setDetail(image);
    setIsOpenModal(true);
  };

  return (
    <>
      <main className="gallery-container">
        <hr />
        <h2 className="gallery__title">{title}</h2>
        <ul className="gallery">
          {images.map((image, index) => (
            <li className="picture" key={index} onClick={() => handleDetail({ image })}>
              <Image
                src={image}
                height="300"
                width="200"
                objectFit="contain"
                alt={`Photography of Alma from album ${title}`}
                blurDataURL
              />
            </li>
          ))}
        </ul>
      </main>
      {isOpenModal && <Detail detail={detail} setIsOpenModal={setIsOpenModal} onMove={onMove} />}
      <style jsx>{`
        .gallery {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 15px;
        }

        .gallery-container {
          width: 100vw;
          height: 100vh;
          padding-top: 80px;
        }

        .gallery-container > hr {
          margin: 0 auto;
          width: 20%;
          border: 0.25px solid black;
        }

        .gallery__theme {
          font-family: $font;
          font-style: italic;
          font-size: 10px;
          padding: 3px;
          padding-top: 30px;
          text-align: center;
        }

        .gallery__title {
          font-family: $font;
          font-style: italic;
          font-size: 16px;
          padding: 5px 15px 50px 15px;
          text-align: center;

          // &--green {
          //   color: #7C8979;
          //   opacity: 0.3;
          // }

          // &--yellow {
          //   color: #dfc576;
          //   opacity: 0.3;
          // }

          &--footer {
            padding-bottom: 50px;
          }
        }

        .picture {
          display: flex;
          align-items: center;
          cursor: pointer;
          margin: 0 auto;
          // filter: drop-shadow(5px 5px #dfc5768c);
        }
      `}</style>
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
