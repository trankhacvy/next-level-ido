const Statistic = () => {
  return (
    <section className="container mx-auto px-5 py-16 lg:py-30">
      <div className="grid grid-cols-3 items-center gap-32">
        <div className="text-center bg-white rounded-2xl shadow-z4 px-10 py-8">
          <img
            className="w-[88px] h-[88px] inline-block"
            src="/assets/images/pancake-swap-token.png"
            width={88}
            height={88}
          />
          <div className="py-10">
            <h6 className="text-h4 font-semibold">Buy $LOTO</h6>
            <p className="text-body2 mt-2 text-gray-600">
              Nunc nonummy metus. Donec elit libero
            </p>
          </div>
          <div className="flex justify-between space-x-4">
            <button className="btn btn-primary w-1/2">KuCoin</button>
            <button className="btn btn-primary w-1/2">QuickSwap</button>
          </div>
        </div>
        <div className="text-center bg-white rounded-2xl shadow-z12 px-10 py-16">
          <img
            className="w-[88px] h-[88px] inline-block"
            src="/assets/images/pancake-swap-token.png"
            width={88}
            height={88}
          />
          <div className="py-10">
            <h6 className="text-h4 font-semibold">Lock $LOTO</h6>
            <p className="text-body2 mt-2 text-gray-600">
              Lock $LOTO and get access to our upcoming IDO on Loto
            </p>
          </div>
          <div>
            <button className="btn btn-primary inline-block">Lock $LOTO</button>
          </div>
        </div>
        <div className="text-center bg-white rounded-2xl shadow-z16 px-10 py-20">
          <img
            className="w-[88px] h-[88px] inline-block"
            src="/assets/images/pancake-swap-token.png"
            width={88}
            height={88}
          />
          <div className="py-10">
            <h6 className="text-h4 font-semibold">Earn $LOTO</h6>
            <p className="text-body2 mt-2 text-gray-600">
              Earn up to 200% APY in $LOTO rewards by staking your LP tokens
            </p>
          </div>
          <button className="btn btn-primary inline-block">Earn $LOTO</button>
        </div>
      </div>
    </section>
  );
};

export default Statistic;
