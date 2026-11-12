# UC_007 - Responder pedido de truco pelos bots

## Ator principal
Sistema(adversários)

## Objetivo
Responder de forma aleatória a um pedido de truco feito pela dupla do jogador.

## Pré-condições
* Existe um pedido pendente feito pelo jogador ou pelo Parceiro bot.

## Pós-condições
* O pedido foi aceito, recusado ou aumentado.

## Fluxo principal

1. O sistema aguarda cerca de 1 segundo.
2. O sistema sorteia a resposta dos adversários.
3. O sistema aceita o pedido (50% de chance).
4. O sistema atualiza o valor da mão e exibe a mensagem de aceite.
5. O jogo continua.

## Fluxos alternativos/exceções

### FA_001 - Adversários correm (30%)
* A dupla que pediu ganha os pontos do valor vigente e o sistema executa o
UC_009.

### FA_002 - Adversários aumentam (20%)
* O sistema aceita o valor pedido e faz um novo pedido com o valor seguinte; o 
jogador responde pelo UC_005.

### FA_003 - Pedido de 12 pontos
* Os adversários não aumentam, apenas aceitam ou correm.

## Resultado
Pedido de truco resolvido.
