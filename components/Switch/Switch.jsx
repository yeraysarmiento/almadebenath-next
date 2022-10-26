import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../pages/_app";

const Switch = ({ setRoutes }) => {
  const { paths, theme, setTheme, categories } = useContext(AppContext);
  const router = useRouter();
  const pathname = router.query.album;

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(theme === categories[0]);
  }, [categories, pathname, theme]);

  const onSwitch = () => {
    setTheme(theme === categories[0] ? categories[1] : categories[0]);
    setRoutes(paths.filter(({ categorie }) => categorie === theme));
  };

  return (
    <>
      <div className="switch-container">
        <label className="switch">
          <input type="checkbox" checked={isChecked} onChange={onSwitch} />
          <span className="slider">
            <span
              className="action"
              style={theme !== categories[0] ? { background: "#dfc576" } : { background: "#5C6D57" }}
            />
            <p className={theme === categories[0] ? "" : "selected"}>personal</p>
            <p className={theme === categories[0] ? "selected" : ""}>location</p>
          </span>
        </label>
      </div>
      <style jsx>
        {`
          .switch-container {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .slider {
            display: flex;
            align-items: center;
            width: 150px;
            height: 31px;
            background-color: rgba(255, 255, 255, 0.5);
            border-radius: 20px;
            position: relative;
            box-shadow: 0 0.1em rgba(0, 0, 0, 0.1);
            padding: 0 5px;
          }

          .slider p {
            font-family: "Roboto", sans-serif;
            font-size: 14px;
            z-index: 1;
            letter-spacing: 0.5px;
            font-weight: 300;
            transition: all ease 600ms;
            width: 100px;
            text-align: center;
          }

          .slider.selected {
            font-weight: 400;
          }

          .action {
            position: absolute;
            content: "";
            width: 75px;
            height: 25px;
            background-color: red;
            border-radius: 25px;
            left: 3px;
            transition: all ease 300ms;
          }

          .switch input {
            display: none;
          }

          .switch input:checked ~ .slider .action {
            transform: translate3d(69px, 0, 0);
          }
        `}
      </style>
    </>
  );
};

export default Switch;
