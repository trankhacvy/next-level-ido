import Tabbar from "components/Tab";
import StakeForm from "./StakeForm";

const StakeTab = () => {
  const tabs = [
    { label: "Stake", content: <StakeForm type="stake" /> },
    { label: "Unstake", content: <StakeForm type="unstake" /> },
  ];

  return (
    <div className="w-full card p-5 md:p-8 items-stretch">
      <Tabbar tabs={tabs} />
    </div>
  );
};

export default StakeTab;
