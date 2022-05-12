import Link from "next/link";
import Button from "components/Button";

const StartNow = () => {
  return (
    <section className="px-5 py-8 text-white text-center bg-gray-800/80">
      <h3 className="text-h3">Start Now</h3>
      <h2 className="text-h1 mt-2 mb-16">Join IDO Today</h2>
      <Link href="/projects">
        <Button className="inline-flex" as="a" href="/projects" size="large">
          Join Now
        </Button>
      </Link>
    </section>
  );
};

export default StartNow;
