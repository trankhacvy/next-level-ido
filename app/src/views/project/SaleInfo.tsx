import { Project } from "types/common";
import dayjs from "dayjs";
import numeral from "numeral";

export type SaleInfoProps = {
  project: Project;
};

const SaleInfo = ({ project }: SaleInfoProps) => {
  const {
    token_amount,
    token_price,
    deposit_token,
    is_vested,
    sale_start,
    sale_end,
  } = project;
  return (
    <div className="w-full lg:self-stretch">
      <h4 className="text-2xl font-semibold">IDO Info</h4>
      <div className="card px-8 py-4 mt-4">
        <div className="flex justify-between py-3">
          <div className="text-body2">Hardcap</div>
          <div className="text-body2 font-semibold">
            {numeral(token_amount * token_price).format("0,0")}{" "}
            {deposit_token.ticker}
          </div>
        </div>
        <div className="flex justify-between py-3">
          <div className="text-body2">Sale Rate</div>
          <div className="text-body2 font-semibold">
            {token_price} {deposit_token.ticker}
          </div>
        </div>
        <div className="flex justify-between py-3">
          <div className="text-body2">Sale type</div>
          <div className="text-body2 font-semibold">
            {is_vested ? "Vested" : "Unlocked"}
          </div>
        </div>
        <div className="flex justify-between py-3">
          <div className="text-body2">Open Time</div>
          <div className="text-body2 font-semibold">
            {dayjs(sale_start).format("MMMM D, YYYY h:mm A")}
          </div>
        </div>
        <div className="flex justify-between py-3">
          <div className="text-body2">Close Time</div>
          <div className="text-body2 font-semibold">
            {dayjs(sale_end).format("MMMM D, YYYY h:mm A")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleInfo;
