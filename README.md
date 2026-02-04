# ⭐ Desafio Técnico – Desenvolvedor(a) Front-End (Next.js)

​

## ⭐ Objetivo

​
Desenvolver uma aplicação web com **Next.js** que consuma a [REST Countries API](https://restcountries.com/#rest-countries), permitindo ao usuário explorar e visualizar informações sobre países de forma interativa e responsiva.
​

---

​

## ⭐ Contexto

​
A aplicação será um catálogo de países com recursos de filtragem e visualização de detalhes. O usuário deve poder:
​

- Navegar por uma lista de países.
- Filtrar por:
  - Nome do país (busca textual).
  - Continente (checkboxes).
  - Idioma (select).
- Acessar uma página com detalhes do país selecionado.
  ​

---

​

## ⭐ Layout

Segue links do layout para aplicação:
  - [Figma Componentes](https://www.figma.com/design/uqRKSNiAtLlHWzg6qs7J0v/TESTE-FRONT-PLAN?node-id=0-1&p=f)
  - [Figma Apresentação](https://www.figma.com/proto/uqRKSNiAtLlHWzg6qs7J0v/TESTE-FRONT-PLAN?node-id=2-615&t=jAEkXLJ8nXUMIDD4-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1)

**A responsividade deve ser aplicada para manter o layout mais coerente com o definido acima.**

---

​

## ⭐ Requisitos Técnicos

​

- Utilizar **Next.js** como framework principal ([https://nextjs.org/](https://nextjs.org/)).
- Utilizar **ESLint**, conforme [documentação oficial](https://nextjs.org/docs/app/api-reference/config/eslint).
- Utilizar **TypeScript**
- Garantir **responsividade** da aplicação.
- Exibir as informações dos países **em português**, quando disponível, utilizando o campo `translations.por` da versão `v3.1` da REST Countries API.
- Código organizado, componentizado e limpo.
  ​

---

​

## ⭐ Funcionalidades Esperadas

​

### 1. Página Inicial

- Lista de países com:
  - Nome (em português)
  - Bandeira
  - Região
- Filtros:
  - **Busca por nome**
  - **Filtro por continente** (checkbox)
  - **Filtro por idioma** (select)
    ​

### 2. Página de Detalhes

- Informações completas de um país:
  - Nome oficial
  - População
  - Moeda
  - Línguas faladas
  - Bandeira
  - Região / Sub-região
    ​

---

​

## ⭐ Diferenciais (Desejável, não obrigatório)

​

- Estilização moderna: **TailwindCSS**, **CSS Modules**
- Configuração de **Prettier** e **ESLint**
- Considerações básicas de acessibilidade
  ​

---

## ⭐ Considerações sobre o repositório

​

Este projeto deve ser utilizado como base para o desenvolvimento do seu teste. Alguns componentes estão presentes apenas como exemplo para o desenvolvedor, e devem ser removidos antes do início efetivo do desenvolvimento do teste.

​

## ⭐ Entrega

​

1. Faça um fork do repositório público <link do repositorio>.
2. Inclua no `README.md` as seguintes informações:
   - Instruções para rodar localmente.
   - Breve explicação sobre suas escolhas técnicas.
   - Link do deploy (se houver).
3. Submeta o link do repositório e, se aplicável, do deploy.
   ​
   Boa sorte! Estamos ansiosos para ver sua solução. 🚀

​

## ⭐ Instruções

### Pré-requisitos
- Node.js 18.x ou superior
- npm 9.x ou superior

### Instalação e execução local

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd plan-frontend-test

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev
```

O aplicativo estará disponível em `http://localhost:3000` (ou `http://localhost:3001` se a porta 3000 estiver em uso).

### Scripts disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento com Turbopack
- `npm run build` - Cria a build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o ESLint
- `npm run format` - Formata o código com Prettier e ESLint

---

## ⭐ Breve explicação das escolhas técnicas

### Arquitetura e Estrutura

**Componentização:** A aplicação foi estruturada seguindo o princípio de componentes reutilizáveis e desacoplados:
- `Layout/` - Header e Footer compartilhados entre as páginas
- `CountryCard/` - Card de exibição de países com header de região
- `Filters/` - Componentes de filtro (SearchInput, ContinentCheckboxes, LanguageSelect)
- `Pagination/` - Componente de paginação com navegação por dots

**Custom Hooks:** Criado o hook `useCountries` para encapsular toda a lógica de:
- Busca de dados da API
- Filtragem (por nome, continente e idioma)
- Paginação
- Estados de loading e erro

### Estilização

**SCSS Modules:** Optei por CSS Modules com SCSS por:
- Escopo de classes isolado por componente
- Suporte a variáveis e mixins SCSS
- Evita conflitos de estilos globais
- Melhor organização do código CSS

**Variáveis SCSS:** Todas as cores, fontes e breakpoints estão centralizados em `variables.scss` para facilitar manutenção e consistência visual.

### Consumo da API

**REST Countries API v3.1:** 
- Utilizado o endpoint `/all` com filtro de campos para otimizar a resposta
- Tradução automática para português usando o campo `translations.por`
- Mapeamento de regiões e sub-regiões para português

**Tratamento de erros:** Implementado feedback visual com react-toastify para erros de rede.

### Acessibilidade

- Labels apropriados em inputs e botões
- Atributos ARIA em componentes interativos (listbox, checkboxes)
- Navegação por teclado nos dropdowns
- Contraste adequado de cores

### Performance

- Imagens otimizadas com Next.js Image (flags via unoptimized pois são SVGs externos)
- Paginação para evitar renderização de muitos cards
- Memoização com useMemo e useCallback para evitar re-renders desnecessários

---

## ⭐ Link do deploy (se houver)

*Em breve...*
