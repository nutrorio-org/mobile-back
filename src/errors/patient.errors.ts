export enum PatientError {
  InvalidID = 'ID invalido',
  InvalidPassword = 'Password invalido',
  FailedPasswordUpdate = 'Error ao atualizar o password',

  GeneralError = 'Error',
  NutriNotFound = 'Erro ao buscar dados do nutricionista',
  PatientNotFound = 'Erro ao buscar dados do paciente',
  InvalidFields = 'body invalido',
  FailedLogin = 'Erro ao efetuar o login',
}
