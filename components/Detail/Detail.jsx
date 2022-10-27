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
  );
};

export default Detail;
