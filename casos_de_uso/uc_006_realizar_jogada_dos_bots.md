# UC_006 - Realizar jogada dos bots

## Ator principal
Sistema (Parceiro, Adverśario 1 e Adversário 2)

## Objetivo
Fazer os jogadores controlados pelo sistema jogarem um carta escolhida de forma
aleatória.

## Pré-condições
* É a vez do bot e não há pedido pendente nem vaza em resolução.

## Pós-condições
* O bot jogou uma carta, que está na mesa, e a vez passou ao próximo jogador.

## Fluxo principal

1. O sistema identifica que é a vez de um bot.
2. O sistema aguarda cerca de 1 segundo.
3. O sistema sorteia uma das cartas restantes do bot com `rand()`.
4. O sistema remove a carta da mão do bot e a exibe na mesa.
5. O sistema passa a vez ao próximo jogador.
6. Se as quatro cartas da vaza estiverem na mesa, o sistena executao UC_008 -
*Resolver vaza* 

## Fluxos alternativos/execeções

### FA_001 - Bot pede truco
* Quando o pedido é permitido, o bot tem 10% de chance de pedir truco em vez de
jogar. Se for um adversário, o jogador responde pelo UC-005; se for o parceiro,
adversários respondem pelo UC_007 - *Responder pedido de truco pelos bots* 

### FA_002 - Jogador interrompe com pedido
* Se o jogador pedir truco durante a espera, a jogada do bot é adiada até a
resolução do pedido.

## Resultado
Jogada do bot finalizada.
