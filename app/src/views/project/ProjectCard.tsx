const ProjectCard = () => {
  return (
    <div className="w-full lg:w-auto lg:flex-1 min-h-[600px] lg:self-stretch card p-8">
      <div className="flex items-center justify-between">
        <div className="w-[160px] h-[160px] bg-gray-500 rounded-md"></div>
        <div className="text-center">
          <div className="text-body1">Token Price</div>
          <div className="text-h5 font-bold">$0.16</div>
        </div>
      </div>
      <div className="min-h-[200px]">
        <h2 className="text-h2 font-bold mt-4">Loto</h2>
        <div className="text-body1">
          Loto is the next-level IDO platform built on Solana with the needs of
          both projects and investors alike.
        </div>
      </div>
      <hr className="divider my-8" />
      <div className="flex justify-between">
        <div className="text-left">
          <div className="text-body2">Token Disribution</div>
          <div className="text-body1 font-semibold">140,555 SOL</div>
        </div>
        <div className="text-right">
          <div className="text-body2">Hard Cap</div>
          <div className="text-body1 font-semibold">100,000 USDC</div>
        </div>
      </div>
      <button className="mt-8 btn-large btn-primary">Participate</button>
      <hr className="divider my-8" />
      <div className="flex space-x-4">
        <div className="w-12 h-12 rounded-full bg-gray-400" />
        <div className="w-12 h-12 rounded-full bg-gray-400" />
        <div className="w-12 h-12 rounded-full bg-gray-400" />
        <div className="w-12 h-12 rounded-full bg-gray-400" />
        <div className="w-12 h-12 rounded-full bg-gray-400" />
      </div>
    </div>
  );
};

export default ProjectCard;
