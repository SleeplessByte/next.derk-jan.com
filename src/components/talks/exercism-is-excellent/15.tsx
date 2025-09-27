import { ExternalLink } from "../../ExternalLink";

export default function Page() {
  return (
    <>
      <section className="slide">
        <header className="-mt-12">
          <h2 className="font-semibold text-center" id="title-slide-1">
            Exercis[em] is Excellent
          </h2>
          <p className="text-center max-w-md sm:max-w-lg md:max-w-xl mx-auto leading-7 sm:leading-7 md:leading-8">
            <ExternalLink href="https://exercism.org/profiles/SleeplessByte">
              https://exercism.org/profiles/SleeplessByte
            </ExternalLink>
          </p>
        </header>
      </section>
    </>
  );
}
