# UC_005 - Responder pedido de truco dos adversários

## Ator principal
Jogador

## Objetivo
Decidir se aceita, recusa ou aumenta um pedido de truco feito pelos adversários.

## Pré-condições
* Existe um pedido de truco pendente feito pelos adversários.

## Pós-condições
* O pedido foi resolvido: o valor da mão foi atualizado, a mão foi encerrada ou
um novo pedido foi feito.

## Fluxo principal

1. O sistema exive a mensagem do pedido e as opções *Aceitar, Correr* e, se 
possível, o *Aumento*.
2. O jogador escolhe *Aceitar* 
3. O sistema atualiza o valor da mão para o valor pedido.
4. O sistema registra que o último pedido foi dos adversários.
5. O jogo continua de onde parou.

## Fluxos alternativos/exceções

### FA_001 - Correr
* Os adversários ganham os pontos do valor vigente antes do pedido e o sistema
executa o UC_009 - *Encerrar mão e atribuir pontos* 

### FA_002 - Aumentar
* O valor pedido é aceito, o sistema registra um novo pedido da dupla do jogador
com o valor seguinte e execta o UC_007 - *Responder pedido de truco pelos bots*. 

### FA_003 - Pedido de 12 pontos
* Não há aumento possível, o jogador só corre ou aceita.

## Resultado
Pedido dos adversários resolvido.
