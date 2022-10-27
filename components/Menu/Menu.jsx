import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../pages/_app";
import Header from "../Header/Header";
import Switch from "../Switch/Switch";

export const Menu = ({ paths, categories }) => {
  const { theme, setTheme, isOpenMenu, setIsOpenMenu } = useContext(AppContext);
  const router = useRouter();
  const pathname = router.asPath;

  const [routes, setRoutes] = useState([]);

  //Sets theme acording to pathname
  useEffect(() => {
    const matchedPath = paths.find(({ path }) => pathname.includes(path));
    paths.length && setTheme(matchedPath?.categorie || categories[1]);
  }, [paths.length]);

  //Sets routes according to theme
  useEffect(() => {
    theme && setRoutes(paths.filter(({ categorie }) => categorie === theme));
  }, [theme, paths]);

  return (
    <>
      <Header />
      <section
        className={"menu-container" + (isOpenMenu ? " menu-container--open" : "")}
        style={{ background: theme !== categories[0] ? "#dfc576" : "#7C8979" }}
      >
        <ul className="menu">
          {routes.map(({ path }, index) => (
            <Link href={`/${path}`} key={index}>
              <li
                className={"menu__element" + (pathname.includes(path) ? " menu__element--on" : "")}
                onClick={() => setIsOpenMenu(false)}
              >
                {path.toUpperCase()}
                {pathname.includes(path) && <span className="menu__line" />}
              </li>
            </Link>
          ))}
        </ul>
        <Link href="/about">
          <h2
            className={"menu__element menu__element--about" + (pathname.includes("about") ? " menu__element--on" : "")}
            onClick={() => setIsOpenMenu(false)}
          >
            about
          </h2>
        </Link>
        <Switch setRoutes={setRoutes} />
      </section>
      <style jsx>
        {`
          .menu-container {
            color: #fff;
            position: fixed;
            top: 0;
            left: -100vw;
            right: 100vw;
            bottom: 0;
            flex-direction: column;
            transition: left 0.5s, right 0.5s;
            display: flex;
            align-items: center;
            z-index: 1;
            padding: 100px 0 50px 0;
          }

          .menu-container--open {
            right: 0;
            left: 0;
          }

          .menu {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            overflow: scroll;
            width: 100%;
            position: relative;
            height: 100%;
          }

          .menu__line {
            width: 300px;
            position: absolute;
            height: 10px;
            background-color: white;
            opacity: 0.5;
            z-index: -1;
          }

          .menu__element {
            cursor: pointer;
            color: rgba(255, 255, 255, 0.5);
            font-family: $font;
            font-size: 30px;
            font-weight: bold;
            letter-spacing: 1px;
            margin: 10px 0;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .menu__element:hover {
            color: black;
          }

          .menu__element--on {
            color: black;
          }

          .menu__element--about {
            font-weight: lighter;
            padding: 30px 0;
          }
        `}
      </style>
    </>
  );
};

export default Menu;
