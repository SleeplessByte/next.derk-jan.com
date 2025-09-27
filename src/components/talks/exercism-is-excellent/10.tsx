import { AutoSlideFooter } from "../../Slide/AutoSlideFooter";
import { Code } from "../../Slide/SlideCode";

const NEXT_SLIDE_COUNT = 11;
const NEXT_SLIDE_LABEL = "Representer result";
const NEXT_TIMEOUT = 45 * 1000;
const NEXT_SLIDE = "/talks/exercism-is-excellent/11";

export default function Page() {
  return (
    <div>
      <header className="pb-0">
        <h2 className="font-semibold flex" style={{ marginTop: 0 }}>
          <span className="sr-only">Slide 10:</span> Semi-automated feedback
        </h2>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4 mx-auto lg:mb-64">
        <div className="relative col-span-1 max-w-full">
          <Code language="javascript" caption="Submitted code">
            {`
const PREPARATION_MINUTES_PER_LAYER = 2;

export function preparationTimeInMinutes(numberOfLayers) {
  return numberOfLayers * PREPARATION_MINUTES_PER_LAYER;
}
`}
          </Code>
        </div>

        <div className="relative col-span-1 max-w-full">
          <Code language="javascript" caption="Similar code">
            {`
const CRYING_BEFORE_DINING = 2;


export function preparationTimeInMinutes(layers) {

  return layers * CRYING_BEFORE_DINING;
}
`}
          </Code>
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
