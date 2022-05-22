import { Project } from "types/common";
import dayjs from "dayjs";

export type TokenInformationProps = {
  project: Project;
};

const TokenInformation = ({ project }: TokenInformationProps) => {
  return (
    <div className="w-full lg:self-stretch">
      <h4 className="text-2xl font-semibold">Token Information</h4>
      <div className="card px-8 py-4 mt-6">
        <div className="flex justify-between py-3">
          <div className="text-body2">Token Name</div>
          <div className="text-body2 font-semibold">
            {project.sale_token.name}
          </div>
        </div>
        <div className="flex justify-between py-3">
          <div className="text-body2">Symbol</div>
          <div className="text-body2 font-semibold">
            {project.sale_token.ticker}
          </div>
        </div>
        {project.claim_start && (
          <div className="flex justify-between py-3">
            <div className="text-body2">Token Distribution</div>
            <div className="text-body2 font-semibold">
              {dayjs(project.claim_start).format("MMMM D, YYYY h:mm A")}
            </div>
          </div>
        )}
        <div className="flex justify-between py-3">
          <div className="text-body2">Blockchain</div>
          <div className="text-body2 font-semibold">Solana</div>
        </div>
      </div>
    </div>
  );
};

export default TokenInformation;
