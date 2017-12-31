# <F s=${rootSubject} p="name" />

## Travail effectué ce mois çi

L'assistante maternelle a travaillé <F s=${rootSubject} p="workingHours" editable=true ></F> heures
réparties sur <F s=${rootSubject} p="workingDays" editable=true></F> jours

## Salaire brut total

Le taux horaire brut est de <F s=${rootSubject} p="hourlyGrossRate" editable=true></F>€ / heure, ce qui donne un salaire brut total de <F s=${rootSubject} p="hourlyGrossRate"></F>€ x <F s=${rootSubject} p="workingHours"></F> heures = **<F s=${rootSubject} p="grossSalary"></F>€**

## Salaire net

<MF s="paie" p="cotisation"  >

- La cotisation **<F s=${o} p="name"></F>** s'applique sur <F s=${o} p="base"></F>% de <F s=${rootSubject} p="grossSalary"></F>€ avec un taux de <F s=${o} p="rate"></F>% : <F s=${rootSubject} p=${o}></F>€

</MF>

Le montant total des cotisations s'élève à <F s=${rootSubject} p="totalCotisationAmountFormatted"></F>€, ce qui donne un salaire net de <F s=${rootSubject} p="grossSalary"></F>€ - <F s=${rootSubject} p="totalCotisationAmountFormatted"></F>€ = **<F s=${rootSubject} p="netSalaryFormatted"></F>€**








