import textFactToArray from "./textFactToArray"

it("should translate one fact with one variable", () => {
  const example =
    "la paie de novembre 2017, a pour nombre d'heures travaillées, ?_"
  const values = { _: 115 }

  const expected = [
    "la paie de novembre 2017",
    "a pour nombre d'heures travaillées",
    115
  ]

  expect(textFactToArray(example, values)).toEqual(expected)
})
