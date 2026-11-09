import { test } from '@playwright/test';
import { join } from 'node:path';
import { TheConfig } from 'sicolo';
import CovilPage from '../support/pages/CovilPage';

test.describe('Covil do Mineiro - Login', () => {
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.covil')
    .retrieveData();
  let covilPage: CovilPage;

  test.beforeEach(async ({ page }) => {
    covilPage = new CovilPage(page);
    await covilPage.abrir(`${BASE_URL}login`);
  });

  test('Deve exibir erro ao entrar com credenciais inválidas', async () => {
    await covilPage.tentarLoginComCredenciaisInvalidas();
    await covilPage.validarErroLogin();
  });
});
