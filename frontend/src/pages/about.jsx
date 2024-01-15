import "../styles/about.css";

import AboutUsHouse from "../assets/logo.png";

export default function About() {
  return (
    <div id="about-page">
      <div className="about-box left-image">
        <img src={AboutUsHouse} width={"50vh"} />
      </div>
      <div className="about-box right-text">
        <p>
          Welcome to HomeFinder, where your journey to finding the perfect home
          begins! We understand that the search for the ideal living space is a
          significant and personal endeavor, and this is designed to simplify
          and enhance that experience. At HomeFinder, we believe in the power of
          technology to transform the way people find and connect with their
          dream homes.
        </p>

        <p>
          {`Our dedicated team is passionate about creating a user-friendly
          platform that seamlessly combines cutting-edge technology with a
          personalized touch. Whether you're a first-time buyer, a seasoned
          homeowner, or someone simply seeking a change, our app offers a
          comprehensive and intuitive solution to navigate the complexities of
          the real estate market.`}
        </p>
        <p>
          Join us on this exciting adventure as we redefine the home-searching
          experience, making it not just efficient, but enjoyable. Your perfect
          home awaits, and HomeFinder is here to guide you every step of the
          way. Welcome to a new era of homefinding!
        </p>
      </div>
    </div>
  );
}
