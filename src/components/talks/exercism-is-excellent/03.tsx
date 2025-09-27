import type { Variants } from "motion";
import { motion } from "motion/react";

import exercismLogoSrc from "/src/assets/talks/exercism-is-excellent/logo.svg";
import angelikaSrc from "/src/assets/talks/exercism-is-excellent/whats-new-in-v3-with-angelika.png";
import { AutoSlideFooter } from "../../Slide/AutoSlideFooter";

const container: Variants = {
  hidden: { opacity: 0, height: 0 },
  show: {
    opacity: 1,
    height: 225,

    transition: {
      delay: 40,
    },
  },
};

const NEXT_SLIDE_COUNT = 4;
const NEXT_SLIDE_LABEL = "Languages";
const NEXT_TIMEOUT = 60 * 1000;
const NEXT_SLIDE = "/talks/exercism-is-excellent/04";

export default function Page() {
  return (
    <div>
      <header className="pb-8">
        <h2 className="font-semibold flex">
          <span className="flex bg-white rounded-lg shadow-xl p-8 mx-auto">
            <span className="sr-only">Slide 3: what is</span>
            <img
              alt="Exercism"
              src={exercismLogoSrc.src}
              style={{ margin: 0 }}
              width={133}
              height={24}
              className="w-[133px] h-[24px] sm:w-[266px] sm:h-[48px] "
            />
          </span>
        </h2>
      </header>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex  mb-10"
      >
        <a
          href="https://exercism.org/blog/whats-new-in-v3-with-angelika"
          target="_blank"
          rel="noreferrer"
          className="group focus:outline-none focus:ring-2 focus:ring-current transition flex m-auto rounded-md"
        >
          <img
            src={angelikaSrc.src}
            alt="What's new in Exercism v3"
            width={1280}
            height={720}
            className="object-cover w-[240px] h-[135px] sm:w-[320px] sm:h-[180px] md:w-[400px] md:h-[225px] rounded-md border-black shadow-xl transition group-hover:shadow-2xl group-active:shadow-md"
            style={{ margin: 0 }}
          />
        </a>
      </motion.div>

      <AutoSlideFooter
        next={NEXT_SLIDE}
        nextCount={NEXT_SLIDE_COUNT}
        nextLabel={NEXT_SLIDE_LABEL}
        duration={NEXT_TIMEOUT}
      />
    </div>
  );
}
