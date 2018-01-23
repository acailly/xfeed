# <F s="${rootSubject}" p="a pour nom" />

## Travail effectué ce mois çi

L'assistante maternelle a travaillé <F s="${rootSubject}" p="a pour nombre d'heures travaillées" editable=true ></F> heures
réparties sur <F s="${rootSubject}" p="a pour nombre de jours travaillés" editable=true></F> jours

## Salaire brut total

Le taux horaire brut est de <F s="${rootSubject}" p="a pour taux horaire brut" editable=true></F>€ / heure, ce qui donne un salaire brut total de <F s="${rootSubject}" p="a pour taux horaire brut"></F>€ x <F s="${rootSubject}" p="a pour nombre d'heures travaillées"></F> heures = **<F s="${rootSubject}" p="a pour salaire brut (formatté)"></F>€**

## Salaire net

```
TODO ACY Les bases et taux de cotisations ne sont plus accessibles à un simple F
```

<MF s="une paie" p="est sujette à"  >

- La cotisation **<F s="${o}" p="a pour nom"></F>** s'applique sur <F s="${o}" p="a pour base"></F>% de <F s="${rootSubject}" p="a pour salaire brut (formatté)"></F>€ avec un taux de <F s="${o}" p="a pour taux"></F>% : <F s="${rootSubject}" p="${o} (formatté)"></F>€

</MF>

Le montant total des cotisations s'élève à <F s="${rootSubject}" p="est sujette à un total de cotisation de (formatté)"></F>€, ce qui donne un salaire net de <F s="${rootSubject}" p="a pour salaire brut"></F>€ - <F s="${rootSubject}" p="est sujette à un total de cotisation de (formatté)"></F>€ = **<F s="${rootSubject}" p="a pour salaire net (formatté)"></F>€**

## Indemnités d'entretien

L'indemnité d'entretien est de <F s="${rootSubject}" p="a pour indemnité journalière d'entretien" editable=true ></F>€ par jour

Le montant total des indemnités d'entretien à verser est de <F s="${rootSubject}" p="a pour indemnité journalière d'entretien"></F>€ x <F s="${rootSubject}" p="a pour nombre de jours travaillés"></F> jours = **<F s="${rootSubject}" p="a pour montant total d'indemnité d'entretien (formatté)"></F>€**

## Salaire net imposable

Le salaire net imposable est calculé en additionnant le salaire net et les cotisations imposables :

<MF s="une paie" p="est imposable sur" >

- La cotisation **<F s="${o}" p="a pour nom"></F>** : <F s="${rootSubject}" p="${o} (formatté)"></F>€

</MF>

Le salaire net imposable est donc égal à <F s="${rootSubject}" p="a pour salaire net (formatté)"></F>€ + <F s="${rootSubject}" p="a pour montant total des cotisations imposables (formatté)"></F>€ (somme des cotisations ci-dessus) = **<F s="${rootSubject}" p="a pour salaire net imposable (formatté)"></F>€**

## Salaire net à payer

Le salaire net à payer est la somme du salaire net (<F s="${rootSubject}" p="a pour salaire net (formatté)"></F>€) et des indemnités d'entretien versées (<F s="${rootSubject}" p="a pour montant total d'indemnité d'entretien (formatté)"></F>€) = **<F s="${rootSubject}" p="a pour salaire net à payer (formatté)"></F>€**




