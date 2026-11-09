import { test } from '@playwright/test';
import { join } from 'node:path';
import { TheConfig } from 'sicolo';
import CovilPage from '../support/pages/CovilPage';

test.describe('Covil do Mineiro - Home', () => {
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.covil')
    .retrieveData();
  let covilPage: CovilPage;

  test.beforeEach(async ({ page }) => {
    covilPage = new CovilPage(page);
    await covilPage.abrir(BASE_URL);
  });

  test('Deve carregar a home e navegar pelo menu até a Loja', async () => {
    await covilPage.validarHome();
    await covilPage.navegarParaLojaPeloMenu();
    await covilPage.validarPaginaLoja();
  });
});
