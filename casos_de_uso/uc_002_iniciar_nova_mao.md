# UC_002 - Iniciar nova mão

## Ator principal
Sistema

## Objetivo
Preparar uma mão, sorteiar e distribuir as cartas, definir vira e manilha e
verificar situações especiais de pontuação.

## Pré-condições
* Há uma partida em andamento, sem vencedor.

## Pós-condições
* Cada jogador tem 3 cartas e a vira está definida.
* A mão vale 1 ponto (ou 3, na mão de onze) e as vazas estão zeradas.
* A vez é do jogador que abre a mão.

## Fluxo principal

1. O osistema monta o baralho de 40 cartas (sem 8, 9 e 10).
2. O sistema embaralha as cartas.
3. O sistema distribui 3 cartas para cada um dos 4 participantes.
4. O sistema vira a próxima carta do baralho (vira) e determina a manilha.
5. O sistema define o valor da mão como 1 ponto.
6. O sistema verifica se alguma dupla tem 11 pontos.
7. O sistema passa a vez para o jogador que abre a mão.

## Fluxos alternativos/exceções

### FA_001 - Dupla do jogador com 11 pontos
* O sistema executa o UC_010 (Decidir mão de onze)

### FA_002 - As duas duplas com 11 pontos
* O sistema executa o UC_011 (Jogar mão de ferro)

### FA_003 - Adversários com 11 pontos 
* O sistema sorteia a decisão dos adversários. Se correrem, a dupla do jogador
pontua 1 ponto, senão uma nova mão é iniciada. Se jogarem, a mão passa a valer 3
pontos e o truco fica indisponível.

## Resultado
Mão pronta para ser jogada.
