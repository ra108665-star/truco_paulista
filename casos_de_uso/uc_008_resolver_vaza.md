# UC_008 - Resolver vaza

## Ator principal
Sistema

## Objetivo
Determinar qual dupla ganhou a vaza e definir se a mão terminou.

## Pré-condições
* As quatro cartas da vaza estão na mesa.

## Pós-condições
* O resultado da vaza está registrado, a mesa está limpa e a vez doi definida.

## Fluxo principal

1. O sistema mantém as quatro cartas visíveis por cerca de 1,4 segundo.
2. O sistema calcula a força de cada carta considerando a manilha.
3. O sistema identifica a carta mais forte de cada dupla.
4. O sistema compara as duas e define a dupla vencedora da vaza.
5. O sistema registra o resultado no indicador de vazas.
6. O sistema define como abridor da próxima vaza o jogador que jogou a carta
vencedora.
7. O sistema limpa a mesa.
8. O sistema avalia se a mão já tem vencedor; se não, a próxima vaza começa.

## Fluxos alternativos/exceções

### FA_001 - Vaza empatada
* As cartas mais fortes das duplas têm a mesma força. O sistema registra empate
e quem abriu a vaza abre a próxima.

### FA_002 - Mão decidida
* Se o resultado das vazas já determina uma dupla vencedora (duas vazas ganhas
ou regra de empate), o sistema executa o UC_009.

## Resultado
Vaza resolvida e andamento da mão atualizado.
