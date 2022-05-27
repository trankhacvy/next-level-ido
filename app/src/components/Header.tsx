import { useState } from "react";
import { FaStream } from "react-icons/fa";
import cx from "classnames";
import { useScrollPosition } from "hooks/useScrollPosition";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Logo from "./Logo";
import { useRouter } from "next/router";
import Link from "next/link";

const Menus = [
  { text: "Projects", href: "/projects", activeRoutes: ["/projects"] },
  { text: "Stake", href: "/stake", activeRoutes: ["/stake"] },
  { text: "Swap", href: "/swap", activeRoutes: ["/swap"] },
  { text: "Dashboard", href: "/dashboard", activeRoutes: ["/dashboard"] },
];

const Header = () => {
  const [showOnScroll, setShowOnScroll] = useState(false);
  const { asPath } = useRouter();

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
      <Link href="/">
        <a href="/" className="block cursor-pointer">
          <Logo />
        </a>
      </Link>
      <nav>
        <button className="lg:hidden px-4 py-2 rounded-full">
          <span className="sr-only">Menu</span>
          <FaStream className="w-6 h-6 text-gray-600" />
        </button>
        <ul className="hidden lg:flex items-center lg:space-x-5">
          {Menus.map((item) => {
            const active = item.activeRoutes.some((item) =>
              asPath.startsWith(item)
            );
            return (
              <li key={item.text}>
                <Link href={item.href}>
                  <a className="cursor-pointer inline-block" href={item.href}>
                    <span
                      className={cx(
                        "inline-block text-body2 font-medium px-4 py-2 text-gray-600 hover:opacity-70",
                        {
                          "text-gray-800 font-semibold": active,
                        }
                      )}
                    >
                      {item.text}
                    </span>
                  </a>
                </Link>
              </li>
            );
          })}
          <li>
            <WalletMultiButton className="text-button-medium font-semibold justify-center min-w-[148px] px-4 py-[6px] align-middle rounded-lg text-white bg-primary disabled:bg-primary disabled:text-white disabled:font-semibold hover:!bg-primary-dark" />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
