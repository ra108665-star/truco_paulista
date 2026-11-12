# UC_001 - Iniciar partida

## Ator principal
Jogador

## Objetivo
Começar uma nova partida de Truco Paulista, uma dupla contra outra dupla.

## Pré-condições
* A aplicação deve estar carregada no navegador.

## Pós-condições
* O placar está em 0 x 0.
* A primeira mão foi iniciada e a mesa está exibida.

## Fluxo principal

1. O jogador abre o jogo no navegador.
2. O  sistema zera o placar o placar das duas duplas.
3. O sistema sorteia qual jogador abre a primeira mão.
4. O sistema executa o UC_002 - *Iniciar nova mão* 
5. O sistema exibe a mesa com o placar e as cartas do jogador.

## Fluxos alternativos/exceções

### FA_001 - Reinício após o fim de uma partida

* Caso uma partida tenha terminado, o jogador aperta "Jogar novamente", o 
sistema retoma o fluxo principal a partir do passo 2.
 
## Resultado
Partida inciada e pronta para a primeira jogada.
