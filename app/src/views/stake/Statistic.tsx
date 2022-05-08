const Statistic = () => {
  return (
    <div className="w-1/2 card p-8 self-stretch">
      <div className="flex items-center max-w-[60%] mx-auto">
        <img
          src="/assets/images/pancake-swap-token.png"
          width={80}
          height={80}
        />
        <div className="ml-6">
          <div className="text-body1">Available to lock</div>
          <div className="text-h3 font-semibold">0.00 LOTO</div>
        </div>
      </div>
      <div className="flex items-center max-w-[60%] mx-auto mt-8">
        <img
          src="/assets/images/pancake-swap-token.png"
          width={80}
          height={80}
        />
        <div className="ml-6">
          <div className="text-body1">Amount locked</div>
          <div className="text-h3 font-semibold">0.00</div>
        </div>
      </div>
    </div>
  );
};

export default Statistic;
