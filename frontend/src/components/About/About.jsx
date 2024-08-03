import React from "react";
import aboutImg from "../../assets/images/about.png";
import aboutCardImg from "../../assets/images/about-card.png";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section>
      <div className="container">
        <div className="flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row">
          {/* about image */}
          <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1">
            <img src={aboutImg} alt="" />
            <div className="absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[22%]">
              <img src={aboutCardImg} alt="" />
            </div>
          </div>

          {/* about content */}
          <div className="w-full lg:w-1/2 xl:w[670px] order-1 lg:order-2">
            <h2 className="heading">Proud to be one of the nations best.</h2>
            <p className="text__para">
              For an impressive three decades, Nigeria News & World Report has
              consistently recognized us as one of the leading public hospitals
              in the country. Our dedication to providing exceptional healthcare
              services has earned us the prestigious title of the #1 hospital in
              Abuja. This enduring recognition is a testament to our commitment
              to excellence, our highly skilled medical professionals, and our
              unwavering focus on patient care. We are proud to serve our
              community and will continue striving to set the standard for
              healthcare in Nigeria.
            </p>

            <Link to="/">
              <button className="btn">Learn More</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
