import { useState } from "react";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
  AnchorWallet,
} from "@solana/wallet-adapter-react";
import Button from "components/Button";
import { toast } from "components/Toast";
import numeral from "numeral";
import { AnchorProvider } from "@project-serum/anchor";
import AppProgram from "libs/program";
import {
  FaTelegramPlane,
  FaDiscord,
  FaTwitter,
  FaMediumM,
  FaFacebook,
} from "react-icons/fa";
import { Project } from "types/common";
import { useGetIDOPool, useGetUserIDO } from "hooks/useGetIdoPool";
import { useAnchorProvider } from "hooks/useProvider";

export type ProjectCardProps = {
  project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const {
    name,
    logo,
    description,
    token_price,
    token_amount,
    sale_token,
    deposit_token,
    telegram_channel_username,
    discord,
    twitter_username,
    medium_username,
    facebook_url,
  } = project;

  const [loading, setLoading] = useState(false);
  const provider = useAnchorProvider();
  const { connection } = useConnection();
  const { sendTransaction } = useWallet();
  const anchorWallet = useAnchorWallet();
  const { pool } = useGetIDOPool(name, provider);
  const { userIdoAccount } = useGetUserIDO();

  const socials = [
    {
      name: "Telegram",
      visible: !!telegram_channel_username,
      href: `https://t.me/${telegram_channel_username}`,
      icon: <FaTelegramPlane className="w-5 h-5" />,
    },
    {
      name: "Discord",
      visible: !!discord,
      href: discord,
      icon: <FaDiscord className="w-5 h-5" />,
    },
    {
      name: "Twitter",
      visible: !!twitter_username,
      href: `https://twitter.com/${twitter_username}`,
      icon: <FaTwitter className="w-5 h-5" />,
    },
    {
      name: "Medium",
      visible: !!medium_username,
      href: medium_username,
      icon: <FaMediumM className="w-5 h-5" />,
    },
    {
      name: "Facebook",
      visible: !!facebook_url,
      href: facebook_url,
      icon: <FaFacebook className="w-5 h-5" />,
    },
  ];

  const handleCommitFund = async () => {
    try {
      const amount = 1000;
      setLoading(true);
      const provider = new AnchorProvider(
        connection,
        anchorWallet as AnchorWallet,
        AnchorProvider.defaultOptions()
      );
      const program = new AppProgram(provider);
      await program.commitFund(name, amount, sendTransaction);
      setLoading(false);
      toast.success({
        title: `Successfully`,
      });
    } catch (error: any) {
      console.error(error);
      toast.error({
        title: `Join error`,
        message: error?.message,
      });
      setLoading(false);
    }
  };

  return (
    <div className="w-full lg:w-auto lg:flex-1 min-h-[600px] lg:self-stretch card">
      <div className="p-8">
        <div className="flex items-center justify-between">
          <div className="w-[160px] h-[160px] bg-gray-500 rounded-md overflow-hidden">
            <img className="object-cover h-full" src={logo} alt={name} />
          </div>
          <div className="text-center">
            <div className="text-body1">Token Price</div>
            <div className="text-h5 font-bold">
              ${token_price} {deposit_token.ticker}
            </div>
          </div>
        </div>
        <div className="min-h-[200px]">
          <h2 className="text-h2 font-bold mt-4">{name}</h2>
          <div className="text-body1">{description}</div>
        </div>
      </div>
      <hr className="divider" />
      <div className="p-8">
        <div className="flex justify-between">
          <div className="text-left">
            <div className="text-body2">Pool Size</div>
            <div className="text-body1 font-semibold">
              {numeral(token_amount).format("0,0")} {sale_token.ticker}
            </div>
          </div>
          <div className="text-right">
            <div className="text-body2">Hard Cap</div>
            <div className="text-body1 font-semibold">
              {numeral(token_amount * token_price).format("0,0")}{" "}
              {deposit_token.ticker}
            </div>
          </div>
        </div>
        {!userIdoAccount && (
          <Button
            disabled={!pool}
            onClick={handleCommitFund}
            fullWidth
            size="large"
            className="mt-8"
            loading={loading}
          >
            Participate
          </Button>
        )}
      </div>

      <hr className="divider" />
      {userIdoAccount && (
        <>
          <div className="flex items-center justify-between p-8">
            <h5 className="heading-h5">Fund committed</h5>
            <h5 className="heading-h5">
              {numeral(userIdoAccount.depositAmount.toNumber()).format("0,0")}
            </h5>
          </div>
          <hr className="divider" />
        </>
      )}
      <div className="flex space-x-4 p-8 text-primary">
        {socials
          .filter((item) => item.visible)
          .map((item) => (
            <a
              key={item.name}
              href={item.href as string}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 inline-block cursor-pointer rounded-full hover:bg-gray-600/10"
            >
              {item.icon}
            </a>
          ))}
      </div>
    </div>
  );
};

export default ProjectCard;
