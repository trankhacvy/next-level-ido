import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="container mx-auto px-5 pt-24 pb-16 space-x-16">
      <div>
        <a className="block cursor-pointer">
          <Logo />
        </a>
        <p className="text-grey-200 text-lg mt-16">
          The Next-Level IDO platform
        </p>
        <p className="text-grey-300 mt-4">
          {new Date().getFullYear()} Vincenzo - All rights reserved.
        </p>
      </div>
      <div className="flex flex-wrap"></div>
    </footer>
  );
};

export default Footer;
