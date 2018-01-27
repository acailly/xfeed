# <F search="${rootSubject}, a pour nom, ?_" />

## Travail effectué ce mois çi

L'assistante maternelle a travaillé <F search="${rootSubject}, a pour nombre d'heures travaillées, ?_" editable=true ></F> heures
réparties sur <F search="${rootSubject}, a pour nombre de jours travaillés, ?_" editable=true></F> jours

## Salaire brut total

Le taux horaire brut est de <F search="${rootSubject}, a pour taux horaire brut, ?_" editable=true></F>€ / heure, ce qui donne un salaire brut total de <F search="${rootSubject}, a pour taux horaire brut, ?_"></F>€ x <F search="${rootSubject}, a pour nombre d'heures travaillées, ?_"></F> heures = **<F search="${rootSubject}, a pour salaire brut (formatté), ?_"></F>€**

## Salaire net

<MF s="une paie" p="est sujette à"  >

- La cotisation **<F search="${o}, a pour nom, ?_"></F>** s'applique sur <F search="${rootSubject}, couvre l'année, ?annee. ${o}, a pour base, ?base. ?base, ?annee, ?_"></F>% de <F search="${rootSubject}, a pour salaire brut (formatté), ?_"></F>€ avec un taux de <F search="${rootSubject}, couvre l'année, ?annee. ${o}, a pour taux, ?taux. ?taux, ?annee, ?_"></F>% : <F search="${rootSubject}, ${o} (formatté), ?_"></F>€

</MF>

Le montant total des cotisations s'élève à <F search="${rootSubject}, est sujette à un total de cotisation de (formatté), ?_"></F>€, ce qui donne un salaire net de <F search="${rootSubject}, a pour salaire brut (formatté), ?_"></F>€ - <F search="${rootSubject}, est sujette à un total de cotisation de (formatté), ?_"></F>€ = **<F search="${rootSubject}, a pour salaire net (formatté), ?_"></F>€**

## Indemnités d'entretien

L'indemnité d'entretien est de <F search="${rootSubject}, a pour indemnité journalière d'entretien, ?_" editable=true ></F>€ par jour

Le montant total des indemnités d'entretien à verser est de <F search="${rootSubject}, a pour indemnité journalière d'entretien, ?_"></F>€ x <F search="${rootSubject}, a pour nombre de jours travaillés, ?_"></F> jours = **<F search="${rootSubject}, a pour montant total d'indemnité d'entretien (formatté), ?_"></F>€**

## Salaire net imposable

Le salaire net imposable est calculé en additionnant le salaire net et les cotisations imposables :

<MF s="une paie" p="est imposable sur" >

- La cotisation **<F search="${o}, a pour nom, ?_"></F>** : <F search="${rootSubject}, ${o} (formatté), ?_"></F>€

</MF>

Le salaire net imposable est donc égal à <F search="${rootSubject}, a pour salaire net (formatté), ?_"></F>€ + <F search="${rootSubject}, a pour montant total des cotisations imposables (formatté), ?_"></F>€ (somme des cotisations ci-dessus) = **<F search="${rootSubject}, a pour salaire net imposable (formatté), ?_"></F>€**

## Salaire net à payer

Le salaire net à payer est la somme du salaire net (<F search="${rootSubject}, a pour salaire net (formatté), ?_"></F>€) et des indemnités d'entretien versées (<F search="${rootSubject}, a pour montant total d'indemnité d'entretien (formatté), ?_"></F>€) = **<F search="${rootSubject}, a pour salaire net à payer (formatté), ?_"></F>€**
