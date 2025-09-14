const wait = (ms)=> new Promise(r=>setTimeout(r,ms));
export async function fetchDashboard(){ await wait(200); return {
  nextMatch:{ opponent:"As Panteras", dateISO:new Date(Date.now()+86400000).toISOString(), venue:"Arena Suzano", lat:-23.5445, lng:-46.3111 },
  stats:[{id:"xp",label:"XP semanal",value:1280,diff:"+18%"},{id:"minutes",label:"Minutos jogados",value:320,diff:"+6%"},{id:"goals",label:"Gols",value:7,diff:"+2"},{id:"streak",label:"Streak (dias)",value:9,diff:"🔥"}],
};}
let TICKER=[{home:"Fênix",away:"Corujas",score:"2–1",minute:73},{home:"Estrelas",away:"Panteras",score:"0–0",minute:38},{home:"Passa a Bola",away:"Furacão",score:"3–2",minute:90}];
export async function fetchTicker(){ await wait(300); return [TICKER[0]]; }
export async function fetchBadges(){ await wait(200); return [
  { id:"cap", label:"Capitã Assídua", desc:"Confirmou presença 8x seguidas", owned:true },
  { id:"fair", label:"Fair-Play", desc:"0 faltas em 5 jogos", owned:true },
  { id:"hat", label:"Hat-trick", desc:"3 gols em um jogo", owned:false },
  { id:"clean", label:"Clean Sheet", desc:"Sem sofrer gols", owned:false },
]; }
export async function fetchTeam(){ await wait(200); return {
  id:"passa-a-bola", name:"Passa a Bola",
  roster:[ {id:1,name:"Rafa",position:"MEI"}, {id:2,name:"Luana",position:"ATA"}, {id:3,name:"Ale",position:"ZAG"} ],
  availability:[ {id:1,name:"Rafa",status:"Vou"}, {id:2,name:"Luana",status:"Talvez"}, {id:3,name:"Ale",status:"Vou"} ]
};}
export async function fetchMatches(){ await wait(240); const base=Date.now(); return [
  { id:1, dateISO:new Date(base+86400000).toISOString(), home:"Passa a Bola", away:"Panteras", venue:"Arena Suzano", lat:-23.5445, lng:-46.3111 },
  { id:2, dateISO:new Date(base+2*86400000).toISOString(), home:"Fênix", away:"Corujas", venue:"CEU Guaianases", lat:-23.52, lng:-46.36 },
  { id:3, dateISO:new Date(base+5*86400000).toISOString(), home:"Estrelas", away:"Furacão", venue:"Parque Linear", lat:-23.57, lng:-46.29 },
]; }
export async function fetchLeaderboard(){ await wait(180); return [
  { id:1, pos:1, name:"Luana", team:"Fênix", xp:1540 },
  { id:2, pos:2, name:"Rafa", team:"Passa a Bola", xp:1480 },
  { id:3, pos:3, name:"Ale", team:"Estrelas", xp:1340 },
  { id:4, pos:4, name:"Nina", team:"Corujas", xp:1200 },
  { id:5, pos:5, name:"Vivi", team:"Furacão", xp:1110 }
]; }
export async function fetchTeams(){ await wait(160); return [
  { id:"passa-a-bola", name:"Passa a Bola", city:"Suzano/SP", players:18 },
  { id:"fenix", name:"Fênix", city:"Guaianases/SP", players:16 },
  { id:"corujas", name:"Corujas", city:"Poá/SP", players:17 },
  { id:"panteras", name:"Panteras", city:"Itaquera/SP", players:15 },
  { id:"estrelas", name:"Estrelas", city:"Mogi/SP", players:19 },
]; }

export async function fetchPlayer(id){
  // Mock rápido; trocamos pelo Supabase depois
  await new Promise(r => setTimeout(r, 200));
  const base = {
    id: "luana",
    name: "Luana",
    nationality: "BRASIL",
    league: "Liga Feminina SP",
    club: "Passa a Bola",
    playStyle: "Armadora criativa",
    age: 23,
    footed: "destro",
    inspirations: [
      { label: "Carregando a bola", stars: 2 },
      { label: "Passe rasteiro", stars: 3 },
      { label: "Passe alto",        stars: 2 },
    ],
    stats: { dri: 92, chu: 90, pas: 88, vel: 95, def: 58, forc: 78 },
  };

  // Dá pra variar por id se quiser:
  if(String(id) === "nina"){
    base.name = "Nina";
    base.stats = { dri: 84, chu: 76, pas: 82, vel: 91, def: 62, forc: 71 };
    base.footed = "canhoto";
  }

  return base;
}