import cx from "classnames";
import Button from "components/Button";
import Link from "next/link";
import numeral from "numeral";
import { Tier } from "types/common";

export type TierProps = {
  tier: Tier;
  hasButton?: boolean;
  current?: boolean;
};

const TierCard = ({ tier, hasButton = true, current = false }: TierProps) => {
  return (
    <div
      className={cx("w-full card overflow-hidden p-10", {
        "border-2 border-primary border-dashed": current,
      })}
    >
      <div>
        <h4 className="heading-h4 font-bold text-primary mb-4">{tier.name}</h4>
        <p className="heading-h5 font-semibold">
          ${numeral(tier.stake_amount).format("0,0")}
        </p>
      </div>
      <div className="mt-10">
        <div className="text-body2 text-gray-600">Staking Length Required</div>
        <h6 className="text-body1 font-semibold">{tier.duration}</h6>
      </div>
      <div className="mt-4">
        <div className="text-body2 text-gray-600">
          Whitelist Requirement Twitter
        </div>
        <h6 className="text-body1 font-semibold">
          {tier.whitelist_requirement}
        </h6>
      </div>
      {!tier.guaranteed_allocation && (
        <div className="mt-4">
          <div className="text-body2 text-gray-600">Lottery Tickets</div>
          <h6 className="text-body1 font-semibold">{tier.lottery_ticket}</h6>
        </div>
      )}
      {tier.guaranteed_allocation && (
        <div className="mt-4">
          <div className="text-body2 text-gray-600">Guaranteed Allocation</div>
          <h6 className="text-body1 font-semibold">Yes</h6>
        </div>
      )}
      {tier.guaranteed_allocation && (
        <div className="mt-4">
          <div className="text-body2 text-gray-600">Pool Weight</div>
          <h6 className="text-body1 font-semibold">{tier.pool_weight}</h6>
        </div>
      )}
      {hasButton && (
        <Link href="/stake">
          <Button className="mt-10" as="a" href="/stake" fullWidth size="large">
            Join Now
          </Button>
        </Link>
      )}
    </div>
  );
};

export default TierCard;
