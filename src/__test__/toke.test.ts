import { Token } from '../class/Token';

test('token', () => {
  const token = new Token();
  const myToken = token.generate('99999999', '12345678');
  const valid = token.validate(myToken);
  expect(valid.cpf).toEqual('99999999');
  expect(valid.id).toEqual('12345678');
});
