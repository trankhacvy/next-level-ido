import Button from "components/Button";

const Feature1 = () => {
  return (
    <section className="container lg:flex lg:justify-between mx-auto px-5 py-16 lg:py-30 border border-red-500">
      <div className="w-full lg:max-w-[33%]">
        <h2 className="text-[2rem] md:text-[2.5rem] lg:text-5xl xl:text-h2 leading-snug font-bold">
          Featured Category
        </h2>
        <p className="text-body1 mt-4 mb-10">
          Since wire-frame renderings are relatively simple and fast to
          calculate, they are often used in cases
        </p>
        <Button size="large">Buy Now</Button>
      </div>
      <div className="w-full lg:max-w-[60%]"></div>
    </section>
  );
};

export default Feature1;
