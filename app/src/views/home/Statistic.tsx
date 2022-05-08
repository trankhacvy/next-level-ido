const Statistic = () => {
  return (
    <section className="flex flex-wrap justify-center container mx-auto px-5 py-16 lg:py-30">
      <div className="card flex p-10 m-10 min-h-[260px] w-[25%]">
        <div className="space-y-4">
          <div className="text-h4 font-semibold">Buy $LOTO</div>
          <button className="btn-large btn-primary block min-w-[12rem]">
            Binance
          </button>
          <button className="btn-large btn-primary block min-w-[12rem]">
            PancakeSwap
          </button>
        </div>
      </div>
      <div className="card p-10 m-10 min-h-[260px] w-[25%]">
        <div className="text-h4 font-semibold">Lock $LOTO</div>
        <div className="text-body1">
          Lock $LOTO and get access to our upcoming IDO on Loto
        </div>
        <button className="btn-large btn-primary block min-w-[12rem] mt-8">
          Lock $LOTO
        </button>
      </div>
      <div className="card p-10 m-10 min-h-[260px] w-[25%]">
        <div className="text-h3 font-semibold">Earn $LOTO</div>
        <div className="text-body2">
          Earn up to 200% APY in $LOTO rewards by staking your LP tokens
        </div>
        <button className="btn-large btn-primary block min-w-[12rem] mt-8">
          Earn $LOTO
        </button>
      </div>
    </section>
  );
};

export default Statistic;
