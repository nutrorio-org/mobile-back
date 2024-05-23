import { Avalicao, FieldName } from '../schema/avaliacao.schema';

export function getValueOfField(exame: Avalicao, fieldName: FieldName) {
  const item = exame.extraInfo.data.find((item) => item.name === fieldName);
  return item?.value ?? '0';
}
