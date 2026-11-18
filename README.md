# Rastro Edu — Sistema de Gestão Escolar

O **Rastro Edu** é uma plataforma web criada para facilitar a rotina da secretaria e da coordenação escolar. Com ele, dá para controlar a matrícula dos alunos, fazer a chamada diária, identificar quem está faltando demais e organizar o estoque da cantina em um só lugar.

O sistema roda direto no navegador e salva as informações localmente no próprio computador. Isso significa que a escola não precisa contratar servidores caros nem configurar bancos de dados complexos para começar a usar.

---

## O que o sistema faz na prática

* **Painel Principal:** Mostra um resumo rápido do dia assim que você entra, com o total de alunos matriculados, a porcentagem de presença, alertas de produtos acabando na cantina e alunos com risco de abandono escolar. Tudo acompanhado de gráficos simples de entender.
* **Cadastro de Alunos:** Guarda a ficha completa do estudante (nome, matrícula, turma, turno, data de nascimento e contato dos responsáveis), permitindo buscar qualquer aluno rapidamente e acompanhar sua porcentagem de presença.
* **Chamada e Controle de Faltas:** Permite registrar presença, falta ou falta justificada por turma e por data, com um botão para marcar toda a sala como presente de uma vez. O sistema calcula automaticamente quem atingiu 25% ou mais de faltas e coloca o aluno na lista de atenção.
* **Controle da Cantina:** Organiza o estoque de alimentos, bebidas, descartáveis e materiais de limpeza. Você registra o que entra e o que sai no dia a dia, e o sistema avisa quando algum item atinge o limite mínimo.
* **Relatórios Prontos para Impressão:** Gera documentos completos de frequência mensal, risco de evasão, movimentação da cantina e visão geral da escola, já formatados para imprimir ou salvar em PDF.
* **Configurações e Backup:** Deixa personalizar o nome e os dados da escola para o cabeçalho dos relatórios, trocar entre modo claro e escuro, mudar a cor principal do sistema e exportar ou importar uma cópia de segurança de todos os dados a qualquer momento.

---

## Organização dos Arquivos

Para o sistema funcionar direitinho, mantenha os arquivos separados nas seguintes pastas:

```text
rastro-edu/
├── index.html        # Telas, menus e formulários do sistema
├── css/
│   └── style.css     # Visual, cores, temas claro/escuro e ajuste para impressão
├── js/
│   └── app.js        # Regras de funcionamento, cálculos, gráficos e salvamento
└── README.md         # Este guia de apresentação
```

---

## Como abrir e testar

1. Baixe os arquivos do projeto para uma pasta no seu computador, mantendo a estrutura mostrada acima.
2. Dê um duplo clique no arquivo `index.html` para abri-lo no seu navegador de preferência (Chrome, Edge, Firefox, etc.).
3. Na tela de entrada, utilize o acesso padrão:
   * **Usuário:** `admin`
   * **Senha:** `1234`

*Observação: Assim que você entra pela primeira vez, o sistema preenche automaticamente uma base de teste com 30 alunos, chamadas dos últimos dias e itens na cantina para você explorar todas as telas sem precisar cadastrar tudo do zero.*

---

## Sobre o Projeto e Impacto na Escola

Nas rotinas de muitas escolas, o controle de presença ainda é feito em cadernos de chamada e o estoque da cantina é anotado em planilhas soltas ou no papel. Quando esses dados ficam espalhados, a coordenação demora para perceber que um aluno está faltando muito ou que um ingrediente básico acabou na cozinha.

O objetivo ao construir o **Rastro Edu** foi centralizar essas duas frentes críticas — o acompanhamento pedagógico e o controle de suprimentos — em uma ferramenta única, rápida e que funcionasse até mesmo em computadores mais simples da secretaria, sem depender de internet instável para registrar o dia a dia.

Para resolver esse problema, foi desenvolvida uma interface limpa e direta, onde a própria equipe da escola consegue lançar a frequência em poucos cliques, registrar entradas e saídas da despensa e extrair relatórios prontos para reuniões pedagógicas ou prestação de contas, além de contar com um sistema de backup simples em arquivo para garantir a segurança das informações.

Como resultado, a gestão ganha agilidade no acompanhamento diário e passa a agir de forma preventiva: os alertas automáticos permitem entrar em contato com as famílias antes que as faltas virem evasão escolar e evitam a falta inesperada de mantimentos na cantina, tornando a administração mais organizada e eficiente.