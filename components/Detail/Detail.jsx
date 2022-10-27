import Image from "next/image";
import { useMemo } from "react";
import arrowIcon from "../../img/icons/arrow.svg";
import closeIcon from "../../img/icons/close.svg";

const Detail = ({ detail, setIsOpenModal, onMove, images }) => {
  setTimeout(() => {
    document.getElementById("detail")?.focus();
  }, 100);

  const onKeyDown = (event) => {
    if (event.keyCode === 39) onMove(1);
    if (event.keyCode === 37) onMove(-1);
  };

  const isFirstPicture = useMemo(() => images.indexOf(detail) === 0, [detail, images]);
  const isLastPicture = useMemo(() => images.indexOf(detail) === images.length - 1, [detail, images]);

  return (
    <>
      <article className="detail-container" tabIndex="-1" onKeyDown={onKeyDown} id="detail">
        <div className="detail__background" onClick={() => setIsOpenModal(false)} />
        <div className="detail">
          <div className="detail__box" onClick={() => setIsOpenModal(false)}>
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
              <Image
                src={detail}
                alt="Photography from Alma"
                height="800"
                width="800"
                objectFit="contain"
                style={{ zIndex: 99, pointerEvents: "none" }}
              />
            </div>
          </div>
          <div className="detail__box">
            <Image
              src={arrowIcon}
              alt="left arrow icon"
              width="30"
              onClick={() => onMove(-1)}
              style={{
                transform: "rotate(180deg)",
                cursor: "pointer",
                visibility: isFirstPicture ? "hidden" : "visible",
              }}
            />
            <Image
              src={closeIcon}
              alt="close icon"
              onClick={() => setIsOpenModal(false)}
              style={{ cursor: "pointer" }}
            />
            <Image
              src={arrowIcon}
              alt="right arrow icon"
              width="30"
              onClick={() => onMove(+1)}
              style={{
                cursor: "pointer",
                visibility: isLastPicture ? "hidden" : "visible",
              }}
            />
          </div>
        </div>
      </article>
      <style jsx>
        {`
          .detail-container {
            position: fixed;
            height: 100vh;
            width: 100vw;
            top: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 30px;
          }

          .detail {
            height: calc(100% - 80px);
            width: 100%;
            z-index: 2;
          }

          .detail__background {
            background-color: rgba(241, 236, 224, 0.9);
            position: absolute;
            height: 100%;
            width: 100%;
            z-index: 1;
          }

          .detail__box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
          }

          .detail__box:nth-child(1) {
            height: 100%;
          }

          .detail__box:nth-child(2) {
            height: 50px;
            bottom: 0;
          }

          .detail__text {
            font-family: "Roboto", sans-serif;
            margin-top: 10px;
            font-size: 14px;
            font-weight: 400;
          }
        `}
      </style>
    </>
  );
};

export default Detail;
