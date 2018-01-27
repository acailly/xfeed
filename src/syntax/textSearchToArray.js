import { split, startsWith, slice, trim } from "ramda"

const sentenceToArray = sentence => {
  return split(",", sentence)
    .map(trim)
    .map(sentencePart => {
      return startsWith("?", sentencePart)
        ? [slice(1, undefined, sentencePart)]
        : sentencePart
    })
}

const textSearchToArray = text => {
  return split(".", text)
    .map(trim)
    .map(_ => sentenceToArray(_))
}

export default textSearchToArray
