import Image from "next/image";

const Detail = () => {
  setTimeout(() => {
    document.getElementById("detail").focus();
  }, 100);

  const onKeyDown = (event) => {
    if (event.keyCode === 39) onMove(1);
    if (event.keyCode === 37) onMove(-1);
  };

  return (
    <>
      <article className="detail-container" tabIndex="-1" onKeyDown={onKeyDown} id="detail">
        <div className="detail__background" onClick={() => setIsOpenModal(false)} />
        <div className="detail">
          <div className="detail__box" onClick={() => setIsOpenModal(false)}>
            <Image className="detail__picture" src={picture.url} alt={picture.description} />
          </div>
          <div className="detail__box">
            <Image className="detail__left" src={arrowIcon} alt="left arrow icon" onClick={() => onMove(-1)} />
            <Image className="detail__close" src={closeIcon} alt="close icon" onClick={() => setIsOpenModal(false)} />
            <Image className="detail__right" src={arrowIcon} alt="right arrow icon" onClick={() => onMove(+1)} />
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
            height: calc(100% - 100px);
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
            // height: 100%;
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

          .detail__close {
            height: 50px;
            width: 22px;
            cursor: pointer;
            display: flex;
            justify-content: flex-end;

            & img {
              width: 15px;
            }
          }

          .detail__right {
            width: 30px;
            top: 100%;
            cursor: pointer;
          }

          .detail__left {
            width: 30px;
            transform: rotate(180deg);
            cursor: pointer;
          }

          .detail__picture {
            z-index: 99;
            margin: 0 auto;

            max-width: 100%;
            max-height: 80%;
            pointer-events: none;
          }
        `}
      </style>
    </>
  );
};

export default Detail;
