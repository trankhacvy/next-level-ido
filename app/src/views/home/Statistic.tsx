import React from "react";
import cx from "classnames";
import Button from "components/Button";

const Statistic = () => {
  return (
    <section className="container mx-auto px-5 py-16 lg:py-30">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 items-center gap-8 lg:gap-10">
        <div
          className={cx(
            "relative text-center card p-10 transition-all ease-in-out duration-300"
          )}
        >
          <div className="relative pb-[40%]">
            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-0 lg:-translate-y-1/2">
              <img
                className="w-[240px] inline-block"
                src="/assets/images/buy-ari.png"
                width={240}
                height={240}
              />
            </div>
          </div>
          <div className="my-10 lg:min-h-[90px]">
            <h3 className="heading-h3">Buy $ARI</h3>
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

        <div className="text-center card p-10">
          <div className="relative pb-[40%]">
            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-0 lg:-translate-y-1/2">
              <img
                className="w-[240px] inline-block"
                src="/assets/images/lock-ari.png"
                width={240}
                height={240}
              />
            </div>
          </div>
          <div className="my-10 min-h-[90px]">
            <h3 className="heading-h3">Lock $ARI</h3>
            <p className="text-body2 mt-2 text-gray-600 line-clamp-2">
              Lock $ARI and get access to our upcoming IDO on Ari platform
            </p>
          </div>
          <Button
            className="min-w-[80%] max-w-sm"
            size="large"
            variant="primary"
          >
            Lock $ARI
          </Button>
        </div>

        <div
          className={cx(
            "relative text-center card p-10 transition-all ease-in duration-300 delay-200"
          )}
        >
          <div className="relative pb-[40%]">
            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-0 lg:-translate-y-1/2">
              <img
                className="w-[240px] inline-block"
                src="/assets/images/earn-ari.png"
                width={240}
                height={240}
              />
            </div>
          </div>
          <div className="my-10 min-h-[90px]">
            <h3 className="heading-h3">Earn $ARI</h3>
            <p className="text-body2 mt-2 text-gray-600 line-clamp-2">
              Earn up to 200% APY in $ARI rewards by staking your LP tokens
            </p>
          </div>
          <Button
            className="min-w-[80%] max-w-sm"
            size="large"
            variant="primary"
          >
            Earn $ARI
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Statistic;
