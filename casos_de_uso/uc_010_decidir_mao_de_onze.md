# UC_010 - Decidir mão de onze

## Ator principal
Jogador

## Objetivo
Decidir se a dupla, com 11 pontos, joga a mão valendo 3 pontos ou corre.

## Pré-condições
* A dupla do jogador tem 11 pontos e os adversários têm menos de 11.

## Pós-condições
* A mão foi jogada valendo 3 pontos, sem truco, ou encerrada com 1 ponto para os
adversários.

## Fluxo principal

1. O sistema exibe as cartas do jogador e informa que é mão de onze.
2. O sistema apresenta as opções *Jogar (vale 3)* e *Correr*.
3. O jogadaor escolhe *Jogar*.
4. O sistema define o valor da mão como 3 e desabilita o truco.
5. O jogo prossegue normalmente a partir do UC_003.

## Fluxos alternativos/exceções

### FA_001 - Correr
* O sistema dá 1 ponto aos adversários e executa o UC_002 para a mão seguinte.

## Resultado
Mão de onze decidida.
