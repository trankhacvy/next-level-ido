import { useState } from "react";
import MenuIcon from "@heroicons/react/outline/MenuIcon";
import cx from "classnames";
import { useScrollPosition } from "hooks/useScrollPosition";

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
      <a className="block cursor-pointer">
        <svg
          width="76"
          height="27"
          viewBox="0 0 76 27"
          fill="none"
          className="h-[37px] w-auto"
        >
          <path
            d="M0 20.5A2.51 2.51 0 012.522 18H16v5H2.522A2.51 2.51 0 010 20.5z"
            fill="#3561FF"
          ></path>
          <path
            d="M16 16H2.522A2.51 2.51 0 010 13.5 2.51 2.51 0 012.522 11H16v5z"
            fill="#EA526F"
          ></path>
          <path
            d="M3 4H16.636A2.354 2.354 0 0119 6.344v.312A2.354 2.354 0 0116.636 9H3V4z"
            fill="#FFA800"
          ></path>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M35.171 1h3.476v20.298c0 .95-.778 1.72-1.738 1.72a1.736 1.736 0 01-1.677-1.267 7.081 7.081 0 01-4.07 1.276c-3.902 0-7.064-3.13-7.064-6.992s3.162-6.993 7.064-6.993c1.489 0 2.87.456 4.009 1.234V1zm-4.009 18.587c-1.982 0-3.589-1.59-3.589-3.552s1.607-3.553 3.589-3.553 3.589 1.59 3.589 3.553c0 1.962-1.607 3.552-3.589 3.552zm25.74-1.016a3.658 3.658 0 01-3.95.778 3.616 3.616 0 01-1.626-1.321 3.561 3.561 0 010-3.986c.398-.59.964-1.05 1.626-1.321a3.658 3.658 0 013.95.777l2.457-2.432a7.122 7.122 0 00-3.635-1.924 7.167 7.167 0 00-4.102.4 7.085 7.085 0 00-3.186 2.589 6.977 6.977 0 00-1.196 3.904c0 1.39.416 2.748 1.196 3.904a7.084 7.084 0 003.186 2.588 7.167 7.167 0 004.102.4 7.123 7.123 0 003.635-1.923L56.9 18.57zm10.3 4.457c-3.901 0-7.064-3.131-7.064-6.993 0-3.862 3.163-6.993 7.064-6.993 3.902 0 7.065 3.13 7.065 6.993 0 3.862-3.163 6.993-7.065 6.993zm0-3.44c-1.982 0-3.589-1.591-3.589-3.553s1.607-3.553 3.59-3.553c1.981 0 3.588 1.59 3.588 3.553 0 1.962-1.607 3.552-3.589 3.552zm-25.553-9.51a1.738 1.738 0 013.475 0v12.95H41.65v-12.95zM43.425 1a1.95 1.95 0 100 3.9h.04a1.95 1.95 0 000-3.9h-.04z"
            fill="#fff"
          ></path>
        </svg>
      </a>
      <nav>
        <button className="flex lg:hidden items-center space-x-2 font-semibold px-4 py-2 rounded bg-indigo-500">
          <span>Menu</span>
          <MenuIcon className="w-5 h-5" />
        </button>
        <ul className="hidden lg:flex items-center lg:space-x-5">
          {Menus.map((item) => (
            <li>
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
            <a
              className="text-white cursor-pointer font-semibold inline-block px-4 py-2 rounded-md bg-gradient shadow transition-[background-color] transition-300"
              href="/app"
            >
              Enter App
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
