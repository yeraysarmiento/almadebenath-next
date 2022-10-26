import { useContext } from "react";
import { AppContext } from "../../pages/_app";

const Burger = () => {
  const { isOpenMenu, setIsOpenMenu } = useContext(AppContext);

  return (
    <>
      <div className="burger-container">
        <div className="burger" onClick={() => setIsOpenMenu((prev) => !prev)}>
          <div className={"burger__layer" + (isOpenMenu ? " burger__layer--top" : "")}></div>
          <div className={"burger__layer" + (isOpenMenu ? " burger__layer--bottom" : "")}></div>
        </div>
      </div>
      <style jsx>
        {`
          .burger-container {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .burger {
            width: 30px;
            height: 30px;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            cursor: pointer;
            transition: all 1s;
          }

          .burger__layer {
            width: 100%;
            border: 1.5px solid black;
            background-color: black;
            border-radius: 3px;
            transition: transform 0.4s cubic-bezier(0.4, 0.5, 0.55, 0.95);
          }

          .burger__layer--top {
            transform: translateY(6.5px) rotate(45deg);
          }

          .burger__layer--bottom {
            transform: translateY(-4px) rotate(-45deg);
          }
        `}
      </style>
    </>
  );
};

export default Burger;
