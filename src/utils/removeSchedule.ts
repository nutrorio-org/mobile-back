import { ListaSchedules } from '../schema/schedule.schema';

function dataNoPassado(dataString: string) {
  const dataAtual = new Date();
  const data = new Date(dataString);
  return data > dataAtual;
}

// Filtrando a lista para remover os itens onde start esteja no passado
export function removeSchedules(lista: ListaSchedules) {
  const listaFiltrada = lista.filter((item) => dataNoPassado(item.start));
  return listaFiltrada;
}
