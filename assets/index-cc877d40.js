var fe=Object.defineProperty;var je=(s,t,n)=>t in s?fe(s,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):s[t]=n;var se=(s,t,n)=>(je(s,typeof t!="symbol"?t+"":t,n),n);import{X as ye,j as e,B as L,S as ie,r as f,d as F,C as S,f as oe,L as O,a as te,b as ne,c as ve,e as ge,F as A,g as P,I as $,h as we,i as be,k as ke,A as le,l as Se,u as Ne,R as me,m as K,M as N,n as z,o as Q,p as V,q as U,s as ce,t as Ce,v as Re,w as Me,x as ue,H as Ae,y as Pe,z as H,N as B,D as q,E as Le,G as Ie,J as Ee}from"./vendor-9d18dea8.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function n(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(a){if(a.ep)return;a.ep=!0;const o=n(a);fetch(a.href,o)}})();const Be={$id:"/Player",type:"object",required:["id","name"],properties:{id:{type:"number"},name:{type:"string"},present:{type:"boolean"}}},Fe={$id:"/Game",type:"object",anyOf:[{required:["id","stage","round","n","p1id"]},{required:["id","stage","round","n","p2id"]}],properties:{id:{type:"number"},stage:{type:"string",enum:["seed","elim"]},round:{type:"number"},n:{type:"number"},p1id:{type:"number"},p2id:{type:"number"},p1points:{type:"number"},p2points:{type:"number"},p1twenties:{type:"number"},p2twenties:{type:"number"},gameRounds:{type:"array",items:{type:"object",properties:{p1points:{type:"number"},p2points:{type:"number"}}}}}};class Te extends ye{constructor(){super("crokinole-tourney");se(this,"players");se(this,"games");this.version(1).stores({players:"++id, name",games:"++id, stage, p1id, p2id"})}async anyData(){return!!(await this.players.count()||await this.games.count())}async reset(n){n||await p.players.clear(),await p.games.clear()}async replace(n){const{players:r,games:a=[]}=n;await p.games.clear(),await p.players.bulkPut(r),await p.games.bulkPut(a)}}const p=new Te;const ae=s=>{const{working:t,children:n}=s,r=s.disabled||t;let a=(s.className||"")+" btn-working";t&&(a+=" working");const o={...s,disabled:r,className:a};return delete o.children,delete o.working,e.jsxs(L,{...o,children:[e.jsx("span",{children:n}),e.jsx("span",{className:"spinner",children:e.jsx(ie,{as:"span",animation:"border",size:"sm",role:"status","aria-hidden":"true"})})]})},G=s=>s>0?Array.from(Array(Math.floor(s)).keys()):[],he=(s,t,n)=>Math.min(Math.max(t,s),n),Y=s=>{let t=s.length;for(;t>0;){const n=Math.floor(Math.random()*t--);[s[t],s[n]]=[s[n],s[t]]}return s};function $e(s,...t){let n;return typeof t[0]=="function"&&(n=t.shift()),t.forEach(r=>{const a=n?s.findIndex(o=>n(o,r)):s.indexOf(r);a>=0&&(s=s.splice(a,1))}),s}const Ge=["Joey Tribbiani","Rachel Green","Monica Geller","Phoebe Buffay","Chandler Bing","Ross Geller","Fraiser Crane","Niles Crane","Daphne Moon","Roz Doyle","Martin Crane","Jerry Seinfeld","George Costanza","Elain Benes","Cosmo Kramer","Fran Fine","Max Sheffield","C.C. Babcock","Niles","Maggie Sheffield","Brighton Sheffield","Gracie Sheffield","Will Truman","Grace Adler","Karen Walker","Jack McFarland","Carrie Bradshaw","Charlotte York","Miranda Hobbes","Samantha Jones","Homer Simpson","Marge Simpson","Bart Simpson","Lisa Simpson","Maggie Simpson","Ned Flanders","Moe Szyslak","Seymour Skinner","Apu Nahasapeemapetilon","Barney Gumble","Clancy Wiggum","Kent Brockman","Jim Kirk","Spock","Montgomery Scott","Leonard McCoy","Nyota Uhura","Hikaru Sulu","Pavel Chekov","Jean-Luc Picard","William Riker","Geordi La Forge","Tasha Yar","Worf","Beverly Crusher","Diana Troi","Data","Wesley Crusher","Christopher Pike","Christine Chapel","La'an Noonien-Singh","Erica Ortegas","Joseph M'Benga","Una Chin-Riley","Clark Kent","Louis Lane","Jimmy Olsen","Perry White","Lex Luthro","Lana Lang","Vicki Vale","Luke Charles","Heracles Panhellenios","Dane Whitman","Victor Shade","Clint Barton","Peter Parker","Bruce Banner","Steve Rogers","Pietro Maximoff","Thor Odinson","Janet Van Dyne","Hank Pym","Tony Stark","Wanda Maximoff","Carol Danvers","Bucky Barnes","Natasha Romanoff","Sam Wilson","Steven Strange","Jessica Jones","Trish Walker","Maria Hill","Ben Grimm","Matt Murdock","Susan Storm","Reed Richards","Amadeus Cho","Jimmy Howlett","Nick Fury","Phil Coulson","Hubert Wolfeschlegelsteinhausenbergerdorff"],De=async(s,t=0)=>{const n=Y(Ge).slice(0,s).map((r,a)=>({name:r,present:a>=t}));return p.players.bulkAdd(Y(n))},de=(s,t)=>n=>n.p1id==s.id&&n.p2id==t.id||n.p1id==t.id&&n.p2id==s.id,ze=(s,t)=>{for(let n=0;n<s.length;n+=2){let r=t.find(de(s[n],s[n+1])),a=n+2;for(;r!=null&&a<s.length;)[s[n+1],s[a]]=[s[a],s[n+1]],r=t.find(de(s[n],s[n+1])),a+=1}},re=(s,t,n=!0,r=!1)=>{let o,l,c,i;const d=s==null||t==null,m=[];if(n){const y=s>t?.75:s==null?0:1;o=l=0,c=i=0;for(let j=0;j<4;j++)if(!d&&Math.random()<.02){o+=1,l+=1,m.push({p1points:1,p2points:1});const x=Math.floor(Math.random()*5);c+=x,i+=x}else if(Math.random()<y){if(o+=2,m.push({p1points:2,p2points:0}),!d){const x=Math.floor(Math.random()*5);c=x,i=Math.floor(Math.random()*x)}}else if(l+=2,m.push({p1points:0,p2points:2}),!d){const x=Math.floor(Math.random()*5);i=x,c=Math.floor(Math.random()*x)}if(r&&o==l&&c==i){const j=Math.floor(Math.random()*5);Math.random()<.5?(o+=2,c+=j,i+=Math.floor(Math.random()*j)):(l+=2,i+=j,c+=Math.floor(Math.random()*j))}}return{p1points:o,p2points:l,p1twenties:c,p2twenties:i,gameRounds:m}},X=(s,t)=>{if(t.length==0)return Y(s);const n={};return t.forEach(r=>{if(r.p1id!=null){const a=n[r.p1id]=n[r.p1id]||{points:0,twenties:0};a.points+=r.p1points||0,a.twenties+=r.p1twenties||0}if(r.p2id!=null){const a=n[r.p2id]=n[r.p2id]||{points:0,twenties:0};a.points+=r.p2points||0,a.twenties+=r.p2twenties||0}}),s.sort((r,a)=>{const o=r.id==null?Number.NEGATIVE_INFINITY:r.id,l=a.id==null?Number.NEGATIVE_INFINITY:a.id,c=n[o]||{points:0,twenties:0},i=n[l]||{points:0,twenties:0};return c.points>i.points?-1:c.points<i.points?1:c.twenties>i.twenties?-1:c.twenties<i.twenties?1:0}),s},We=async(s,t)=>{s=Math.max(0,s);const{randomScores:n=!1}=t||{};let r=await p.games.filter(i=>i.stage=="seed"&&i.round===s).toArray();const a=await p.players.filter(i=>!!i.present).toArray(),o=r.filter(i=>i.p1points!=null||i.p2points!=null);if(o.length>0&&o.forEach(i=>$e(a,(d,m)=>d.id==m,i.p1id,i.p2id)),a.length%2!=0&&a.push({name:"bye"}),s===0)Y(a);else{const i=await p.games.filter(d=>d.stage=="seed"&&d.round<s).toArray();X(a,i),ze(a,i)}const l=r.filter(i=>i.p1points==null&&i.p2points==null);await p.games.bulkDelete(l.map(i=>i.id)),r=o;for(let i=0;i<a.length;i+=2){const d=a[i].id,m=a[i+1].id,{p1points:y,p2points:j,p1twenties:x,p2twenties:w,gameRounds:k}=re(d,m,n);r.push({stage:"seed",round:s,n:i/2,p1id:d,p2id:m,p1points:y,p2points:j,p1twenties:x,p2twenties:w,gameRounds:k})}console.log("games",r);const c=await p.games.bulkAdd(r);return console.log("ngames",c),c},_=s=>{if(s.p1id==null)return s.p2id;if(s.p2id==null||s.p1points>s.p2points)return s.p1id;if(s.p1points<s.p2points)return s.p2id;if(s.p1twenties>s.p2twenties)return s.p1id;if(s.p1twenties<s.p2twenties)return s.p2id},Oe=async(s,t,n)=>{const{randomScores:r=!1,removeExisting:a=!1}=n||{},o=await p.games.filter(c=>c.stage=="elim"&&c.round>=s).toArray();if(o.length>0)if(a)await p.games.bulkDelete(o.map(c=>c.id));else throw new Error(`games for elimination round ${s} already exist`);const l=[];if(s==0){const c=await p.games.filter(d=>d.stage=="seed").toArray();let i=await p.players.filter(d=>!!d.present).toArray();i.length%2!=0&&i.push({name:"bye"}),X(i,c),i=i.slice(0,t);for(let d=0;d<i.length/2;d++){const m=i[d].id,y=i[i.length-1-d].id,{p1points:j,p2points:x,p1twenties:w,p2twenties:k}=re(m,y,r,!0);l.push({stage:"elim",round:s,n:d,p1id:m,p2id:y,p1points:j,p2points:x,p1twenties:w,p2twenties:k})}}else{const i=(await p.games.filter(d=>d.stage=="elim"&&d.round==s-1).toArray()).reduce((d,m)=>{const y=_(m);return y!=null&&d.push(y),d},[]);for(let d=0;d<i.length;d+=2){const m=i[d],y=i[d+1],{p1points:j,p2points:x,p1twenties:w,p2twenties:k}=re(m,y,r,!0);l.push({stage:"elim",round:s,n:d,p1id:m,p2id:y,p1points:j,p2points:x,p1twenties:w,p2twenties:k})}}return p.games.bulkAdd(l)},D=({done:s,icon:t,doneIcon:n,iconColor:r="var(--bs-gray-400)",doneIconColor:a="var(--bs-success)",children:o})=>e.jsxs("div",{className:"d-flex m-1 align-items-center",children:[e.jsx(A,{style:{minWidth:"1.5em"},size:"2x",icon:s!=!0?t:n||t,color:s?a:r})," ",s==!0?e.jsx("del",{children:o}):e.jsx("span",{children:o})]}),He=()=>{const[s,t]=f.useState(!1),n=F.useLiveQuery(async()=>{const d=await p.players.toArray(),m=await p.games.toArray(),y=v=>v.p1points==null||v.p2points==null,j=m.filter(v=>v.stage=="elim"&&v.round==0),x=Math.floor(Math.log2(j.length)),w=m.filter(v=>v.stage=="seed"&&v.round==0),k=m.filter(v=>v.stage=="elim"&&v.round==x-1),I=m.find(v=>v.stage=="elim"&&v.round==x);return{anyplayers:d.length>0,anypresent:d.find(v=>!!v.present)!=null,seedzerodone:w.length>0&&w.find(y)==null,semifinaldone:k.length>0&&k.find(y)==null,finaldone:I!=null&&!y(I)}}),{anyplayers:r=!1,anypresent:a=!1,seedzerodone:o=!1,semifinaldone:l=!1,finaldone:c=!1}=n||{};if(!n)return e.jsx(ie,{});const i=async()=>{t(!0),setTimeout(()=>t(!1),1e3),De(20,5).then(()=>G(4).forEach(d=>{We(d,{randomScores:!0})})).then(()=>G(3).forEach(d=>{const m=Math.pow(2,3-d);Oe(d,m,{randomScores:m>2})}))};return e.jsxs("div",{className:"get-started",children:[e.jsxs("h1",{className:"w-100 text-center mt-3 mb-3",children:["Welcome to ",e.jsx("b",{children:"Crokinole Tourney"})]}),e.jsxs("div",{className:"d-flex gap-3 flex-wrap justify-content-center",children:[e.jsx(S,{children:e.jsx(S.Body,{children:e.jsxs("div",{children:["Just 6 easy steps!",e.jsxs(D,{done:r,icon:oe,children:["1. Add player names to the ",e.jsx(O,{to:"/players",children:"Players"})," tab."]}),e.jsxs(D,{done:a,icon:oe,children:["2. Register players as present on the ",e.jsx(O,{to:"/players",children:"Players"})," tab."]}),e.jsxs(D,{done:o,icon:te,doneIcon:ne,children:["3. Score seed stage games on the ",e.jsx(O,{to:"/matches",children:"Matches"})," tab."]}),e.jsxs(D,{icon:ve,children:["4. View rankings of seed stage on the ",e.jsx(O,{to:"/rankings",children:"Rankings"})," tab."]}),e.jsxs(D,{done:l,icon:te,doneIcon:ne,children:["5. Score elimination stage games on the ",e.jsx(O,{to:"/matches",children:"Matches"})," tab."]}),e.jsx(D,{done:c,icon:ge,doneIconColor:"var(--bs-orange)",children:"6. Score the final game!"})]})})}),r?void 0:e.jsx(S,{children:e.jsxs(S.Body,{children:[e.jsxs("div",{className:"text-center",children:["To see how it all works, use a ",e.jsx("i",{children:"demo tournament"})," to add random players and game scores, then score the final game!",e.jsx("br",{})]}),e.jsx("div",{className:"mt-3 text-center",children:e.jsx(ae,{working:s,onClick:i,children:"Demo Tournament"})})]})})]})]})},qe=()=>e.jsx(e.Fragment,{children:e.jsx(He,{})});function Je(s){const t=f.useRef(null),n=f.useCallback(r=>{t.current&&!t.current.contains(r.target)&&s()},[s]);return f.useEffect(()=>(document.addEventListener("click",n,!0),()=>document.removeEventListener("click",n,!0)),[n]),t}const Ke=s=>{const t=s.player,[n,r]=f.useState((t==null?void 0:t.name)||""),a=g=>{r(g),t&&p.players.update(t.id,{name:g.trim()})},o=!!s.present,l=g=>{t&&p.players.update(t.id,{present:g})},c=()=>l(!o),d=(F.useLiveQuery(()=>p.players.where("name").equalsIgnoreCase(n.trim()).count(),[n])||0)<=1,y=(F.useLiveQuery(async()=>{const g=await p.games.where("p1id").equals((t==null?void 0:t.id)||-1).count(),T=await p.games.where("p2id").equals((t==null?void 0:t.id)||-1).count();return g+T},[t==null?void 0:t.id])||0)>0,[j,x]=f.useState(!1),w=async()=>{(t==null?void 0:t.id)!=null&&(j?await p.players.delete(t.id):x(!0))},k=Je(()=>{x(!1)}),I=j?"danger":"outline-secondary",v=j?e.jsx(e.Fragment,{children:"Remove Player"}):e.jsx(A,{icon:be}),W=t&&!n.trim()||!d,R=n.trim()?"Duplicate player name":"Player name is empty";return e.jsx(P,{className:"player-input",onSubmit:g=>g.preventDefault(),children:e.jsxs($,{children:[e.jsx($.Text,{children:e.jsx(P.Check,{type:"switch",checked:o,onChange:c})}),e.jsx(P.Control,{type:"text",placeholder:"Player name",value:n,onChange:g=>a(g.target.value),isInvalid:W}),e.jsx(P.Control.Feedback,{tooltip:!0,type:"invalid",children:R}),y?e.jsx($.Text,{className:"lock",children:e.jsx(A,{icon:we})}):e.jsx(L,{ref:k,variant:I,onClick:w,onBlur:()=>x(!1),children:v})]})})};const Qe=()=>{const[s,t]=f.useState(""),[n,r]=f.useState(!1),a=()=>r(!n),l=(F.useLiveQuery(()=>p.players.where("name").equalsIgnoreCase(s.trim()).count(),[s])||0)==0,c=m=>{m.preventDefault(),s.trim()&&p.players.add({name:s.trim(),present:n}).then(()=>t(""))},i=!l,d="Duplicate player name";return e.jsx(P,{onSubmit:c,className:"add-player-input",children:e.jsxs($,{children:[e.jsx($.Text,{children:e.jsx(P.Check,{type:"switch",checked:n,onChange:a})}),e.jsx(P.Control,{type:"text",placeholder:"Player name",value:s,onChange:m=>t(m.target.value),isInvalid:i}),e.jsx(P.Control.Feedback,{tooltip:!0,type:"invalid",children:d}),e.jsx(L,{type:"submit",children:"Add Player"})]})})},Ve=()=>{const[s,t]=f.useState(!1),n=()=>t(!s),r=F.useLiveQuery(async()=>s?await p.players.orderBy("name").toArray():await p.players.toArray(),[s])||[],a=r.length?!r.find(l=>!l.present):!1,o=async()=>{r.forEach(l=>p.players.update(l.id,{present:!a}))};return e.jsx("div",{className:"players",children:e.jsxs("div",{className:"d-grid mt-4 gap-2",children:[e.jsxs("div",{className:"tool-bar",children:[e.jsx(P.Check,{id:"all-present",style:{marginLeft:"17px"},disabled:!r.length,type:"switch",checked:a,onClick:o,label:"All players present"}),e.jsx(L,{size:"sm",variant:"link",className:s?"active":"inactive",onClick:n,children:e.jsx(A,{size:"xl",icon:ke})})]}),e.jsx("div",{className:"d-flex flex-wrap gap-2",children:r.map(l=>e.jsx(Ke,{player:l,present:l.present},l.id))}),e.jsx(Qe,{})]})})};const Ue=({eventKey:s,children:t,callback:n})=>{const{activeEventKey:r}=f.useContext(Se),a=r===s,o=Ne(s,()=>n&&n(s));return e.jsx(S.Header,{as:"button",className:`accordion-button h5${a?"":" collapsed"}`,onClick:o,"aria-expanded":a,children:t})},pe=({title:s,children:t})=>e.jsx(le,{defaultActiveKey:"0",children:e.jsxs(S,{children:[e.jsx(Ue,{eventKey:"0",children:s}),e.jsx(le.Collapse,{eventKey:"0",children:t})]})}),Z=f.createContext({seedrounds:4,setSeedrounds:s=>{},log2elimplayers:3,setLog2elimplayers:s=>{}});const Ye=s=>Math.ceil(Math.log2(s)),_e=({nplayers:s,className:t})=>{const{seedrounds:n,setSeedrounds:r}=f.useContext(Z),a=1,o=s==null?4:Ye(s);return f.useEffect(()=>{s!=null&&r(l=>he(l,a,o))},[s,a,o,r]),e.jsx(me,{className:t,value:n,size:"sm",onChange:l=>r(Number.parseInt(l.target.value)),min:a,max:o,tooltipPlacement:"top"})};const xe=({g:s,p1:t,p2:n})=>{const a=s.stage=="seed"?"bye":"",[o,l]=f.useState(!1),c=(s==null?void 0:s.p1points)!=null&&(s==null?void 0:s.p2points)!=null,i=!t&&!n,d=c?"success":"outline-secondary",m=c?ne:te,y=(t==null?void 0:t.name)||a,j=(n==null?void 0:n.name)||a,x=s!=null?_(s):void 0,w=x!==void 0&&x==(t==null?void 0:t.id),k=x!==void 0&&x==(n==null?void 0:n.id),I=async u=>{u.p1points=J("p1"),u.p2points=J("p2"),u.p1points==0&&u.p2points==0&&(u.p1points=u.p2points=void 0),u.id==null?await p.games.add(u):await p.games.update(u.id,u)},v=(u,C)=>{s.gameRounds||(s.gameRounds=Array(C)),s.gameRounds[C]||(s.gameRounds[C]={p1points:1,p2points:1});const h=[{p1points:0,p2points:0},{p1points:2,p2points:0},{p1points:0,p2points:2},{p1points:1,p2points:1}],M=s.gameRounds[C].p1points*10+s.gameRounds[C].p2points;let b=0;switch(`${u}-${M}`){case"p1-0":b=1;break;case"p1-20":b=2;break;case"p1-2":b=3;break;case"p1-11":b=0;break;case"p2-0":b=2;break;case"p2-2":b=1;break;case"p2-20":b=3;break;case"p2-11":b=0;break}s.gameRounds[C]=h[b],I(s)},W=u=>{s.p1twenties=u,I(s)},R=u=>{s.p2twenties=u,I(s)},g=(u,C)=>{const h=s.gameRounds!=null?s.gameRounds[C]:{};let M,b;switch(u){case"p1":M=h==null?void 0:h.p1points,b=h==null?void 0:h.p2points;break;case"p2":M=h==null?void 0:h.p2points,b=h==null?void 0:h.p1points;break}if(M!=null&&!(M==0&&b==0))return M},T=(u,C)=>{const h=g(u,C);return h??"?"},E=(u,C)=>{const h=s.gameRounds!=null?s.gameRounds[C]:{};let M,b;switch(u){case"p1":M=h==null?void 0:h.p1points,b=h==null?void 0:h.p2points;break;case"p2":M=h==null?void 0:h.p2points,b=h==null?void 0:h.p1points;break}return M>b?"success":M<b?"danger":M==null||M==0?"outline-secondary":"secondary"},J=u=>G(4).reduce((C,h)=>(C+=g(u,h)||0,C),0);return e.jsxs("div",{className:"game-control",children:[e.jsxs("div",{children:[e.jsx("div",{children:e.jsxs("div",{className:`p1${w?" p1-winner":""} ${t==null?"bye":""}`,children:[y," ",w?e.jsx(A,{color:"orange",icon:K}):""]})}),e.jsx("div",{children:e.jsxs("div",{className:`p2${k?" p2-winner":""} ${n==null?"bye":""}`,children:[j," ",k?e.jsx(A,{color:"orange",icon:K}):""]})})]}),e.jsx(L,{variant:d,size:"sm",className:"round",disabled:i,onClick:()=>l(!0),children:e.jsx(A,{icon:m,size:"xl"})}),e.jsxs(N,{size:"lg",className:"score-modal",show:o,onHide:()=>l(!1),children:[e.jsxs(N.Header,{closeButton:!0,children:[y," v. ",j]}),e.jsx(N.Body,{children:e.jsxs(z,{children:[e.jsx(z.Item,{children:e.jsxs("div",{className:"p1-score",children:[e.jsxs("div",{className:`name p1${w?" p1-winner":""} ${t==null?"bye":""}`,children:[y," ",w?e.jsx(A,{color:"orange",icon:K}):""]}),G(4).map(u=>e.jsx("div",{className:"game",children:e.jsx(L,{variant:E("p1",u),onClick:()=>v("p1",u),children:T("p1",u)})},u)),e.jsx("div",{className:"points",children:e.jsxs(Q,{children:[e.jsx(V,{children:"PTS"}),e.jsx(U,{readOnly:!0,value:J("p1")})]})}),e.jsx("div",{className:"twenties",children:e.jsxs(Q,{children:[e.jsx(V,{children:"20S"}),e.jsx(U,{value:s.p1twenties,type:"number",pattern:"[0-9]*",onChange:u=>W(Number.parseInt(u.target.value))})]})})]})}),e.jsx(z.Item,{children:e.jsxs("div",{className:"p2-score",children:[e.jsxs("div",{className:`name p2${k?" p2-winner":""} ${n==null?"bye":""}`,children:[j," ",k?e.jsx(A,{color:"orange",icon:K}):""]}),G(4).map(u=>e.jsx("div",{className:"game",children:e.jsx(L,{variant:E("p2",u),onClick:()=>v("p2",u),children:T("p2",u)})},u)),e.jsx("div",{className:"points",children:e.jsxs(Q,{children:[e.jsx(V,{children:"PTS"}),e.jsx(U,{readOnly:!0,value:J("p2")})]})}),e.jsx("div",{className:"twenties",children:e.jsxs(Q,{children:[e.jsx(V,{children:"20S"}),e.jsx(U,{value:s.p2twenties,type:"number",pattern:"[0-9]*",onChange:u=>R(Number.parseInt(u.target.value))})]})})]})})]})})]})]})};const Xe=({round:s,players:t,games:n})=>{const r=n.filter(a=>a.round==s);return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"seed-round-title",children:["Round ",s+1]}),e.jsx("div",{className:"seed-round d-flex flex-wrap gap-2 justify-content-center",children:r.map(a=>{const o=a?t.find(c=>c.id==(a==null?void 0:a.p1id)):void 0,l=a?t.find(c=>c.id==(a==null?void 0:a.p2id)):void 0;return e.jsx(xe,{g:a,p1:o,p2:l},a.n)})})]})},Ze=({nrounds:s,players:t,games:n})=>e.jsx(ce,{className:"seed-stage","data-bs-theme":"dark",interval:null,children:G(s).map(r=>e.jsx(ce.Item,{children:e.jsx(Xe,{round:r,players:t,games:n})},r))}),es=s=>Math.pow(2,Math.trunc(Math.log2(s))),ss=({nplayers:s,className:t})=>{const{log2elimplayers:n,setLog2elimplayers:r}=f.useContext(Z),a=1,o=s==null?3:Math.log2(es(s));return f.useEffect(()=>{s!=null&&r(l=>he(l,a,o))},[s,a,o,r]),e.jsx(me,{className:t,value:n,size:"sm",onChange:l=>r(Number.parseInt(l.target.value)),min:a,max:o,tooltipLabel:l=>Math.pow(2,l).toString(),tooltipPlacement:"top"})};const ts=({player:s})=>e.jsx("div",{className:"winner-wrapper",children:e.jsx("div",{className:`winner${s?"":" empty"}`,children:s==null?void 0:s.name})}),ns=({round:s,players:t,games:n})=>{const r=t.length/Math.pow(2,s+1),a=n.filter(o=>o.round==s);return e.jsx("div",{className:"elim-round",children:G(r).map(o=>{const l=a.find(d=>d.n==o)||{stage:"elim",round:s,n:o,p1id:void 0,p2id:void 0},c=l?t.find(d=>d.id==(l==null?void 0:l.p1id)):void 0,i=l?t.find(d=>d.id==(l==null?void 0:l.p2id)):void 0;return e.jsx(xe,{g:l,p1:c,p2:i},o)})})},as=({players:s,games:t})=>{let n=0;for(let r=s.length;r>1;r/=2)n++;return e.jsx(e.Fragment,{children:e.jsxs("div",{className:`elim-stage elim-${Math.pow(2,n)}`,children:[G(n).map(r=>e.jsx(ns,{round:r,players:s,games:t},r)),e.jsx(ts,{player:void 0})]})})},rs=()=>{const s=F.useLiveQuery(async()=>await p.players.filter(c=>!!c.present).toArray())||[],t=F.useLiveQuery(async()=>await p.games.where("stage").equals("seed").toArray())||[],n=F.useLiveQuery(async()=>await p.games.where("stage").equals("elim").toArray())||[],{seedrounds:r,log2elimplayers:a}=f.useContext(Z),o=Math.pow(2,a),l=X(s,t).slice(0,o);return e.jsxs("div",{className:"matches d-grid gap-4 mt-4",children:[e.jsx(pe,{title:"Seed Stage",children:e.jsxs(e.Fragment,{children:[e.jsx(S.Body,{className:"pt-0 pb-0",children:e.jsx(_e,{nplayers:s.length})}),e.jsx(S.Body,{children:e.jsx(Ze,{nrounds:r,players:s,games:t})})]})}),e.jsx(pe,{title:"Elimination Stage",children:e.jsxs(e.Fragment,{children:[e.jsx(S.Body,{className:"pt-0 pb-0",children:e.jsx(ss,{nplayers:s.length})}),e.jsx(S.Body,{children:e.jsx(as,{players:l,games:n})})]})})]})};const is=({rank:s,player:t,games:n})=>{let r=0,a=0;const o=n.reduce((l,c)=>{if(c.p1id==t.id){r+=c.p1points||0,a+=c.p1twenties||0;const i=_(c);i==t.id?l.push("win"):i!=null?l.push("loss"):l.push("draw")}else if(c.p2id==t.id){r+=c.p2points||0,a+=c.p2twenties||0;const i=_(c);i==t.id?l.push("win"):i!=null?l.push("loss"):l.push("draw")}return l},[]);return e.jsx(z.Item,{children:e.jsxs("div",{className:"rank-item",children:[e.jsx("div",{className:"rank",children:s+1}),e.jsx("div",{className:"name",children:t.name}),e.jsx("div",{className:"record",children:o.map(l=>e.jsx("span",{className:l,children:l.charAt(0).toUpperCase()}))}),e.jsx("div",{className:"points",children:r}),e.jsx("div",{className:"twenties",children:a})]})})},os=()=>{const s=F.useLiveQuery(async()=>{const r=await p.players.filter(o=>!!o.present).toArray(),a=await p.games.where("stage").equals("seed").toArray();return X(r,a),{players:r,games:a}});if(s==null)return e.jsx(ie,{});const{players:t,games:n}=s;return e.jsxs(z,{className:"rankings mt-3",children:[e.jsx(z.Item,{children:e.jsxs("div",{className:"rank-item-header",children:[e.jsx("div",{className:"rank",children:"Rank"}),e.jsx("div",{className:"name",children:"Name"}),e.jsx("div",{className:"record",children:"Record"}),e.jsx("div",{className:"points",children:"Points"}),e.jsx("div",{className:"twenties",children:"20s"})]})}),t.map((r,a)=>e.jsx(is,{rank:a,player:r,games:n},r.id))]})},ls=({show:s,onHide:t,keepPlayers:n,setKeepPlayers:r,onConfirm:a})=>e.jsxs(N,{show:s,onHide:t,children:[e.jsxs(N.Body,{children:[e.jsx("div",{className:"text-center mb-2",children:e.jsx(A,{color:"var(--bs-warning)",size:"5x",icon:Ce})}),"Do you want to reset the tournament — removing all",n?"":" player names, "," games, scores, and rankings?"]}),e.jsx(N.Body,{children:e.jsx(P.Check,{type:"checkbox",checked:n,onChange:()=>r(!n),label:"Keep player names",id:"keep-players"})}),e.jsxs(N.Footer,{children:[e.jsx(L,{onClick:a,children:"Yes, Reset It"}),e.jsx(L,{variant:"dark",onClick:t,children:"No, Keep It"})]})]}),cs=({anyData:s})=>{const[t,n]=f.useState(!1),[r,a]=f.useState(!1),o=c=>{n(c)},l=async()=>{await p.reset(r),o(!1)};return e.jsxs(S,{className:"text-center",border:"danger",children:[e.jsx(S.Header,{children:"Danger Zone"}),e.jsx(S.Body,{children:e.jsxs(S.Text,{className:"text-start d-flex gap-4 align-items-center",children:[e.jsx("span",{children:e.jsx(L,{className:"text-nowrap",disabled:!s,variant:"danger",onClick:()=>o(!0),children:s?"Reset Tournament":"No Tournament Data"})}),e.jsxs("span",{children:[e.jsx("i",{children:"Warning!"})," Resetting the tournament will remove all player names, game match-ups, scores, and ranking."]})]})}),e.jsx(ls,{show:t,onHide:()=>o(!1),keepPlayers:r,setKeepPlayers:a,onConfirm:l})]})},ds=({show:s,onHide:t,onConfirm:n})=>e.jsxs(N,{show:s,onHide:t,children:[e.jsxs(N.Body,{children:[e.jsx("div",{className:"text-center mb-2",children:e.jsx(A,{color:"var(--bs-gray)",size:"5x",icon:Re})}),"Do you want to restore a previously saved tournament, replacing the current one? All current player names, games, scores, and rankings will be lost."]}),e.jsxs(N.Footer,{children:[e.jsx(L,{onClick:n,children:"Yes, Replace It"}),e.jsx(L,{variant:"dark",onClick:t,children:"No, Keep It"})]})]}),ps={type:"object",required:["players"],properties:{players:{type:"array",items:{$ref:"/Player"},minItems:1},games:{type:"array",items:{$ref:"/Game"}}}},ee=new Me;ee.addSchema(Be,"/Player");ee.addSchema(Fe,"/Game");const ms=ee.compile(ps),us=s=>{const t=s;if(!ms(t))throw new Error(ee.errorsText());const{players:n,games:r}=t;if(!r)return;const a=new Set,o=i=>{if(a.has(i))return!0;const d=n==null?void 0:n.find(m=>m.id===i);return d&&a.add(d.id),!!d},l=[],c=new Set;if(r.forEach((i,d)=>{i.p1id&&!c.has(i.p1id)&&!o(i.p1id)&&(c.has(i.p1id)||l.push(`instance.games[${d}].p1id is not found in instance.players`),c.add(i.p1id)),i.p2id&&!c.has(i.p2id)&&!o(i.p2id)&&(c.has(i.p2id)||l.push(`instance.games[${d}].p2id is not found in instance.players`),c.add(i.p2id))}),c.size>0)throw new Error(l.map((i,d)=>`${d}: ${i}`).join(`
`))},hs=({show:s,onHide:t,details:n})=>e.jsxs(N,{show:s,onHide:t,children:[e.jsxs(N.Body,{className:"text-center",children:[e.jsx("div",{className:"pb-2",children:e.jsx(A,{color:"var(--bs-red)",size:"5x",icon:ue})}),"The chosen file could not be restored. See details below."]}),n?e.jsx(N.Body,{children:e.jsx("pre",{className:"text-wrap",children:n})}):void 0,e.jsx(N.Footer,{children:e.jsx(L,{variant:"dark",onClick:t,children:"Ok, I'll try another file"})})]}),xs=({show:s,onHide:t})=>e.jsxs(N,{show:s,onHide:t,children:[e.jsxs(N.Body,{className:"text-center",children:[e.jsx("div",{className:"pb-2",children:e.jsx(A,{color:"var(--bs-red)",size:"5x",icon:ue})}),"There is no tournament data to save.",e.jsx("br",{}),"Enter some players and try again."]}),e.jsx(N.Footer,{children:e.jsx(L,{variant:"dark",onClick:t,children:"Ok, I get it"})})]}),fs=({anyData:s})=>{const[t,n]=f.useState(!1),[r,a]=f.useState("crokinole-tourney.json"),[o,l]=f.useState(!1),[c,i]=f.useState(),[d,m]=f.useState(!1),[y,j]=f.useState(),[x,w]=f.useState(!1),k=async R=>{if(R.preventDefault(),!s){w(!0);return}n(!0),setTimeout(()=>n(!1),1e3);const g=document.createElement("a"),T=await p.players.toArray(),E=await p.games.toArray();g.href=window.URL.createObjectURL(new Blob([JSON.stringify({players:T,games:E},null,2)])),g.setAttribute("download",r),document.body.appendChild(g),g.click()},I=()=>{if(!c)return;m(!1),l(!0),setTimeout(()=>l(!1),1e3);const R=new FileReader;R.onload=g=>{var T;try{const E=JSON.parse((T=g.target)==null?void 0:T.result);us(E),p.replace(E)}catch(E){j(E==null?void 0:E.toString())}},R.readAsText(c)},v=async R=>{R.preventDefault(),c!=null&&(s?m(!0):I())},W=R=>{const g=R.target;g.files&&i(g.files[0])};return e.jsxs(S,{className:"text-center",children:[e.jsxs(S.Header,{children:["Save and Restore",e.jsx("div",{style:{color:"var(--bs-gray)",fontSize:"smaller",fontStyle:"italic"},children:"All data is stored locally and is never uploaded to a server."})]}),e.jsxs(S.Body,{className:"d-flex flex-column flex-lg-row gap-3 flex-wrap justify-content-lg-stretch",children:[e.jsx(P,{onSubmit:k,className:"flex-lg-grow-1",children:e.jsxs($,{children:[e.jsx($.Text,{children:"Save As"}),e.jsx(P.Control,{placeholder:"Filename",value:r,onChange:R=>a(R.target.value),"aria-label":"filename","aria-describedby":"basic-addon"}),e.jsx(ae,{working:t,type:"submit",id:"button-addon",children:"Save"})]})}),e.jsx(P,{onSubmit:v,className:"flex-lg-grow-1",children:e.jsxs($,{children:[e.jsx(P.Control,{type:"file",onChange:W}),e.jsx(ae,{working:o,type:"submit",id:"button-addon",children:"Restore"})]})})]}),e.jsx(ds,{show:d,onHide:()=>m(!1),onConfirm:I}),e.jsx(hs,{show:!!y,onHide:()=>j(void 0),details:y}),e.jsx(xs,{show:x,onHide:()=>w(!1)})]})},js=()=>{const s=F.useLiveQuery(async()=>await p.anyData());return e.jsxs("div",{className:"d-flex mt-4 gap-4 flex-column",children:[e.jsx(fs,{anyData:s}),e.jsx(cs,{anyData:s})]})},ys=({children:s})=>{const[t,n]=f.useState(4),[r,a]=f.useState(3);return e.jsx(Z.Provider,{value:{seedrounds:t,setSeedrounds:n,log2elimplayers:r,setLog2elimplayers:a},children:s})};function vs(){return e.jsxs(B,{variant:"tabs",children:[e.jsx(B.Item,{children:e.jsx(B.Link,{as:q,to:"/",children:e.jsx(A,{icon:Le})})}),e.jsx(B.Item,{children:e.jsx(B.Link,{as:q,to:"/players",children:"Players"})}),e.jsx(B.Item,{children:e.jsx(B.Link,{as:q,to:"/matches",children:"Matches"})}),e.jsx(B.Item,{children:e.jsx(B.Link,{as:q,to:"/rankings",children:"Ranking"})}),e.jsx(B.Item,{children:e.jsx(B.Link,{as:q,to:"/settings",children:"Settings"})})]})}function gs(){return e.jsx(e.Fragment,{children:e.jsx(ys,{children:e.jsxs(Ae,{children:[e.jsx(vs,{}),e.jsxs(Pe,{children:[e.jsx(H,{path:"/",element:e.jsx(qe,{})}),e.jsx(H,{path:"/players",element:e.jsx(Ve,{})}),e.jsx(H,{path:"/matches",element:e.jsx(rs,{})}),e.jsx(H,{path:"/rankings",element:e.jsx(os,{})}),e.jsx(H,{path:"/settings",element:e.jsx(js,{})})]})]})})})}Ie.createRoot(document.getElementById("root")).render(e.jsx(Ee.StrictMode,{children:e.jsx(gs,{})}));
