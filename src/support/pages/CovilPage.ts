import { Page, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import CovilElements from '../elements/CovilElements';
import BasePage from './BasePage';

export default class CovilPage extends BasePage {
  readonly covilElements: CovilElements;

  constructor(page: Page) {
    super(page);
    this.covilElements = new CovilElements(page);
  }

  async abrir(caminho: string): Promise<void> {
    await this.page.goto(caminho, { waitUntil: 'domcontentloaded' });
  }

  // Cenário 1 - Home
  async validarHome(): Promise<void> {
    await expect(this.page).toHaveTitle(/Covil do Mineiro/);
    await expect(this.covilElements.getHeroTitle()).toHaveText(
      'Aqui é o Covil do Mineiro.'
    );
    await expect(this.covilElements.getSecaoEventos()).toBeVisible();
    await expect(this.covilElements.getSecaoLoja()).toBeVisible();
  }

  async navegarParaLojaPeloMenu(): Promise<void> {
    await this.covilElements.getMenuLoja().click();
  }

  async validarPaginaLoja(): Promise<void> {
    await expect(this.page).toHaveURL(/\/loja$/);
    await expect(this.page).toHaveTitle(/Loja/);
    await expect(this.covilElements.getTituloPagina()).toHaveText('Loja');
    await expect(this.covilElements.getCampoBusca()).toBeVisible();
    await expect(this.covilElements.getCardsProdutos().first()).toBeVisible();
  }

  // Cenário 2 - Loja
  async buscarProduto(termo: string, nomeEsperado: string): Promise<void> {
    // O campo pode ser preenchido antes da hidratação do Next.js;
    // repete o preenchimento até o filtro da loja ser aplicado.
    await expect(async () => {
      await this.covilElements.getCampoBusca().clear();
      await this.covilElements.getCampoBusca().fill(termo);
      await expect(this.covilElements.getNomesProdutos()).toHaveText(
        [nomeEsperado],
        { timeout: 3000 }
      );
    }).toPass({ timeout: 30000 });
  }

  async validarResultadoBusca(nomeProduto: string): Promise<void> {
    await expect(this.covilElements.getCampoBusca()).toHaveValue(/.+/);
    await expect(this.covilElements.getNomesProdutos()).toHaveCount(1);
    await expect(this.covilElements.getNomesProdutos().first()).toHaveText(
      nomeProduto
    );
  }

  async abrirProduto(slug: string): Promise<void> {
    await this.covilElements.getCardProduto(slug).click();
  }

  async validarDetalheProduto(slug: string, nome: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`/loja/${slug}$`));
    await expect(this.covilElements.getTituloPagina()).toHaveText(nome);
    await expect(this.page.locator('main')).toContainText(/R\$\s?\d+,\d{2}/);
    await expect(this.covilElements.getVoltarLoja()).toBeVisible();
  }

  // Cenário 3 - Login
  async tentarLoginComCredenciaisInvalidas(): Promise<void> {
    await this.covilElements.getCampoEmail().fill(faker.internet.email());
    await this.covilElements
      .getCampoSenha()
      .fill(faker.internet.password({ length: 12 }));
    await this.covilElements.getBotaoEntrar().click();
  }

  async validarErroLogin(): Promise<void> {
    await expect(this.page).toHaveURL(/\/login\?error=credentials/);
    await expect(this.covilElements.getMensagemErroLogin()).toBeVisible();
    await expect(this.covilElements.getCampoEmail()).toBeVisible();
  }
}
