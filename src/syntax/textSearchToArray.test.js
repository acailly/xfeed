import textSearchToArray from "./textSearchToArray"

it("should translate one sentence", () => {
  const example =
    "la paie de novembre 2017, a pour nombre d'heures travaillées, ?heures"

  const expected = [
    [
      "la paie de novembre 2017",
      "a pour nombre d'heures travaillées",
      ["heures"]
    ]
  ]

  expect(textSearchToArray(example)).toEqual(expected)
})

it("should translate two sentences", () => {
  const example =
    "?paie, est, une paie. ?paie, a pour nombre d'heures travaillées, ?heures"

  const expected = [
    [["paie"], "est", "une paie"],
    [["paie"], "a pour nombre d'heures travaillées", ["heures"]]
  ]

  expect(textSearchToArray(example)).toEqual(expected)
})
