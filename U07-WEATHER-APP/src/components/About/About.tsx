import { Link } from "react-router-dom";

export const About = () => {
  return (
    <>
      <section className="about">
        <div className="about-card">
          <h1>About this page</h1>
          <div className="p-card">
            <p>This page is a schoolproject made with:</p>
            <ul>
              <li>React</li>
              <li>TypeScript</li>
            </ul>
            <p>It also uses an external API to get the weather data.</p>
            <p>
              If you want to see more of my work, please check out my
              <a href="https://github.com/Ludvigpbf"> github</a>.
            </p>
            <p>Contact:</p>
            <ul>
              <li>
                <a href="https://www.linkedin.com/in/ludvigflyckt/">
                  {" "}
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="tel:+46707983878">+4670 798 38 78</a>
              </li>
              <li>
                <a href="mailto: ludvig.flyckt@gmail.com">
                  ludvig.flyckt@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};
