import React, {
  useCallback,
  useEffect,
  ReactNode,
  useMemo,
  useRef,
  useState,
} from "react";
import cx from "classnames";
import { Menu, Transition } from "@headlessui/react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import Button from "./Button";
import { useWallet } from "@solana/wallet-adapter-react";

export type ConnectWalletButtonProps = {
  children?: ReactNode;
};

const ConnectWalletButton = ({ children }: ConnectWalletButtonProps) => {
  const { publicKey, connected, wallet, disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  const [copied, setCopied] = useState(false);
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLUListElement>(null);

  const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);

  const content = useMemo(() => {
    // if (children) return children;
    if (!wallet || !base58) return children;
    return base58.slice(0, 4) + ".." + base58.slice(-4);
  }, [children, wallet, base58]);

  const openDropdown = useCallback(() => {
    setActive(true);
  }, []);

  const closeDropdown = useCallback(() => {
    setActive(false);
  }, []);

  const copyAddress = useCallback(async () => {
    if (base58) {
      await navigator.clipboard.writeText(base58);
      setCopied(true);
      setTimeout(() => setCopied(false), 500);
      setTimeout(() => closeDropdown(), 700);
    }
  }, [base58, closeDropdown]);

  const openModal = useCallback(() => {
    setVisible(true);
    closeDropdown();
  }, [closeDropdown]);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const node = ref.current;

      // Do nothing if clicking dropdown or its descendants
      if (!node || node.contains(event.target as Node)) return;

      closeDropdown();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, closeDropdown]);

  return (
    <div className="">
      <WalletMenu
        button={
          <Button
            onClick={() => {
              connected ? openDropdown() : openModal();
            }}
          >
            {content}
          </Button>
        }
        open={active}
      >
        <MenuItem onClick={copyAddress}>
          {copied ? "Copied" : "Copy address"}
        </MenuItem>
        <MenuItem
          onClick={() => {
            closeDropdown();
            openModal();
          }}
        >
          Change wallet
        </MenuItem>
        <MenuItem
          onClick={() => {
            closeDropdown();
            disconnect();
          }}
        >
          Disconnect
        </MenuItem>
      </WalletMenu>
    </div>
  );
};

export type WalletMenuProps = {
  children?: ReactNode;
  button?: ReactNode;
  open?: boolean;
};

const WalletMenu = ({ button, children, open }: WalletMenuProps) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {() => (
        <>
          <div>
            <Menu.Button as="div">{button}</Menu.Button>
          </div>
          <Transition
            show={open}
            as="div"
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            {open && (
              <Menu.Items
                static
                className="card rounded-md absolute right-0 mt-2 min-w-[160px] py-2 origin-top-right focus:outline-none"
              >
                {children}
              </Menu.Items>
            )}
          </Transition>
        </>
      )}
    </Menu>
  );
};

type MenuItemProps = {
  children: ReactNode;
  onClick?: () => void;
};

const MenuItem = ({ children, onClick }: MenuItemProps) => {
  return (
    <Menu.Item as="div">
      {({ active }) => (
        <button
          onClick={onClick}
          className={cx(
            "group flex w-full items-center rounded-md px-3 py-[6px] my-1 text-body2",
            {
              "bg-gray-500/10": active,
            }
          )}
        >
          {children}
        </button>
      )}
    </Menu.Item>
  );
};

export default ConnectWalletButton;
