//https://github.com/crubier/Hexastore

import Hexastore from "hexastore"
import { equals } from "ramda"
import { Observable } from "rxjs/Observable"
import { Subject } from "rxjs/Subject"

const facts = new Hexastore()

export const search = queries => Observable.of(facts.search(queries))

const store$ = new Subject()

export const addFact = fact => {
  facts.put(fact)
  console.log("DEBUG", "ADD", fact[0], fact[1], fact[2])
  store$.next(true)
  return Observable.empty().startWith(true)
}

export const watch = query => {
  return store$
    .startWith(true)
    .concatMap(() => {
      return search(query)
    })
    .distinctUntilChanged((a, b) => {
      return equals(a, b)
    })
}

export const deleteFact = ([subject, predicate, object]) => {
  console.log("DEBUG", "DELETE", subject, predicate, object)
  //TODO Ne supporte pas la suppression
  return Observable.empty().startWith(true)
}
