import { split, startsWith, slice, trim, prop } from "ramda"

const textFactToArray = (sentence, values) => {
  return split(",", sentence)
    .map(trim)
    .map(sentencePart => {
      return startsWith("?", sentencePart)
        ? prop(slice(1, undefined, sentencePart), values)
        : sentencePart
    })
}

export default textFactToArray
