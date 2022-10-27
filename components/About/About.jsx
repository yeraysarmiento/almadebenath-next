const About = () => {
  return (
    <h2
      className={"menu__element menu__element--about" + (pathname.includes("about") ? " menu__element--on" : "")}
      onClick={() => onNavigate("about")}
    >
      about
    </h2>
  );
};

export default About;
