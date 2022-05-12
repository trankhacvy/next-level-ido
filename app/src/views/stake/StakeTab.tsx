import Tabbar from "components/Tab";
import StakeForm from "./StakeForm";

const StakeTab = () => {
  const tabs = [
    { label: "Stake", content: <StakeForm type="stake" /> },
    { label: "Unstake", content: <StakeForm type="unstake" /> },
  ];

  return (
    <div className="w-1/2 card p-8 self-stretch">
      <Tabbar tabs={tabs} />
    </div>
  );
};

export default StakeTab;
