# UC_011 - Jogar mão de ferro

## Ator principal
Jogador

## Objetivo
Disputar a mão decisiva em que as duas duplas têm 11 pontos.

## Pré-condições
* As duas duplas têm 11 pontos.

## Pós-condições
* A dupla vencedora da mão vence a partida.

## Fluxo principal

1. O sistema infroma que é mão de ferro.
2. O sistema exibe as cartas do jogador viradas.
3. O sistema define o valor da mão como 1 ponto e desabilita o truco.
4. O jogador e os bots jogam as cartas (UC-003 e UC-006).
5. O sistema resolve as vazas (UC-008) e encerra a mão (UC-009).

## Fluxos alternativos/exceções

### FA_001 - Tentativa de pedir truco
* Nenhum pedido é permitido, por isso não há botões.

## Resultado
Mão de ferro concluída e partida decidida.
