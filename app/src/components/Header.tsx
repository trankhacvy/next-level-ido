import { useState } from "react";
import MenuIcon from "@heroicons/react/outline/MenuIcon";
import cx from "classnames";
import { useScrollPosition } from "hooks/useScrollPosition";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Logo from "./Logo";

const Menus = [
  { text: "Allocation", href: "/#allocation" },
  { text: "Roadmap", href: "/#roadmap" },
  { text: "Team", href: "/#team" },
  { text: "Token", href: "/#token" },
  { text: "Contact", href: "/#contact" },
];

const Header = () => {
  const [showOnScroll, setShowOnScroll] = useState(false);

  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y < prevPos.y;
      if (isShow !== showOnScroll) setShowOnScroll(isShow);
    },
    [showOnScroll],
    undefined,
    false,
    0
  );

  return (
    <header
      className={cx(
        "fixed z-20 w-full h-[70px] px-5 md:px-8 flex items-center justify-between bg-header/50 backdrop-filter backdrop-blur-md",
        { "border-b border-b-gray-500": showOnScroll }
      )}
    >
      <a href="/" className="block cursor-pointer">
        <Logo />
      </a>
      <nav>
        <button className="flex lg:hidden items-center space-x-2 font-semibold px-4 py-2 rounded bg-indigo-500">
          <span>Menu</span>
          <MenuIcon className="w-5 h-5" />
        </button>
        <ul className="hidden lg:flex items-center lg:space-x-5">
          {Menus.map((item) => (
            <li key={item.text}>
              <a
                className="cursor-pointer inline-block focus:bg-indigo-500/30"
                href={item.href}
              >
                <span className="inline-block text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-500/30 transition-[background-color] transition-300">
                  {item.text}
                </span>
              </a>
            </li>
          ))}
          <li>
            <WalletMultiButton className="btn-primary" />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
