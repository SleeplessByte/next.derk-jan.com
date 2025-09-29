import {
  transformerMetaHighlight,
  transformerMetaWordHighlight,
} from "@shikijs/transformers";

const metaHighlight = transformerMetaHighlight({
  className:
    "highlighted rounded-sm ring-2 ring-offset-2 ring-offset-pink-500 ring-black/50",
});

const metaWordHighlight = transformerMetaWordHighlight({
  className:
    "highlighted-word rounded-sm ring-2 ring-offset-2 ring-offset-black/50 ring-pink-500",
});

export const lines = [metaHighlight];
export const words = [metaWordHighlight];
export const linesAndWords = [metaHighlight, metaWordHighlight];
