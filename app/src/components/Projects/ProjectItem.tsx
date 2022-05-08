import Link from "next/link";

const ProjectItem = () => {
  return (
    <article className="card">
      <div className="w-full flex px-8 pt-8">
        <div className="rounded-2xl w-32 h-32 bg-gray-400" />
        <div className="ml-6 flex-1">
          <h5 className="text-h5 font-semibold">CryptoCitizen</h5>
        </div>
      </div>
      <div className="p-8">
        <p className="text-body2">
          CryptoCitizen is an upcoming NFT based MMO RPG game built on Binance
          Smart Chain. The project is a persistent open world with many
          mini-games, services such as advertising, land and real estate that
          will come gradually in the development phases. The CryptoCitizen
          Metaverse will be a next-gen AAA sandbox experience built from the
          QORPO dev-house. The gameplay includes basic open world games
          features.
        </p>
      </div>
      <hr className="border-t border-t-gray-500/[0.24] border-dashed" />
      <div className="p-8">
        <Link href="/projects/1">
          <a href="/projects/1" className="btn-large btn-primary w-full inline-flex items-center justify-center">
            Join
          </a>
        </Link>
      </div>
    </article>
  );
};

export default ProjectItem;
