import Link from "next/link";
import Button from "components/Button";

const StartNow = () => {
  return (
    <section className="px-5 py-20 text-white text-center bg-gray-800/80">
      <h3 className="heading-h3">Start Now</h3>
      <h1 className="heading-h1 mt-2 mb-16">Join IDO Today</h1>
      <Link href="/projects">
        <Button className="inline-flex" as="a" href="/projects" size="large">
          Join Now
        </Button>
      </Link>
    </section>
  );
};

export default StartNow;
