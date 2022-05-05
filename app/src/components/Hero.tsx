const Hero = () => {
  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-5 mt-8 lg:mt-0 lg:flex lg:items-center lg:space-x-28">
        <div className="lg:flex-1">
          <h1 className="text-white text-4xl lg:text-5xl font-extrabold">
            The next-level IDO Platform
          </h1>
          <p className="text-xl text-gray-300 mt-6">
            Swap, earn, stack yields, lend, borrow, leverage all on one
            decentralized, community driven platform. Welcome home to DeFi.
          </p>
          <div className="mt-10 md:flex lg:space-x-8">
            <button className="text-white bg-gradient px-8 py-3 font-semibold rounded-md shadow-lg">
              Enter App
            </button>
            <button className="text-white bg-neutral-700 px-8 py-3 font-semibold rounded-md shadow">
              Learn more
            </button>
          </div>
        </div>
        <figure className="hidden lg:block lg:flex-1 relative min-h-[600px]">
          <img src="/assets/images/hero-bg.png" />
        </figure>
      </div>
    </section>
  );
};

export default Hero;
