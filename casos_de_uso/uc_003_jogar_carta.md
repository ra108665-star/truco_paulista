# UC_003 - Jogar carta

## Ator principal
Jogador

## Objetivo
Jogar uma das cartas da mão na vez do jogador.

## Pré-condições
* A mão está em andamento e é a vez do jogador.
* Não há pedido de truco pendente nem vaza sendo resolvida 

## Pós-condições
* A carta foi removida da mão e está exposta na mesa.
* A vez passou para o próximo jogador, ou a vaza foi encaminhada para resolução.

## Fluxo principal

1. O sistema destaca que é a vez do jogador e habilita suas cartas.
2. O jogador seleciona uma carta.
3. O sistema remove a carta da mão do jogador.
4. O sistema exibe a carta na mesa.
5. O sistema passa a vez ao próximo jogador.
6. Se as quatro cartas da vaza estiverem na mesa, o sistema executa o UC_008 
*resolver vaza*.

## Fluxos alternativos/exceções

### FA_001 - Fora da vez
* Caso não seja a vez do jogador, as cartas permanecem desabilitadas e nenhuma 
jogada é aceita.

### FA_002 - Pedido de truco pendente
* Caso haja pedido pendente, o jogador só pode jogar após responder UC_005
*Responder pedido de truco dos adversários* 

### FA_003 - Mão de ferro
* As cartas do jogador são exibidas viradas e ele joga sem ver o valor da carta.

## Resultado
Carta jogada e vez repassada.
