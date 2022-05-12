import { useState } from "react";
import { FaHamburger } from "react-icons/fa";
import cx from "classnames";
import { useScrollPosition } from "hooks/useScrollPosition";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Logo from "./Logo";

const Menus = [
  { text: "Projects", href: "/projects" },
  { text: "Stake", href: "/stake" },
  { text: "Team", href: "/" },
  { text: "Token", href: "/" },
  { text: "Contact", href: "/" },
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
        "fixed z-20 w-full px-5 md:px-8 h-16 bg-white/80 flex items-center justify-between backdrop-blur shadow-none transition-[height] duration-300",
        showOnScroll ? "md:h-[76px] shadow-z4" : "md:h-[96px]"
      )}
      style={{
        transitionProperty: "all",
      }}
    >
      <a href="/" className="block cursor-pointer">
        <Logo />
      </a>
      <nav>
        <button className="flex lg:hidden items-center space-x-2 font-semibold px-4 py-2 rounded bg-indigo-500">
          <span>Menu</span>
          <FaHamburger className="w-5 h-5" />
        </button>
        <ul className="hidden lg:flex items-center lg:space-x-5">
          {Menus.map((item, idx) => (
            <li key={item.text}>
              <a
                className="cursor-pointer inline-block focus:bg-indigo-500/30"
                href={item.href}
              >
                <span
                  className={cx(
                    "inline-block text-body2 font-medium px-4 py-2 text-gray-600 hover:opacity-70",
                    {
                      "text-gray-800": idx === 0,
                    }
                  )}
                >
                  {item.text}
                </span>
              </a>
            </li>
          ))}
          <li>
            <WalletMultiButton className="btn btn-primary" />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
