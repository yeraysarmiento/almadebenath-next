import Image from "next/image";
import { getAbout } from "../../utils/wordpress";
import logo from "../../img/logo.svg";

export default function About({ about }) {
  const { description, instagram, email, profile, phone } = about;

  return (
    <>
      <div className="about-container">
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
          <div className="portrait-container">
            <Image
              className="portrait"
              src={profile.url}
              alt="Portrait of Alma Debenath"
              width="500"
              height="700"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="logo">
          <Image src={logo} alt="logo of alma debenath" width="200" />
        </div>
      </div>
      <style jsx>{`
        .about-container {
          padding: 20px;
          padding-top: 80px;
          font-size: 16px;
          background-color: #dfc576;
          display: flex;
          flex-direction: column;
        }

        .portrait-container {
          object-fit: cover;
          max-width: 50%;
        }

        .about-box {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .description {
          margin-bottom: 50px;
          line-height: 21px;
        }

        .social {
          margin-bottom: 30px;
        }

        .social li {
          margin: 5px 0;
        }

        .social__instagram {
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        .logo {
          margin-top: 20px;
          height: 80px;
          display: flex;
          justify-content: flex-end;
        }

        @media only screen and (min-width: 600px) {
          .about-container {
            height: 100vh;
          }

          .logo {
            margin-top: 50px;
          }
        }
      `}</style>
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
