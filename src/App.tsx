import { useEffect, useState } from 'react'
import './App.css'

type Card = { r: string; s: number }
type Played = { p: number; c: Card }
type G = {
  score: [number, number]
  hands: Card[][]
  vira: Card
  mao: number
  turn: number
  played: Played[]
  tricks: number[] // 0 = sua dupla, 1 = adversários, -1 = empate (embucha)
  stake: number
  raiser: number
  pending: { team: number; to: number } | null
  resolve: boolean
  ask11: boolean
  noRaise: boolean
  iron: boolean
  winner: number
  log: string
}

// Ordem das cartas, da mais fraca para a mais forte (sem manilha)
const RANKS = ['4', '5', '6', '7', 'Q', 'J', 'K', 'A', '2', '3']
// Naipes na ordem das manilhas: ouros < espadas < copas < paus
const SUITS = ['♦', '♠', '♥', '♣']
const NAMES = ['Você', 'Adversário 1', 'Parceiro', 'Adversário 2']
const NEXT: Record<number, number> = { 1: 3, 3: 6, 6: 9, 9: 12 }
const CALL: Record<number, string> = { 3: 'TRUCO', 6: 'SEIS', 9: 'NOVE', 12: 'DOZE' }

const team = (p: number) => p % 2
const rand = (n: number) => Math.floor(Math.random() * n)
const manilha = (v: Card) => RANKS[(RANKS.indexOf(v.r) + 1) % RANKS.length]
const power = (c: Card, v: Card) => (c.r === manilha(v) ? 100 + c.s : RANKS.indexOf(c.r))
const who = (t: number) => (t === 0 ? 'Sua dupla' : 'Adversários')

function deal() {
  const d = RANKS.flatMap((r) => SUITS.map((_, s) => ({ r, s })))
  for (let i = d.length - 1; i > 0; i--) {
    const j = rand(i + 1)
    ;[d[i], d[j]] = [d[j], d[i]]
  }
  return { hands: [0, 1, 2, 3].map((i) => d.slice(i * 3, i * 3 + 3)), vira: d[12] }
}

function newHand(score: [number, number], mao: number, log = ''): G {
  const { hands, vira } = deal()
  const g: G = {
    score, hands, vira, mao, turn: mao, played: [], tricks: [], stake: 1,
    raiser: -1, pending: null, resolve: false, ask11: false, noRaise: false,
    iron: false, winner: -1, log,
  }
  if (score[0] === 11 && score[1] === 11)
    return { ...g, iron: true, noRaise: true, log: 'Mão de ferro: ninguém vê as cartas e não há truco.' }
  if (score[0] === 11)
    return { ...g, ask11: true, noRaise: true, log: 'Mão de onze! Veja suas cartas: jogar vale 3 pontos.' }
  if (score[1] === 11) {
    if (Math.random() < 0.5)
      return newHand([score[0] + 1, 11], (mao + 1) % 4, 'Adversários correram da mão de onze (+1 para vocês).')
    return { ...g, stake: 3, noRaise: true, log: 'Adversários jogam a mão de onze (vale 3).' }
  }
  return g
}

function award(g: G, t: number, pts: number, msg: string): G {
  const score = [...g.score] as [number, number]
  score[t] += pts
  if (score[t] >= 12) return { ...g, score, winner: t, log: msg, pending: null, resolve: false }
  return newHand(score, (g.mao + 1) % 4, msg)
}

// Regras de empate (embucha): 1ª empatada → vale a 2ª; 1ª vencida + 2ª empatada → vale a 1ª;
// 3 empates → ganha a dupla do "mão" (quem começou a rodada).
function handWinner(t: number[], mao: number): number | null {
  if (t.length < 2) return null
  const [a, b] = t
  if (a !== -1 && a === b) return a
  if (a === -1 && b !== -1) return b
  if (a !== -1 && b === -1) return a
  if (t.length === 3) {
    if (t[2] !== -1) return t[2]
    return a !== -1 ? a : mao
  }
  return null
}

function finishTrick(g: G): G {
  const best = [-1, -1]
  const owner = [-1, -1]
  g.played.forEach(({ p, c }) => {
    const t = team(p)
    const w = power(c, g.vira)
    if (w > best[t]) { best[t] = w; owner[t] = p }
  })
  const res = best[0] === best[1] ? -1 : best[0] > best[1] ? 0 : 1
  const lead = res === -1 ? g.played[0].p : owner[res]
  const tricks = [...g.tricks, res]
  const w = handWinner(tricks, team(g.mao))
  const base: G = { ...g, played: [], resolve: false, tricks, turn: lead }
  if (w === null)
    return { ...base, log: res === -1 ? 'Embuchou! A vaza empatou.' : `${who(res)} ganhou a vaza.` }
  return award(base, w, g.stake, `${who(w)} ganhou a mão (+${g.stake}).`)
}

function play(g: G, p: number, ci: number): G {
  const c = g.hands[p][ci]
  const hands = g.hands.map((h, i) => (i === p ? h.filter((_, k) => k !== ci) : h))
  const played = [...g.played, { p, c }]
  return { ...g, hands, played, resolve: played.length === 4, turn: (p + 1) % 4, log: '' }
}

const canRaise = (g: G, t: number) =>
  !g.noRaise && !g.pending && !g.resolve && !g.ask11 && g.winner < 0 && g.raiser !== t && g.stake < 12

function ask(g: G, t: number): G {
  const to = NEXT[g.stake]
  return { ...g, pending: { team: t, to }, log: `${who(t)} pediu ${CALL[to]}!` }
}

function respond(g: G, a: 'accept' | 'run' | 'raise'): G {
  const { team: asker, to } = g.pending!
  const r = 1 - asker
  if (a === 'run')
    return award({ ...g, pending: null }, asker, g.stake, `${r === 0 ? 'Você correu' : 'Adversários correram'} (+${g.stake} para ${asker === 0 ? 'vocês' : 'eles'}).`)
  const acc: G = { ...g, stake: to, raiser: asker, pending: null, log: 'Aceito! A mão agora vale ' + to + '.' }
  if (a === 'accept') return acc
  const up = NEXT[to]
  return { ...acc, raiser: r, pending: { team: r, to: up }, log: `${who(r)} aumentou: ${CALL[up]}!` }
}

function CardView({ c, vira, hidden, onClick, small }: { c?: Card; vira: Card; hidden?: boolean; onClick?: () => void; small?: boolean }) {
  const cls = ['card']
  if (small) cls.push('small')
  if (!c || hidden) cls.push('back')
  else {
    if (c.s === 0 || c.s === 2) cls.push('red')
    if (c.r === manilha(vira)) cls.push('manilha')
  }
  return (
    <button className={cls.join(' ')} disabled={!onClick} onClick={onClick}>
      {c && !hidden ? <><b>{c.r}</b><span>{SUITS[c.s]}</span></> : ''}
    </button>
  )
}

export default function App() {
  const [g, setG] = useState<G>(() => newHand([0, 0], rand(4)))

  useEffect(() => {
    if (g.winner >= 0 || g.ask11) return
    let t: number | undefined
    if (g.resolve) {
      t = window.setTimeout(() => setG((x) => finishTrick(x)), 1400)
    } else if (g.pending) {
      if (g.pending.team === 0)
        t = window.setTimeout(() => setG((x) => {
          const r = Math.random()
          if (r < 0.3) return respond(x, 'run')
          if (r < 0.8 || !NEXT[x.pending!.to]) return respond(x, 'accept')
          return respond(x, 'raise')
        }), 1000)
    } else if (g.turn !== 0) {
      t = window.setTimeout(() => setG((x) => {
        const p = x.turn
        if (canRaise(x, team(p)) && Math.random() < 0.1) return ask(x, team(p))
        return play(x, p, rand(x.hands[p].length))
      }), 1000)
    }
    return () => clearTimeout(t)
  }, [g])

  const myTurn = g.turn === 0 && !g.pending && !g.resolve && !g.ask11 && g.winner < 0
  const seat = (p: number) => (
    <div className={`seat ${g.turn === p && !g.resolve ? 'active' : ''}`}>
      <div className="name">{NAMES[p]}</div>
      <div className="hand">
        {g.hands[p].map((c, i) => (
          <CardView
            key={i}
            c={c}
            vira={g.vira}
            hidden={p !== 0 || g.iron}
            small={p !== 0}
            onClick={p === 0 && myTurn ? () => setG((x) => play(x, 0, i)) : undefined}
          />
        ))}
      </div>
    </div>
  )

  return (
    <main className="mesa">
      <header>
        <div className="placar">
          <div><small>Nós</small><strong>{g.score[0]}</strong></div>
          <div className="valor"><small>Mão vale</small><strong>{g.stake}</strong></div>
          <div><small>Eles</small><strong>{g.score[1]}</strong></div>
        </div>
        <div className="vira">
          <small>Vira</small>
          <CardView c={g.vira} vira={g.vira} small />
          <small>Manilha: {manilha(g.vira)}</small>
        </div>
        <div className="vazas">
          {[0, 1, 2].map((i) => (
            <i key={i} className={g.tricks[i] === undefined ? '' : g.tricks[i] === 0 ? 'nos' : g.tricks[i] === 1 ? 'eles' : 'emp'} />
          ))}
        </div>
      </header>

      <section className="campo">
        <div className="top">{seat(2)}</div>
        <div className="left">{seat(3)}</div>
        <div className="centro">
          {g.played.map(({ p, c }) => (
            <div key={p} className="jogada">
              <CardView c={c} vira={g.vira} small />
              <small>{NAMES[p]}</small>
            </div>
          ))}
        </div>
        <div className="right">{seat(1)}</div>
        <div className="bottom">{seat(0)}</div>
      </section>

      <footer>
        <p className="log">{g.winner >= 0 ? (g.winner === 0 ? 'Vitória! Sua dupla chegou a 12.' : 'Derrota. Os adversários chegaram a 12.') : g.log || (myTurn ? 'Sua vez de jogar.' : '\u00a0')}</p>
        <div className="acoes">
          {g.winner >= 0 && <button onClick={() => setG(newHand([0, 0], rand(4)))}>Jogar novamente</button>}
          {g.ask11 && (
            <>
              <button onClick={() => setG({ ...g, ask11: false, stake: 3 })}>Jogar (vale 3)</button>
              <button className="sec" onClick={() => setG(award(g, 1, 1, 'Você correu da mão de onze (+1 para eles).'))}>Correr</button>
            </>
          )}
          {g.pending && g.pending.team === 1 && (
            <>
              <button onClick={() => setG(respond(g, 'accept'))}>Aceitar</button>
              <button className="sec" onClick={() => setG(respond(g, 'run'))}>Correr</button>
              {NEXT[g.pending.to] && <button onClick={() => setG(respond(g, 'raise'))}>Pedir {CALL[NEXT[g.pending.to]]}</button>}
            </>
          )}
          {canRaise(g, 0) && g.turn === 0 && <button onClick={() => setG(ask(g, 0))}>Pedir {CALL[NEXT[g.stake]]}</button>}
        </div>
      </footer>
    </main>
  )
}
