import Link from "next/link";
import { useContext } from "react";
import { AppContext } from "../../pages/_app";
import Burger from "../Burger/Burger";

const Header = () => {
  const { setIsOpenMenu } = useContext(AppContext);

  return (
    <>
      <header>
        <Link href="/home">
          <h1
            onClick={() => {
              setIsOpenMenu(false);
            }}
          >
            almadebenath
          </h1>
        </Link>
        <Burger />
      </header>
      <style jsx>
        {`
          header {
            width: 100%;
            padding: 25px;
            height: 80px;
            display: flex;
            justify-content: space-between;
            position: fixed;
            z-index: 2;
          }

          h1 {
            cursor: pointer;
            font-family: Karla;
            font-weight: 500;
            font-size: 22px;
            display: flex;
            align-items: center;
          }
        `}
      </style>
    </>
  );
};

export default Header;
