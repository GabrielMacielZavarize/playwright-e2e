import { Locator } from '@playwright/test';
import BaseElements from './BaseElements';

export default class CovilElements extends BaseElements {
  // Home
  getHeroTitle(): Locator {
    return this.page.locator('main h1');
  }

  getSecaoEventos(): Locator {
    return this.page.locator('section#eventos');
  }

  getSecaoLoja(): Locator {
    return this.page.locator('section#loja');
  }

  getMenuLoja(): Locator {
    return this.page.locator(
      'header nav[aria-label="Navegação principal"] a[href="/loja"]'
    );
  }

  // Loja
  getTituloPagina(): Locator {
    return this.page.locator('main h1');
  }

  getCampoBusca(): Locator {
    return this.page.locator('main input[type="search"]');
  }

  getCardsProdutos(): Locator {
    return this.page.locator('main a[href^="/loja/"]:has(h3)');
  }

  getNomesProdutos(): Locator {
    return this.page.locator('main a[href^="/loja/"] h3');
  }

  getCardProduto(slug: string): Locator {
    return this.page.locator(`main a[href="/loja/${slug}"]:has(h3)`);
  }

  getVoltarLoja(): Locator {
    return this.page.locator('main a[href="/loja"]', {
      hasText: 'Voltar à loja'
    });
  }

  // Login
  getCampoEmail(): Locator {
    return this.page.locator('input#email[type="email"]');
  }

  getCampoSenha(): Locator {
    return this.page.locator('input#password[type="password"]');
  }

  getBotaoEntrar(): Locator {
    return this.page.locator('form:has(#email) button[type="submit"]');
  }

  getMensagemErroLogin(): Locator {
    return this.page.locator('p', { hasText: 'Email ou senha incorretos' });
  }
}
