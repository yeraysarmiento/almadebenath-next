import Image from "next/image";
import { getAbout } from "../../utils/wordpress";
import logo from "../../img/logo.svg";

export default function About({ about }) {
  const { description, instagram, email, profile, phone } = about;

  return (
    <>
      <article className="about-container">
        <div className="about-box">
          <ul className="social">
            <li className="social__phone">{phone}</li>
            <li className="social__email">{email}</li>
            <li className="social__instagram">
              <a href="http://google.com" target="_blank" rel="noreferrer">
                {instagram}
              </a>
            </li>
          </ul>
          <p className="description">{description}</p>
          <Image
            className="portrait"
            src={profile.url}
            alt="Portrait of Alma Debenath"
            width="200"
            height="300"
          />
        </div>
        <div className="logo">
          <Image src={logo} alt="logo of alma debenath" />
        </div>
      </article>
      <style jsx>{``}</style>
    </>
  );
}

export async function getStaticProps() {
  const about = await getAbout();

  return {
    props: {
      about,
    },
    revalidate: 10,
  };
}
