import axios from "axios";
import Error from "next/error";

const BASE_URL = "https://almadebenath-api.com/wp-json/wp/v2";

const shapeAlbums = async (_albums) => {
  let albums = [];

  for await (const album of _albums) {
    const shapedAlbum = await shapeAlbum(album);
    albums.push(shapedAlbum);
  }
  return albums;
};

export const shapeAlbum = async (album) => {
  const title = album.title.rendered.toLowerCase();
  const images = await getImages(album.id);
  const categorie = album["_embedded"]["wp:term"][0][0].slug;

  return {
    title,
    images,
    categorie,
  };
};

export const getImages = async (id) => {
  const { data: images } = await axios.get(
    `${BASE_URL}/media?parent=${id}&per_page=50`
  );
  return images.map((image) => image.source_url);
};

export const getAlbums = async () => {
  const { data } = await axios.get(`${BASE_URL}/posts?_embed`);
  const albums = await shapeAlbums(data);
  return albums;
};

export const getCategories = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/categories`);
  const categories = data.map(({ slug }) => slug);
  return categories;
};

export const getAlbum = async (slug) => {
  const { data } = await axios.get(`${BASE_URL}/posts?_embed&slug=${slug}`);
  return data[0];
};

export const getPaths = async () => {
  const { data: albums } = await axios.get(`${BASE_URL}/posts`);
  const paths = albums.map((album) => {
    return {
      params: {
        album: album.slug,
      },
    };
  });

  return paths;
};