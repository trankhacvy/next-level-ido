import React, { useState } from "react";
import cx from "classnames";
import Button from "components/Button";

const Statistic = () => {
  const [visible, setVisible] = useState(false);
  return (
    <section className="container mx-auto px-5 py-16 lg:py-30">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-8 md:gap-12 lg:gap-16">
        {/* <VisibilitySensor partialVisibility offset={{ top: -40 }}>
          {({ isVisible }: any) => {
            console.log("isVisible", isVisible);
            return (
              <div
                className={cx(
                  "relative text-center card p-10 transition-all ease-in duration-300",
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-20 opacity-0"
                )}
              >
                <div className="relative pb-[40%]">
                  <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <img
                      className="w-[240px] h-[230px] inline-block"
                      src="/assets/images/buy-ari.png"
                      width={240}
                      height={240}
                    />
                  </div>
                </div>
                <div className="my-10 min-h-[90px]">
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
            );
          }}
        </VisibilitySensor> */}

        <div
          className={cx(
            "relative text-center card p-10 transition-all ease-in-out duration-300",
            visible ? "translate-y-0 opacity-100" : "translate-y-40 opacity-0"
          )}
        >
          <div className="relative pb-[40%]">
            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
              <img
                className="w-[240px] h-[230px] inline-block"
                src="/assets/images/buy-ari.png"
                width={240}
                height={240}
              />
            </div>
          </div>
          <div className="my-10 min-h-[90px]">
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
            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
              <img
                className="w-[240px] h-[249px] inline-block"
                src="/assets/images/lock-ari.png"
                width={240}
                height={249}
              />
            </div>
          </div>
          <div className="my-10 min-h-[90px]">
            <h3 className="heading-h3">Lock $ARI</h3>
            <p className="text-body2 mt-2 text-gray-600">
              Lock $ARI and get access to our upcoming IDO on Ari platform
            </p>
          </div>
          <Button
            className="min-w-[80%] max-w-sm"
            size="large"
            variant="primary"
            onClick={() => setVisible(!visible)}
          >
            Lock $ARI
          </Button>
        </div>

        <div
          className={cx(
            "relative text-center card p-10 transition-all ease-in duration-300 delay-200",
            visible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          )}
        >
          <div className="relative pb-[40%]">
            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
              <img
                className="w-[240px] h-[230px] inline-block"
                src="/assets/images/earn-ari.png"
                width={240}
                height={240}
              />
            </div>
          </div>
          <div className="my-10 min-h-[90px]">
            <h3 className="heading-h3">Earn $ARI</h3>
            <p className="text-body2 mt-2 text-gray-600">
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
