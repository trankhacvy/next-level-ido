import Button from "components/Button";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="lg:h-screen">
      <div className="container h-full mx-auto px-4 md:px-6 lg:flex lg:items-center">
        <div className="py-[120px] lg:flex lg:items-center w-full">
          <div className="text-center lg:text-left lg:w-full lg:max-w-[41%]">
            <h1 className="heading-h1">
              The Next-Level <br /> <b>IDO Platform</b>
            </h1>
            <p className="mt-10 text-gray-600 leading-relaxed">
              <span className="font-semibold text-primary">Ari</span> is the
              next-level IDO platform built on Solana with the needs of both
              projects and investors alike.
            </p>
            <div className="text-center mt-10 space-x-4 lg:flex space-y-6 lg:space-y-0">
              <Link href="/stake">
                <Button
                  className="max-w-xs inline-flex"
                  size="large"
                  href="/stake"
                  as="a"
                >
                  Stake $ARI
                </Button>
              </Link>
              <Link href="/">
                <Button
                  className="max-w-xs inline-flex"
                  size="large"
                  href="/"
                  as="a"
                  variant="secondary"
                >
                  Learn more
                </Button>
              </Link>
            </div>
          </div>
          <figure className="hidden lg:block lg:flex-1 relative min-h-[600px]">
            <div className="absolute top-[-20%] left-[15%]">
              <img src="/assets/images/hero.png" />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default Hero;
