import Button from "components/Button";

const Statistic = () => {
  return (
    <section className="container mx-auto px-5 py-16 lg:py-30">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-8 md:gap-12 lg:gap-16">
        <div className="text-center bg-white rounded-2xl shadow-z8 px-10 py-8">
          <img
            className="w-[88px] h-[88px] inline-block"
            src="/assets/images/pancake-swap-token.png"
            width={88}
            height={88}
          />
          <div className="my-10 min-h-[90px]">
            <h3 className="heading-h3">Buy $LOTO</h3>
          </div>
          <div className="flex justify-between space-x-4">
            <Button
              className="w-1/2"
              size="large"
              variant="secondary"
              as="a"
              href="https://raydium.io/"
              target="_blank"
            >
              <img src="/assets/svg/raydium-icon.svg" />
            </Button>
            <Button
              className="w-1/2"
              size="large"
              variant="secondary"
              as="a"
              href="https://www.kucoin.com/"
              target="_blank"
            >
              <img src="/assets/svg/kucoin-icon.svg" />
            </Button>
          </div>
        </div>

        <div className="text-center bg-white rounded-2xl shadow-z16 px-10 py-8 lg:py-16">
          <img
            className="w-[88px] h-[88px] inline-block"
            src="/assets/images/pancake-swap-token.png"
            width={88}
            height={88}
          />
          <div className="my-10 min-h-[90px]">
            <h3 className="heading-h3">Lock $LOTO</h3>
            <p className="text-body2 mt-2 text-gray-600">
              Lock $LOTO and get access to our upcoming IDO on Loto
            </p>
          </div>
          <Button
            className="min-w-[80%] max-w-sm"
            size="large"
            variant="primary"
          >
            Lock $LOTO
          </Button>
        </div>

        <div className="text-center bg-white rounded-2xl shadow-z24 px-10 py-8 lg:py-20">
          <img
            className="w-[88px] h-[88px] inline-block"
            src="/assets/images/pancake-swap-token.png"
            width={88}
            height={88}
          />
          <div className="my-10 min-h-[90px]">
            <h3 className="heading-h3">Earn $LOTO</h3>
            <p className="text-body2 mt-2 text-gray-600">
              Earn up to 200% APY in $LOTO rewards by staking your LP tokens
            </p>
          </div>
          <Button
            className="min-w-[80%] max-w-sm"
            size="large"
            variant="primary"
          >
            Earn $LOTO
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Statistic;
