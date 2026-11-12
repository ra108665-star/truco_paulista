# UC_012 - Encerrar partida

## Ator principal
Sistema

## Objetivo
Finalizar a partida quando uma dupla atinge 12 pontos e informar o resultado ao
jogador.

## Pré-condições
* Uma das duplas atingiu 12 ou mais pontos.

## Pós-condições
* A partida está encerrada e nenhuma jogada é aceita.
* O jogador pode iniciar uma nova partida.

## Fluxo principal

1. O sistema detecta a dupla que atingiu 12 pontos.
2. O sistema interrompe as jogadas dos bots e a distribuição de novas mãos.
3. O sistema exibe a mensagem de vitória, pois a dupla do jogador venceu.
4. O sistema exibe a opção *Jogar novamente* 
5. Ao acioná-la, o jogador executa o UC_001.

## Fluxos alternativos/exceções

### FA_001 - Derrota
* Se os adversários atingirem 12 pontos, o sistema exibe a mensagem de derrota e
segue a partir do passo 4.

## Resultado
Partida encerrada com vencedor definido.
