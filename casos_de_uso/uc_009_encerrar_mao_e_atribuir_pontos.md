# UC_009 - Encerrar mão e atribuir pontos

## Ator principal
Sistema

## Objetivo
Creditar à dupla vencedora, os pontos da mão e preparar a próxima mão ou o fim
da partida.

## Pré-condições
* A mão tem uma dupla vencedora, por vazas ou por desistência.

## Pós-condições
* O placar foi atualizado.
* Uma nova mão foi iniciada ou a partida foi encerrada.

## Fluxo principal

1. O sistema identifica a dupla vencedora da mão.
2. O sistema soma ao placar da dupla o valor vigente da mão.
3. O sistema exibe a mensagem com o resultado da mão.
4. O sistema verifica que nenhuma dupla chegou a 12 pontos.
5. O sistema passa o direito de abrir a mão ao próximo jogador.
6. O sistema executa o UC_002.

## Fluxos alternativos/exceções

### FA_001 - Mão encerrada por desistência
* Quando uma dupla corre, a dupla que pediu ganha o valor vigente antes do
pedido.

### FA_002 - Dupla atinge 12 pontos
* O sistema executa o UC_012.

## Resultado
Placar atualizado e jogo em andamento ou encerrado.
