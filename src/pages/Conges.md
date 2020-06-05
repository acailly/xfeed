# <F search="${rootSubject}, a pour nom, ?_" />

## Le calcul des congés annuels

*Extrait de la convention collective*

> L'année de référence court du 1er juin de l'année précédente au 31 mai de l'année en cours. A cette date, le point sera fait sur le nombre de jours de congés acquis et la rémunération brute versée au salarié pendant l'année de référence hors indemnités (entretien, nourriture...).

> La rémunération brute des congés est égale :

> - soit à la rémunération brute que le salarié aurait perçue pour une durée d'accueil égale à celle du congé payé, hors indemnités (entretien, nourriture...) ;

> - soit au 1/10 de la rémunération totale brute (y compris celle versée au titre des congés payés) perçue par le salarié au cours de l'année de référence, hors indemnités (entretien, nourriture...).

> La solution la plus avantageuse pour le salarié sera retenue.

Nous allons donc calculer le montant à verser pour les congés payés selon les deux méthodes décrites dans la convention collective :

- La méthode du maintien de salaire
- La méthode du 1/10ème

Et nous retiendrons le montant le plus avantageux pour l'assistante maternelle.

## Confusion avec la méthode des 10%

La méthode du 1/10ème ne doit pas être confondue avec le fait de verser 10% du salaire tous les mois dès le début du contrat. 

Cette pratique est très répandue mais n'est pas légale, principalement parce qu'elle est quasi systématiquement au désavantage de l'assistante maternelle. 

En cas de litige, la justice peut considérer ces 10% comme des primes et non comme des indemnités de congés payés... que vous devrez donc lui verser à nouveau, et selon le bon mode de calcul cette fois.

## La méthode du maintien de salaire

Nous allons calculer **la rémunération brute que le salarié aurait perçue pour une durée d’accueil égale à celle du congé payé, hors indemnités (entretien, nourriture…).**

*L'idée est que pendant ses congés, l'assistante maternelle ne doit pas être payée moins que si elle travaillait.*

### Jours acquis 

L'assistante maternelle a travaillé 
<F search="${rootSubject}, a pour nombre de jours travaillés, ?_" editable=true ></F> 
jours depuis le 1er juin dernier (calculé à partir des indemnités d'entretien déclarées sur les feuilles de paie)

Etant donné qu'elle travaille
<F search="${rootSubject}, a pour nombre de jours travaillés hebdomadaire, ?_" editable=true ></F>
jours par semaine, cela équivaut à
<F search="${rootSubject}, a pour nombre de semaines travaillées, ?_"></F> 
semaines depuis le 1er juin dernier

L'assistante maternelle a pris 
<F search="${rootSubject}, a pour nombre de semaines de congés prises, ?_" editable=true ></F> 
semaines depuis le 1er juin dernier

L'assistante maternelle a acquis **2,5 jours de congés payés toutes les 4 semaines**.
Ce chiffre est arrondi au jour supérieur.

Elle a donc acquis 
<F search="${rootSubject}, a pour jours acquis sans limite des 30 jours, ?_"></F>
jours de congés

Et comme ce chiffre ne peut dépasser 30 jours, cela donne au final
<F search="${rootSubject}, a pour jours acquis sans enfants à charge, ?_"></F>
jours de congés

### Jours supplémentaires pour enfants à charge

*Article L3141-9 du code du travail*

> Les femmes salariées de moins de vingt et un ans au 30 avril de l'année précédente bénéficient de deux jours de congé supplémentaire par enfant à charge. Ce congé est réduit à un jour si le congé légal n'excède pas six jours.

> Les femmes salariées de plus de vingt et un ans à la date précitée bénéficient également de deux jours de congé supplémentaire par enfant à charge, sans que le cumul du nombre des jours de congé supplémentaire et de congé annuel ne puisse excéder la durée maximale du congé annuel prévu à l'article L. 3141-3.

> Est réputé enfant à charge l'enfant qui vit au foyer et est âgé de moins de quinze ans au 30 avril de l'année en cours.

Le 30 avril dernier, l'assistante maternelle avait 
<F search="${rootSubject}, plus ou moins de 21 ans au 30 avril, ?_" editable=true ></F>
de 21 ans et avait 
<F search="${rootSubject}, nombre enfants de moins de 15 ans au 30 avril, ?_" editable=true ></F>
enfants à charge de moins de 15 ans

Ce qui modifie le nombre de congés acquis à 
**<F search="${rootSubject}, a pour jours acquis avec enfants à charge, ?_"></F>
jours de congés** (
<F search="${rootSubject}, a pour nombre de jours enfants à charge, ?_"></F>
jours en plus en tenant compte de la limite de 30 jours)

### Conversion en euros

Maintenant il faut convertir ces jours acquis en euros.

L'assistante maternelle travaille 
<F search="${rootSubject}, a pour nombre moyen d'heures travaillées par semaine, ?_" editable=true ></F>
heures par semaines et gagne 
<F search="${rootSubject}, a pour taux horaire brut, ?_" editable=true ></F>€
brut par heure travaillée.

Cela veut donc dire qu'elle gagne 
<F search="${rootSubject}, a pour salaire brut par semaine (formatté), ?_"></F>€
brut par semaine

Etant donné qu'il y a **6 jours ouvrables dans une semaine**, cela veut donc dire qu'elle gagne 
<F search="${rootSubject}, a pour salaire brut par jour ouvrable (formatté), ?_"></F>€
brut par jour

Et donc que les 
<F search="${rootSubject}, a pour jours acquis avec enfants à charge, ?_"></F>
jours de congés acquis doivent être payés <F search="${rootSubject}, a pour jours acquis avec enfants à charge, ?_"></F> x <F search="${rootSubject}, a pour salaire brut par jour ouvrable (formatté), ?_"></F>€ = 
<F search="${rootSubject}, a pour montant avec maintien de salaire (formatté), ?_"></F>€

## La méthode du 1/10ème

Nous allons calculer **le 1/10e de la rémunération totale brute (y compris celle versée au titre des congés payés) perçue par le salarié au cours de l’année de référence, hors indemnités (entretien, nourriture…).**

*Pour faire simple, on fait la somme de tous les salaires versés et on divise par 10.*

### 1/10ème des montants versés...

Si on ajoute le montant des feuilles de paie de l'année dernière, on obtient 
<F search="${rootSubject},a pour remuneration brute totale, ?_" editable=true ></F>€

Le montant à verser pour les congés est égal à 1/10ème de cette somme, c'est à dire
<F search="${rootSubject}, a pour montant avec règle du 1/10ème (formatté), ?_"></F>€

## Quelle méthode appliquer ?

- La méthode du maintient de salaire nous donne <F search="${rootSubject}, a pour montant avec maintien de salaire (formatté), ?_"></F>€
- La méthode des 1/10ème nous donne <F search="${rootSubject}, a pour montant avec règle du 1/10ème (formatté), ?_"></F>€

Le maximum des deux est donc <F search="${rootSubject}, a pour montant (formatté), ?_"></F>€

## Méthode de versement

*Extrait de la convention collective*

> Cette rémunération peut être versée, selon l'accord des parties à préciser au contrat :
- soit en 1 seule fois au mois de juin ;
- soit lors de la prise principale des congés ;
- soit au fur et à mesure de la prise des congés ;
- soit par 12e chaque mois *(c'est à dire <F search="${rootSubject}, a pour montant divisé par 12 (formatté), ?_"></F>€)*.

## Documents de référence

- [Convention collective](https://www.legifrance.gouv.fr/affichIDCC.do?idSectionTA=KALISCTA000005713212&cidTexte=KALITEXT000005669667&idConvention=KALICONT000005635807)
- [Article L3141-9 du code du travail](https://www.legifrance.gouv.fr/affichCodeArticle.do;jsessionid=8140DDCE33CC8D4B6F8F8011A0073E12.tpdila18v_3?idArticle=LEGIARTI000006902646&cidTexte=LEGITEXT000006072050&categorieLien=id&dateTexte=20160809)
- [Méthodes de calcul des congés](https://www.service-public.fr/particuliers/vosdroits/F33359)

