import store from './store'

export default () => {
  return Promise.all([
    store.addFact(['#1', 'is', 'project']),
    store.addFact(['#1', 'name', 'Assistante maternelle']),

    store.addFact(['#1', 'contains', '#2']),
    store.addFact(['#2', 'name', 'Début du contrat']),
    store.addFact(['#2', 'created', '01/10/2017']),
    store.addFact(['#2', 'icon', 'fiber_new']),

    store.addFact(['#1', 'contains', '#3']),
    store.addFact(['#3', 'name', `Paie d'Octobre`]),
    store.addFact(['#3', 'created', '01/11/2017']),
    store.addFact(['#3', 'icon', 'monetization_on']),

    store.addFact(['#1', 'contains', '#4']),
    store.addFact(['#4', 'name', `Paie de Novembre`]),
    store.addFact(['#4', 'created', '01/12/2017']),
    store.addFact(['#4', 'icon', 'monetization_on']),

    store.addFact(['#1', 'contains', '#5']),
    store.addFact(['#5', 'name', `Paie de Décembre`]),
    store.addFact(['#5', 'created', '01/01/2018']),
    store.addFact(['#5', 'icon', 'monetization_on']),

    store.addFact(['FactWidget', 'prop', '#7']),
    store.addFact(['#7', 'name', 'subject']),
    store.addFact(['FactWidget', 'prop', '#8']),
    store.addFact(['#8', 'prop', 'predicate']),
    store.addFact(['FactWidget', 'prop', '#9']),
    store.addFact(['#9', 'name', 'object']),
    store.addFact(['FactWidget', 'render', 'FactWidget']), // TODO A REVOIR

    store.addFact(['#10', 'is', 'FactWidget']),
    store.addFact(['#10', 'own', '#11']), // TODO A REVOIR

    store.addFact(['socrate', 'is', 'mortel', '#11'])// TODO A REVOIR
  ])
  .catch(err => console.error(err))
}
