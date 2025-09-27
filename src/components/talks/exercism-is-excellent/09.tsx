import { motion } from "motion/react";
import { AutoSlideFooter } from "../../Slide/AutoSlideFooter";

import analyzerResultSrc from "/src/assets/talks/exercism-is-excellent/analyzer.jpg";
import { Code } from "../../Slide/SlideCode";

const NEXT_SLIDE_COUNT = 10;
const NEXT_SLIDE_LABEL = "Representations";
const NEXT_TIMEOUT = 45 * 1000;
const NEXT_SLIDE = "/talks/exercism-is-excellent/10";

export default function Page() {
  return (
    <div className="max-w-full">
      <header className="pb-0">
        <h2 className="font-semibold flex" style={{ marginTop: 0 }}>
          <span className="sr-only">Slide 9:</span> Automated feedback
        </h2>
      </header>

      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-2 lg:gap-4 mx-auto max-h-[70vh] max-w-full">
        <div className="relative col-span-1 ml-auto max-w-full">
          <Code language="javascript" caption="Submitted code">{`
const PREPARATION_MINUTES_PER_LAYER = 2;

export function preparationTimeInMinutes(numberOfLayers) {
  return numberOfLayers * 2;
}
`}</Code>
        </div>

        <div className="relative col-span-1 mr-auto max-w-full max-h-[70vh]">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 20 } }}
            src={analyzerResultSrc.src}
            alt=""
            style={{ margin: 0, maxHeight: "100%" }}
            className='overflow-hidden max-w-full block rounded-lg border-black/20 dark:border-black/50 border-4 shadow-xl relative"'
          />
        </div>
      </div>

      <AutoSlideFooter
        next={NEXT_SLIDE}
        nextCount={NEXT_SLIDE_COUNT}
        nextLabel={NEXT_SLIDE_LABEL}
        duration={NEXT_TIMEOUT}
      />
    </div>
  );
}
