# UC_004 - Pedir truco ou aumento

## Ator principal
Jogador

## Objetivo
Elevar o valor da mão para um múltiplo positivo de 3 até no máximo 12 pontos.

## Pré-condições
* A mão está em andamento e é a vez dos jogador.
* Não há pedido pendente, e a dupla do jogador não fez o último aumento.
* O valor atual da mão é menor que 11.

## Pós-condições
* Há um pedido pendente aguardando a resposta dos adversários

## Fluxo principal

1. O sistema exibe o botão com o próximo valor disponível (TRUCO, SEIS, NOVE ou
DOZE).
2. O jogador aciona o botão
3. O sistema valida que o pedido é permitido.
4. O sistema registra o pedido e exibe a mensagem correspondente.
5. O sistema executa o UC_007 - *Responder pedido de truco pelos bots* 
6. Se os adversários aceitarem, o sistema atualiza o valor da mão e o jogo
continua.

## Fluxos alternativos/exceções

### FA_001 - Pedido não permitido
* Se as pré-condições não forem atendidas, o botão não é exibido

### FA_002 - Adversários correm 
* A dupla do jogador recebe os pontos do valor vigente antes do pedido e o 
sistema executa o UC_009 - *Encerrar mão e atribuir pontos* 

### FA_003 - Adversários aumentam
* O pedido pendente passa a ser dos adversários e o sistema executa o UC_005 -
*Responder pedido de truco dos adversários* 

## Resultado
Valor da mão elevado ou mão encerrada por desistência.
