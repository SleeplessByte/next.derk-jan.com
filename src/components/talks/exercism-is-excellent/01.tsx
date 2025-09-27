import { useEffect, useRef } from "react";

import { AnimatePresence, motion } from "motion/react";
import headlineExercise from "/src/assets/talks/exercism-is-excellent/news-exercise.png";
import headlineExposure from "/src/assets/talks/exercism-is-excellent/news-exposure.png";
import headlineInterference from "/src/assets/talks/exercism-is-excellent/news-interference.png";
import headlineLifetime from "/src/assets/talks/exercism-is-excellent/news-lifetime.png";
import headlinePractice from "/src/assets/talks/exercism-is-excellent/news-practice.png";
import { SlideFooter } from "../../Slide/SlideFooter";

const HEADLINES = [
  {
    src: headlineExercise,
    alt: "Headline: exercise is good for you",
    caption: "",
    width: 2360,
    height: 1640,
    blur: { top: "12%", bottom: "58%" },
  },
  {
    src: headlinePractice,
    alt: "Headline: Practice makes perfect",
    caption: "",
    width: 2360,
    height: 1640,
    blur: { top: "16%", bottom: "50%" },
  },
  {
    src: headlineLifetime,
    alt: "Headline: Learning a foreign language lasts forever",
    caption: "",
    width: 2360,
    height: 1640,
    blur: { top: "25%", bottom: "50%" },
  },
  {
    src: headlineExposure,
    alt: "Headline: Expose to multiple languages makes it easier to learn one",
    caption: "",
    width: 2360,
    height: 1640,

    blur: { top: "52%", bottom: "30%" },
  },
  {
    src: headlineInterference,
    alt: "Headline: Why is it difficult for developers to learn another programming language?",
    caption: "",
    width: 2360,
    height: 1640,

    blur: { top: "28%", bottom: "60%" },
  },
];

const HEADLINE_INTERVAL = 12 * 1000;
const THIS_SLIDE = "/talks/exercism-is-excellent/01/{{index}}";
const NEXT_SLIDE = "/talks/exercism-is-excellent/02";

function getIndexFromParams(params: URLSearchParams) {
  return Math.max(
    0,
    Math.min(HEADLINES.length - 1, Number(params.get("index") || "0")),
  );
}

function nextSlide(currentIndex: number) {
  window.location.href = THIS_SLIDE.replace(
    "{{index}}",
    String(currentIndex + 1),
  );
}

export default function Page({ currentUrl }: { currentUrl: URL }) {
  const params = new URLSearchParams(currentUrl.search);
  const index = getIndexFromParams(params);
  const headline = HEADLINES[index];
  const progressBar = useRef<HTMLDivElement>(null);
  const isLastRef = useRef(false);
  isLastRef.current = index + 1 === HEADLINES.length;

  useEffect(() => {
    const interval = setInterval(() => {
      if (isLastRef.current) {
        window.location.href = NEXT_SLIDE;
      } else {
        nextSlide(index);
      }
    }, HEADLINE_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, [isLastRef, index]);

  useEffect(() => {
    const elem = progressBar.current;

    if (!elem) {
      return;
    }

    elem.style.transitionDuration = "0ms";
    elem.style.width = "0%";
    elem.getBoundingClientRect();

    let timer = requestAnimationFrame(() => {
      elem.style.transitionDuration = `${HEADLINE_INTERVAL}ms`;
      elem.getBoundingClientRect();

      timer = requestAnimationFrame(() => {
        elem.style.width = "100%";
        elem.getBoundingClientRect();
      });
    });

    return () => {
      cancelAnimationFrame(timer);
    };
  }, [headline]);

  return (
    <div>
      <header className="-mt-24">
        <h2 className="font-semibold">
          <span className="sr-only">Slide 1: headlines.</span> Exercise is
          important
        </h2>
      </header>

      <div className="w-[236px] h-[164px] sm:w-[531px] sm:h-[369px] md:w-[708px] md:h-[492px] mx-auto sm:mx-0">
        <AnimatePresence mode="popLayout">
          <motion.figure
            key={headline.src.src}
            className="overflow-hidden block rounded-lg border-black/20 dark:border-black/50 border-4 shadow-xl relative"
            style={{ margin: 0 }}
            initial={{
              opacity: 0,
            }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, overflow: {} }}
          >
            <img
              src={headline.src.src}
              alt={headline.alt}
              width={headline.width}
              height={headline.height}
              className="w-[236px] h-[164px] sm:w-[531px] sm:h-[369px] md:w-[708px] md:h-[492px]"
            />
            <div
              className="bg-white/70 absolute top-0 left-0 right-0"
              style={{ height: headline.blur.top }}
            ></div>

            <div
              className="bg-white/70 absolute bottom-0 left-0 right-0"
              style={{ height: headline.blur.bottom }}
            ></div>
            {headline.caption ? (
              <figcaption className="bottom-0 absolute p-4 bg-gradient-to-r from-black/90 via-black/80 to-black/70 w-full font-semibold md:text-3xl">
                {headline.caption}
              </figcaption>
            ) : null}
            <div
              ref={progressBar}
              className={"absolute bottom-0 h-1 bg-yellow-600"}
              style={{
                transitionProperty: "width",
                transitionDuration: "0ms",
                transitionTimingFunction: "ease-in-out",
              }}
            ></div>
          </motion.figure>
        </AnimatePresence>
      </div>

      <SlideFooter next={NEXT_SLIDE} nextCount={2} nextLabel={"introduction"} />
    </div>
  );
}
