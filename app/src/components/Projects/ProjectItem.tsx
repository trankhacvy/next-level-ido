import Link from "next/link";
import {
  FaTelegramPlane,
  FaDiscord,
  FaTwitter,
  FaMediumM,
  FaFacebook,
} from "react-icons/fa";
import { Project } from "types/common";

export type ProjectItemProps = {
  project?: Project;
};

const ProjectItem = ({ project }: ProjectItemProps) => {
  if (!project) return null;

  const { name, description, logo, token_amount } = project;
  return (
    <article className="card">
      <div className="w-full flex px-8 pt-8">
        <div className="rounded-2xl w-32 h-32 overflow-hidden">
          <img className="object-cover h-full" src={logo} alt={name} />
        </div>
        <div className="ml-6 flex-1">
          <h5 className="text-h5 font-semibold">{name}</h5>
        </div>
      </div>
      <div className="p-8">
        <p className="text-body2 line-clamp-4">{description}</p>
      </div>
      <hr className="divider" />
      <div className="p-8">
        <div className="flex justify-between">
          <div>
            <div className="text-caption">Total Raise</div>
            <div className="text-body1 font-semibold">{token_amount} SOL</div>
          </div>
          <div>
            <div className="text-caption">Status</div>
            <div className="text-body1 font-semibold">Preparation</div>
          </div>
        </div>
        <div className="flex space-x-4 text-primary mt-8">
          <a className="p-2 inline-block cursor-pointer rounded-full hover:bg-gray-600/10">
            <FaTelegramPlane className="w-5 h-5" />
          </a>
          <a className="p-2 inline-block cursor-pointer rounded-full hover:bg-gray-600/10">
            <FaDiscord className="w-5 h-5" />
          </a>
          <a className="p-2 inline-block cursor-pointer rounded-full hover:bg-gray-600/10">
            <FaTwitter className="w-5 h-5" />
          </a>
          <a className="p-2 inline-block cursor-pointer rounded-full hover:bg-gray-600/10">
            <FaMediumM className="w-5 h-5" />
          </a>
          <a className="p-2 inline-block cursor-pointer rounded-full hover:bg-gray-600/10">
            <FaFacebook className="w-5 h-5" />
          </a>
        </div>
      </div>
      <hr className="divider" />
      <div className="p-8">
        <Link href="/projects/1">
          <a
            href="/projects/1"
            className="btn-large btn-primary w-full inline-flex items-center justify-center"
          >
            Join
          </a>
        </Link>
      </div>
    </article>
  );
};

export default ProjectItem;
