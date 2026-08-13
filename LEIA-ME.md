# Eloá – 4 anos 🍓 Sistema de confirmação

## Arquivos
- `index.html` — porta do bosque que abre e revela o convite
- `confirmar.html` — busca de convidado → confirma ou recusa → gera ticket com QR code (mesmo fluxo do convite da Carmem, no estilo fofo do bosque dos morangos)
- `presente.html` — sugestões de presente + Pix (toque pra copiar)
- `localizacao.html` — endereço + botão pro Google Maps
- `admin.html` — painel para acompanhar as confirmações (PIN: `0410`, troque no código se quiser)
- `Codigo.gs` — backend Google Apps Script (instruções de deploy dentro do próprio arquivo)
- `assets/` — as 3 artes que você mandou (portão, convite, sugestões)

## Passo a passo pra colocar no ar

1. **Planilha**: crie uma Google Planilha nova, renomeie a primeira aba pra `Convidados` e monte o cabeçalho:
   `Nome | Adultos | Criancas | Telefone | Status | DataConfirmacao`
   Preencha `Nome`, `Adultos` e `Criancas` pra cada convidado — o resto o sistema preenche sozinho.

   Lista já combinada:

   | Nome | Adultos | Criancas |
   |---|---|---|
   | Larissa | 2 | 0 |
   | Bruna | 2 | 1 |
   | Thiago | 2 | 0 |
   | Brígida | 1 | 0 |

   Pra colar direto na planilha a partir da célula A1:
   ```
   Nome	Adultos	Criancas	Telefone	Status	DataConfirmacao
   Larissa	2	0
   Bruna	2	1
   Thiago	2	0
   Brígida	1	0
   ```

2. **Apps Script**: na planilha, vá em Extensões → Apps Script, apague o conteúdo padrão e cole o `Codigo.gs`.

3. **Publicar**: Implantar → Nova implantação → tipo "App da Web" → executar como "Eu" → acesso "Qualquer pessoa". Copie a URL gerada.

4. **Conectar o site**: abra `confirmar.html` e `admin.html`, ache a linha `const GAS_URL = "COLE_AQUI..."` e troque pela URL que você copiou.

5. **GitHub Pages**: sobe tudo pro repo `eloa-4-anos` na sua conta (`lariparo-prog`), ativa o Pages e pronto — o link fica em `https://lariparo-prog.github.io/eloa-4-anos/`.

## Pendências que você combinou de ajustar
- Endereço do buffet: coloquei um placeholder (Buffet Doce Bosque, Curitiba-PR) em `localizacao.html` — só trocar quando fechar o local de verdade.
- Prazo de RSVP: já configurado como 26/09 no texto de `confirmar.html`.
- Pix: formatado como `+55 17 99144-5659`.

Qualquer coisa é só me chamar que a gente ajusta! 🍓
