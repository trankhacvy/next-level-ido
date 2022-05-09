import cx from "classnames";
import { FaCheck } from "react-icons/fa";

export type TierProps = {
  index: number;
};

const getShadowStyle = (index: number) => {
  switch (index) {
    case 0:
      return "shadow-z4";
    case 1:
      return "shadow-z12";
    case 2:
      return "shadow-z16";
    default:
      return "shadow-z4";
  }
};

const Tier = ({ index }: TierProps) => {
  return (
    <div
      className={cx(
        "bg-white rounded-2xl overflow-hidden p-10",
        getShadowStyle(index)
      )}
    >
      <div>
        <h4 className="text-h5 font-bold text-primary mb-4">Basic</h4>
        <p className="text-h5 font-semibold">$210</p>
      </div>
      <p className="text-body2 mt-6 text-gray-600">
        Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique
        sapien
      </p>
      <div className="py-10 space-y-4">
        <div className="flex text-body2">
          <div>
            <FaCheck className="w-5 h-5 text-primary" />
          </div>
          <p className="ml-4">
            Guaranteed allocation of the amount of 210 PSOL in dollars at the
            time of the participation.
          </p>
        </div>
        <div className="flex text-body2">
          <div>
            <FaCheck className="w-5 h-5 text-primary" />
          </div>
          <p className="ml-4">
            Dynamic Vesting Period:{" "}
            <span className="font-semibold">12 weeks</span>
          </p>
        </div>
      </div>
      <button className="btn-large btn-primary w-full">Join Now</button>
    </div>
  );
};

export default Tier;
