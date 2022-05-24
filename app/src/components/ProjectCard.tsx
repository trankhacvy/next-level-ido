import Link from "next/link";
import numeral from "numeral";
import {
  FaTelegramPlane,
  FaDiscord,
  FaTwitter,
  FaMediumM,
  FaFacebook,
} from "react-icons/fa";
import { Project } from "types/common";
import { getProjectStatus, getProjectStatusLabel } from "utils/project";
import Button from "./Button";

export type ProjectCardProps = {
  project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const {
    id,
    name,
    description,
    logo,
    token_amount,
    telegram_channel_username,
    discord,
    twitter_username,
    medium_username,
    facebook_url,
    sale_token,
  } = project;
  const status = getProjectStatus(project);

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

  return (
    <article className="card">
      <div className="w-full flex px-8 pt-8">
        <div className="rounded-2xl w-32 h-32 overflow-hidden">
          <img className="object-cover h-full" src={logo} alt={name} />
        </div>
        <div className="ml-6 flex-1">
          <h5 className="heading-h5">{name}</h5>
        </div>
      </div>
      <div className="p-8">
        <p className="text-body2 line-clamp-4 min-h-[110px]">{description}</p>
      </div>
      <hr className="divider" />
      <div className="p-8">
        <div className="flex justify-between">
          <div>
            <div className="text-caption">Total Raise</div>
            <div className="text-body1 font-semibold">
              {numeral(token_amount).format("0,0")} {sale_token.ticker}
            </div>
          </div>
          <div>
            <div className="text-caption">Status</div>
            <div className="text-body1 font-semibold">
              {getProjectStatusLabel(project)}
            </div>
          </div>
        </div>
        <div className="flex space-x-4 text-primary mt-8">
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
      <hr className="divider" />
      <div className="p-8">
        <Link href={`/projects/${id}`}>
          <Button size="large" as="a" href={`/projects/${id}`}>
            {status === "live" ? "Join" : "View Detail"}
          </Button>
        </Link>
      </div>
    </article>
  );
};

export default ProjectCard;
