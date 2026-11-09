import { test } from '@playwright/test';
import { join } from 'node:path';
import { TheConfig } from 'sicolo';
import CovilPage from '../support/pages/CovilPage';

test.describe('Covil do Mineiro - Loja', () => {
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.covil')
    .retrieveData();
  let covilPage: CovilPage;

  test.beforeEach(async ({ page }) => {
    covilPage = new CovilPage(page);
    await covilPage.abrir(`${BASE_URL}loja`);
  });

  test('Deve buscar um produto e abrir a página de detalhes', async () => {
    await covilPage.buscarProduto('caneca', 'Kit Caneca + Tirante 2026');
    await covilPage.validarResultadoBusca('Kit Caneca + Tirante 2026');
    await covilPage.abrirProduto('kit-caneca-tirante-2026');
    await covilPage.validarDetalheProduto(
      'kit-caneca-tirante-2026',
      'Kit Caneca + Tirante 2026'
    );
  });
});
