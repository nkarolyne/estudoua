
const PHASES = {
  p1:{name:"CV e LinkedIn", color:"var(--p1)"},
  p2:{name:"Estudos", color:"var(--p2)"},
  p3:{name:"Cases", color:"var(--p3)"},
  p4:{name:"Site e lançamento", color:"var(--p4)"}
};
const BREAK = {s:"2026-12-24", e:"2027-01-01", label:"Festas · ritmo leve"};
const L = {
  ghQuick:"https://docs.github.com/pt/pages/quickstart",
  ghDomain:"https://docs.github.com/pt/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site",
  ghVerify:"https://docs.github.com/pt/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages",
  ghHttps:"https://docs.github.com/pt/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https",
  ghHello:"https://docs.github.com/pt/get-started/start-your-journey/hello-world",
  ghSignup:"https://github.com/signup",
  regbr:"https://registro.br",
  regTut:"https://atendimento.nuvemshop.com.br/pt_BR/como-comprar-um-dominio-do-registrobr",
  claudeCode:"https://docs.claude.com/en/docs/claude-code/overview",
  skills:"https://support.claude.com/en/articles/12512180-using-skills-in-claude",
  liLang:"https://www.linkedin.com/help/linkedin/answer/1717",
  liLangView:"https://www.linkedin.com/help/linkedin/answer/a541791",
  liOpen:"https://www.linkedin.com/help/linkedin/answer/67405",
  ditaDl:"https://www.dita-ot.org/download",
  ditaDocs:"https://www.dita-ot.org/dev/",
  sap:"https://learning.sap.com",
  wmDisc:"https://learning.sap.com/courses/discovering-walkme",
  wmJourney:"https://learning.sap.com/learning-journeys/starting-your-digital-adoption-journey-with-walkme",
  wmBR:"https://learning.sap.com/courses/starting-your-digital-adoption-journey-walkme-fundamentals-br",
  badges:"https://learning.sap.com/helpcenter/digital-badges",
  liTW:"https://www.linkedin.com/learning/technical-writing-quick-start-guides"
};
// s: etapas. Texto simples ou [texto, link, rótulo do link]
const TASKS = [
 {id:"t1",ph:"p1",s:"2026-10-14",e:"2026-10-18",h:2,t:"Confirmar dados pendentes",
  d:"Fechar as informações que divergem entre LinkedIn e CV antes de mexer nos textos.",out:"Lista de dados confirmados",
  st:["Mês exato da promoção a Sênior","Datas da PUCRS (2022–23 ou 2023–25)","Datas na IENH: auxiliar e professora","Nome da escola: EMEB ou EMEF","Qual URL do LinkedIn vale"]},
 {id:"t2",ph:"p1",s:"2026-10-14",e:"2026-10-22",h:3,t:"Levantar números reais",
  d:"Juntar resultados que dá para citar. Só números verdadeiros.",out:"3 a 6 resultados para os bullets",
  st:["Listar entregas principais na Renner","Contar termos do Vocabulário Controlado e do Glossário","Quantos testes de compreensão e quantas pessoas participaram","Quantas tribos ou squads usam os manuais","Confirmar com a liderança o que pode ser divulgado"]},
 {id:"t3",ph:"p1",s:"2026-10-20",e:"2026-10-26",h:3,t:"Finalizar CV em inglês",
  d:"Aplicar dados e números no CV em inglês e exportar em PDF.",out:"CV (EN) em PDF",
  st:["Inserir os dados confirmados","Trocar os trechos marcados por números reais","Revisar bullets: ação + contexto + resultado","Revisão de ortografia em inglês","Exportar PDF e testar se o texto pode ser copiado","Nomear como Nicole-Gomes-CV-EN.pdf"]},
 {id:"t4",ph:"p1",s:"2026-10-22",e:"2026-10-29",h:3,t:"LinkedIn em inglês (já feito)",
  d:"Já feito pela Nicole. Só conferir se está completo.",out:"Perfil principal em inglês",
  st:["Conferir headline e About","Conferir as experiências da Renner (Pleno e Sênior)","Conferir competências e certificações"]},
 {id:"t5",ph:"p1",s:"2026-10-27",e:"2026-10-31",h:2,t:"LinkedIn em português",
  d:"Adicionar o perfil em PT-BR como segundo idioma.",out:"Perfil secundário em PT-BR",
  st:[["Criar o perfil em outro idioma",L.liLang,"Ajuda do LinkedIn"],"Colar headline, About e experiências do kit PT-BR",["Conferir como o perfil aparece em cada idioma",L.liLangView,"Ajuda do LinkedIn"]]},
 {id:"t6",ph:"p1",s:"2026-10-29",e:"2026-11-02",h:2,t:"Ajustes finais do perfil",
  d:"Deixar o perfil fácil de achar por recrutadores.",out:"Perfil pronto para ser encontrado",
  st:["Foto profissional","Banner com a frase do portfólio","URL personalizada (Editar perfil público e URL)",["Open to work visível só para recrutadores",L.liOpen,"Ajuda do LinkedIn"],"Cargos de interesse: User Assistance Developer, Technical Writer, Content Designer"]},
 {id:"t7",ph:"p1",s:"2026-10-26",e:"2026-11-02",h:2,t:"Alinhar textos do site ao LinkedIn e CV",
  d:"Frase de abertura e Sobre do site seguem o perfil em inglês e o CV.",out:"index.html alinhado",
  st:["Cargo Sênior no texto de abertura","Sobre alinhado ao About do LinkedIn","Rodapé com o ano certo","Conferir e-mail, URL do LinkedIn e CV novo"]},
 {id:"m1",ph:"p1",s:"2026-11-02",e:"2026-11-02",ms:true,t:"Marco: perfil e CV prontos",d:"CV, LinkedIn (EN e PT) e portfólio contam a mesma história.",out:"Base pronta"},

 {id:"t37",ph:"p2",s:"2026-10-27",e:"2026-11-02",h:2,t:"Curso LinkedIn · Technical Writing",nw:1,
  d:"Introdução à escrita técnica antes de entrar nas linguagens (XML e DITA). O curso ensina a montar guias rápidos: objetivo, passos com verbo, títulos claros e revisão com especialistas.",out:"Base de escrita técnica",
  st:[["Abrir Technical Writing: Quick Start Guides no LinkedIn Learning",L.liTW,"Curso no LinkedIn Learning"],"Conferir se a conta tem acesso (assinatura, teste grátis ou biblioteca)","Assistir às aulas e anotar: objetivo do guia, passos com verbo, títulos claros","Acompanhar a aula de revisão do guia de exemplo","Se houver certificado, adicionar em Licenças e certificados no LinkedIn"]},
 {id:"t8",ph:"p2",s:"2026-11-03",e:"2026-11-08",h:3,t:"Curso · Introdução",
  d:"Conteúdo estruturado, separar conteúdo de forma, tópicos e docs-as-code.",out:"Módulo 1 concluído",
  st:["Ler as páginas do módulo","Página ponte: de UX Writing para User Assistance","Fazer o quiz"]},
 {id:"t9",ph:"p2",s:"2026-11-09",e:"2026-11-15",h:4,t:"Curso · XML",
  d:"Tags, atributos, aninhamento e validação.",out:"Módulo XML concluído",
  st:["Fazer os laboratórios","Criar e validar um arquivo XML no VS Code","Fazer o quiz"]},
 {id:"t10",ph:"p2",s:"2026-11-16",e:"2026-11-29",h:7,t:"Curso · DITA",
  d:"O módulo mais importante para a vaga.",out:"Módulo DITA concluído",
  st:["Tópicos concept, task e reference","Montar um ditamap",["Instalar o DITA-OT no Mac",L.ditaDl,"Download do DITA-OT"],["Publicar o primeiro HTML5",L.ditaDocs,"Documentação do DITA-OT"],"Fazer o quiz"]},
 {id:"t11",ph:"p2",s:"2026-11-16",e:"2026-12-13",h:5,t:"Trilha gratuita no learning.sap.com",
  d:"Uma hora por semana, em paralelo.",out:"Badge ou certificado no LinkedIn",
  st:[["Criar conta no SAP Learning",L.sap,"learning.sap.com"],"Escolher uma trilha introdutória (S/4HANA ou Fiori)","Reservar 1 hora fixa por semana","Adicionar o certificado ao LinkedIn"]},
 {id:"t29",ph:"p2",s:"2026-11-03",e:"2026-11-15",h:3,t:"Curso de WalkMe (SAP Learning)",nw:1,
  d:"WalkMe é a ferramenta de ajuda dentro do produto da SAP e aparece nas vagas de User Assistance. A trilha é para iniciantes e tem uma versão com aulas em português. Confirmar se é gratuita ao se inscrever.",out:"Record of Achievement (badge Credly)",
  st:[["Aquecimento: Discovering WalkMe (40 min)",L.wmDisc,"Curso no SAP Learning"],["Inscrever-se na trilha Starting your Digital Adoption Journey with WalkMe",L.wmJourney,"Trilha no SAP Learning"],["Fazer o curso WalkMe Fundamentals (versão BR, 1 h 17 min)",L.wmBR,"Curso em português"],"Responder todos os quizzes da trilha (isso libera o badge)",["Criar conta no Credly com o mesmo e-mail do SAP Learning",L.badges,"FAQ de badges"],"Aceitar o badge no Credly"]},
 {id:"t30",ph:"p2",s:"2026-11-16",e:"2026-11-18",h:1,t:"WalkMe no CV e no LinkedIn",nw:1,
  d:"Registrar o curso assim que o badge sair.",out:"Certificação visível no perfil",
  st:["LinkedIn: Licenças e certificados → SAP · Starting your Digital Adoption Journey with WalkMe","Compartilhar o badge do Credly direto no LinkedIn","Adicionar WalkMe e Digital Adoption às competências (EN e PT)","CV: incluir na seção Certifications","Não chamar de certificação SAP: é Record of Achievement"]},
 {id:"t12",ph:"p2",s:"2026-11-30",e:"2026-12-06",h:4,t:"Curso · Git e GitHub",
  d:"Base para publicar o case 2 e o site.",out:"Primeiro repositório no GitHub",
  st:[["Criar conta no GitHub com nome profissional",L.ghSignup,"Criar conta"],"Instalar o Git (passo do curso)",["Primeiro repositório",L.ghHello,"Tutorial Hello World"],"Commit, branch e pull request"]},
 {id:"t13",ph:"p2",s:"2026-12-07",e:"2026-12-13",h:3,t:"Curso · Extra ABAP",
  d:"Ler código básico e entender message classes.",out:"Mensagem de erro reescrita",
  st:["Leitura de código linha a linha","Message classes: limite de 73 caracteres e &1/&2","Exercício de reescrever uma mensagem de erro"]},
 {id:"t14",ph:"p2",s:"2026-12-07",e:"2026-12-20",h:3,t:"Noções de Jira e arquitetura",
  d:"O suficiente para conversar com desenvolvedores na entrevista.",out:"Resumo de uma página",
  st:["Criar conta gratuita no Jira e simular um quadro","Entender ticket, sprint e status","Básico de cliente, servidor, API e banco de dados","Escrever o resumo de uma página"]},
 {id:"m2",ph:"p2",s:"2026-12-13",e:"2026-12-13",ms:true,t:"Marco: curso concluído",d:"Todos os módulos do curso de DITA, XML e Git feitos.",out:"Curso concluído"},

 {id:"t15",ph:"p3",s:"2026-11-23",e:"2026-12-06",h:4,t:"Case 1 · Roteiro (Renner)",
  d:"Tom de Voz e Vocabulário Controlado.",out:"Roteiro do case 1",
  st:["Confirmar com a Renner o que pode ser publicado","Problema e contexto","Papel da Nicole","Processo: manuais, glossário e vocabulário","Testes de compreensão","Resultados com números","Anonimizar dados internos"]},
 {id:"t18",ph:"p3",s:"2026-11-30",e:"2026-12-13",h:3,t:"Glossário SAP comentado",
  d:"Glossário em português simples a partir do guia de ABAP. Entra como anexo do case 3.",out:"Glossário publicado no GitHub",
  st:["Escolher 20 a 30 termos","Definição em linguagem simples","Exemplo de uso para cada termo","Publicar como Markdown no GitHub"]},
 {id:"t16",ph:"p3",s:"2026-12-07",e:"2026-12-18",h:6,t:"Case 1 · Texto e imagens",
  d:"Escrever o case a partir do roteiro.",out:"Texto final do case 1",
  st:["Primeira versão do texto","Antes e depois de microcopy","Imagens sem dados internos","Revisão por outra pessoa"]},
 {id:"t17",ph:"p3",s:"2026-12-14",e:"2026-12-23",h:6,t:"Case 3 · Redatora técnica (central em DITA)",
  d:"Projeto final do curso, publicado no GitHub.",out:"Repositório público no GitHub",
  st:["Escrever os tópicos","Montar o ditamap","Gerar o HTML5 com DITA-OT","README com o processo","Publicar o repositório"]},
 {id:"t19",ph:"p3",s:"2027-01-02",e:"2027-01-07",h:5,t:"Case 3 · Texto",
  d:"Contar o processo e as decisões de escrita.",out:"Texto final do case 2",
  st:["Estrutura dos tópicos e por quê","Decisões de escrita","Como publicou","O que aprendeu"]},
 {id:"t31",ph:"p3",s:"2026-11-23",e:"2026-11-29",h:3,t:"Case 2 · Roteiro do chatbot",nw:1,
  d:"O projeto de chatbot mostra design de conversa e ajuda ao usuário, muito próximo de User Assistance.",out:"Roteiro do case 3",
  st:["Juntar o material: fluxos, roteiros e telas","Confirmar se pode mostrar e anonimizar a marca","Problema e público do bot","Papel da Nicole: fluxos, tom de voz, mensagens de erro","Antes e depois de uma resposta do bot","Resultado ou aprendizado"]},
 {id:"t32",ph:"p3",s:"2027-01-02",e:"2027-01-07",h:4,t:"Case 2 · Texto e fluxo",nw:1,
  d:"Case mais curto que os outros dois, focado no fluxo de conversa.",out:"Texto final do case 3",
  st:["Primeira versão do texto","Diagrama do fluxo principal","2 ou 3 exemplos de mensagens","Revisão por outra pessoa"]},
 {id:"m3",ph:"p3",s:"2027-01-07",e:"2027-01-07",ms:true,t:"Marco: três cases escritos",d:"Case 1 (Renner), case 2 (chatbot) e case 3 (redatora técnica) prontos.",out:"Cases prontos"},

 {id:"t24",ph:"p4",s:"2026-11-03",e:"2026-11-08",h:1,t:"Comprar domínio",nw:1,
  d:"Comprar cedo garante o nome. O portfólio já usa nicolekarolyne.com.br nas metatags.",out:"Domínio registrado",
  st:[["Ver se nicolekarolyne.com.br está livre",L.regbr,"Registro.br"],["Criar conta com CPF e registrar por 1 ano",L.regTut,"Tutorial passo a passo"],"Ativar renovação automática","Ativar verificação em duas etapas na conta","Achar onde fica a edição de DNS"]},
 {id:"t33",ph:"p4",s:"2026-10-23",e:"2026-10-28",h:2,t:"Definir estrutura do site",nw:1,
  d:"Páginas e conteúdo antes de qualquer design.",out:"Mapa do site",
  st:["Páginas: Início, Cases (3), Sobre e Contato","Frase de apresentação a partir do LinkedIn em inglês","Lista de conteúdo de cada página","Esboço da navegação no celular"]},
 {id:"t34",ph:"p4",s:"2026-10-29",e:"2026-11-07",h:4,t:"Design do site",nw:1,
  d:"Cores, fontes e componentes, em modo claro e escuro.",out:"Estilo definido e testado",
  st:[["Escolher a direção visual com a skill de design",L.skills,"Como usar skills"],"Definir cores e fontes","Criar componentes: cards, botões e cabeçalho","Testar contraste e modo escuro com a skill de acessibilidade"]},
 {id:"t35",ph:"p4",s:"2026-11-08",e:"2026-11-14",h:4,t:"Página inicial e Sobre",nw:1,
  d:"Primeiras páginas reais, com o design já aprovado.",out:"Início e Sobre prontos",
  st:["Hero com nome e frase de apresentação","Cards dos 3 cases (mesmo que ainda sem texto)","Sobre com resumo do LinkedIn em inglês","Contato com LinkedIn e e-mail","Testar no celular"]},
 {id:"t36",ph:"p4",s:"2026-11-15",e:"2026-11-21",h:3,t:"Modelo de página de case",nw:1,
  d:"Um modelo só para os 3 cases, para não refazer cada um.",out:"Modelo de case",
  st:["Seções: problema, papel, processo, resultado","Espaço para imagens e antes/depois","Teste com texto de exemplo, marcado como exemplo"]},
 {id:"t25",ph:"p4",s:"2026-12-07",e:"2026-12-12",h:2,t:"Subir o site no GitHub Pages",nw:1,
  d:"Primeira versão do site (estrutura, design e páginas base), enviada logo depois do módulo de Git.",out:"Site no ar em .github.io",
  st:["Criar repositório público <usuário>.github.io","Enviar o site (HTML, CSS, imagens e CV em PDF)",["Ativar o Pages em Settings → Pages",L.ghQuick,"Guia rápido do GitHub Pages"],"Abrir o endereço .github.io e testar"]},
 {id:"t26",ph:"p4",s:"2026-12-09",e:"2026-12-16",h:2,t:"Usar o domínio no GitHub Pages",nw:1,
  d:"Apontar o domínio do Registro.br para o site.",out:"Site no ar com HTTPS no domínio",
  st:[["Verificar o domínio na conta do GitHub",L.ghVerify,"Tutorial do GitHub"],["Informar o domínio em Settings → Pages",L.ghDomain,"Tutorial do GitHub"],["No Registro.br, criar os registros A e o CNAME do www",L.ghDomain,"IPs e valores no tutorial"],"Esperar a propagação (pode levar até 24 h)",["Ativar Enforce HTTPS",L.ghHttps,"Tutorial do GitHub"],"Testar com e sem www"]},
 {id:"t27",ph:"p4",s:"2026-12-22",e:"2026-12-28",h:3,t:"Página do case 1 (Renner) no site",nw:1,
  d:"Usar Claude e suas skills para montar a página do case no mesmo design do site.",out:"Página do case 1 no site",
  st:[["Abrir o projeto no Claude Code ou no app",L.claudeCode,"Claude Code"],["Usar as skills de design no projeto",L.skills,"Como usar skills"],"Dar contexto: estrutura, design e texto final do case 1","Gerar a página com o modelo de case","Revisar os textos com a skill de UX copy","Imagens sem dados internos e navegação entre cases"]},
 {id:"t28",ph:"p4",s:"2027-01-02",e:"2027-01-09",h:4,t:"Páginas dos cases 2 e 3 no site",nw:1,
  d:"Fechar o site com os cases que faltam.",out:"Site completo",
  st:["Página do case 2 (chatbot): fluxo e exemplos","Página do case 3 (redatora): links do GitHub e do glossário","Revisão de acessibilidade com a skill de acessibilidade","Testar no celular e no tema escuro","Imagem de compartilhamento (og-image.png)","Trocar 'Em breve' pelos links dos cases"]},
 {id:"t20",ph:"p4",s:"2027-01-10",e:"2027-01-12",h:2,t:"Publicar a versão final",
  d:"Subir o site novo para o GitHub Pages.",out:"Portfólio final no ar",
  st:["Commit e push","Conferir o domínio com HTTPS","Testar todos os links","Pedir para duas pessoas abrirem no celular"]},
 {id:"t21",ph:"p4",s:"2027-01-11",e:"2027-01-12",h:1,t:"Featured no LinkedIn",
  d:"Destacar o que comprova a experiência.",out:"Seção Featured completa",
  st:["Link do portfólio","Case 1 (Renner)","Case 2 (chatbot)","Repositório do case 3 (DITA)","Glossário SAP","Badge do WalkMe"]},
 {id:"t22",ph:"p4",s:"2027-01-09",e:"2027-01-13",h:2,t:"Revisão final de CV e LinkedIn",
  d:"Incluir o que foi aprendido e conferir tudo.",out:"CV e LinkedIn v2",
  st:["Incluir DITA, XML e Git nas competências","Incluir o link do portfólio no CV","Conferir datas e cargos nos dois idiomas","Revisão por alguém de confiança"]},
 {id:"t23",ph:"p4",s:"2027-01-11",e:"2027-01-15",h:2,t:"Preparar candidatura",
  d:"Kit pronto para aplicar.",out:"Kit de candidatura",
  st:["Lista de vagas de User Assistance abertas","Mensagem curta para recrutadores","Mensagem para contatos na SAP"]},
 {id:"m4",ph:"p4",s:"2027-01-15",e:"2027-01-15",ms:true,t:"Marco: pronta para aplicar",d:"Tudo pronto para se candidatar.",out:"Meta final"}
];

const KEY="rota-ua-nicole-v1";
let state={view:"timeline",status:{},steps:{},filter:{p1:1,p2:1,p3:1,p4:1},calMonth:null,selDay:null};
try{const s=JSON.parse(localStorage.getItem(KEY)||"null");if(s)state=Object.assign(state,s);state.steps=state.steps||{}}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(state))}catch(e){}}

const P=s=>{const[y,m,d]=s.split("-").map(Number);return Date.UTC(y,m-1,d)};
const DAY=864e5;
const fmt=(s,o={day:"2-digit",month:"short"})=>new Date(P(s)).toLocaleDateString("pt-BR",Object.assign({timeZone:"UTC"},o)).replace(".","");
const iso=t=>new Date(t).toISOString().slice(0,10);
const now=new Date();const TODAY=Date.UTC(now.getFullYear(),now.getMonth(),now.getDate());
const st=id=>state.status[id]||"todo";
const vis=()=>TASKS.filter(t=>state.filter[t.ph]);
const range=t=>t.s===t.e?fmt(t.s):fmt(t.s)+" → "+fmt(t.e);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const stepsOf=t=>(t.st||[]).map(x=>Array.isArray(x)?{t:x[0],u:x[1],l:x[2]}:{t:x});
const doneSteps=t=>{const m=state.steps[t.id]||{};return stepsOf(t).filter((_,i)=>m[i]).length};
const stepTxt=t=>t.st?`${doneSteps(t)}/${t.st.length} etapas`:"";
const view=document.getElementById("view");


function hubSummary(){
  try{
    const real=TASKS.filter(t=>!t.ms);
    const open=real.filter(t=>st(t.id)!=="done").sort((a,b)=>P(a.s)-P(b.s));
    let now=open.filter(t=>P(t.s)<=TODAY&&P(t.e)>=TODAY);
    if(!now.length)now=open.filter(t=>P(t.s)>TODAY).slice(0,3);
    localStorage.setItem("estudos-hub-rota",JSON.stringify({
      done:real.filter(t=>st(t.id)==="done").length,total:real.length,
      steps:real.reduce((a,t)=>a+doneSteps(t),0),stepsTotal:real.reduce((a,t)=>a+(t.st?t.st.length:0),0),
      now:now.slice(0,4).map(t=>({t:t.t,ph:t.ph,e:t.e,s:t.s}))}));
  }catch(e){}
}
function stats(){hubSummary();
  const real=TASKS.filter(t=>!t.ms);const done=real.filter(t=>st(t.id)==="done").length;
  const all=real.reduce((a,t)=>a+(t.st?t.st.length:0),0),ds=real.reduce((a,t)=>a+doneSteps(t),0);
  sDone.textContent=done+"/"+real.length;sSteps.textContent=ds+"/"+all;
  sDays.textContent=Math.max(0,Math.round((P("2027-01-15")-TODAY)/DAY));
  sProg.style.width=(ds/all*100)+"%";
}
function chips(){
  document.getElementById("chips").innerHTML=Object.entries(PHASES).map(([k,p])=>`<button class="chip" data-ph="${k}" aria-pressed="${!!state.filter[k]}"><i class="dot" style="background:${p.color}"></i>${p.name}</button>`).join("");
}
document.getElementById("chips").addEventListener("click",e=>{const b=e.target.closest("[data-ph]");if(!b)return;state.filter[b.dataset.ph]=state.filter[b.dataset.ph]?0:1;save();chips();render()});
document.getElementById("views").addEventListener("click",e=>{const b=e.target.closest("[data-v]");if(!b)return;state.view=b.dataset.v;save();render()});

const box=t=>{const s=st(t.id);return `<span class="box ${s}" aria-hidden="true">${s==="done"?"✓":""}</span>`};
const tag=t=>t.ms?'<span class="ms-tag">marco</span>':t.nw?'<span class="new-tag">novo</span>':"";

function timeline(){
  const A=P("2026-10-12"),B=P("2027-01-18"),span=B-A;const pct=t=>((t-A)/span*100);
  let scale=`<div class="g-scale"><div class="g-label">Tarefa</div><div class="g-months">`;
  for(let m=new Date(A);m<B;m=new Date(Date.UTC(m.getUTCFullYear(),m.getUTCMonth()+1,1))){
    const s0=Math.max(A,Date.UTC(m.getUTCFullYear(),m.getUTCMonth(),1));
    scale+=`<div class="g-month" style="left:${pct(s0)}%">${new Date(s0).toLocaleDateString("pt-BR",{month:"short",year:"2-digit",timeZone:"UTC"}).replace(".","")}</div>`;
  }
  let grid="";for(let w=A;w<B;w+=7*DAY){scale+=`<span class="g-week" style="left:${pct(w+3.5*DAY)}%">${new Date(w).getUTCDate()}</span>`;grid+=`<div class="g-grid" style="left:${pct(w)}%"></div>`}
  scale+=`</div></div>`;
  const overlay=`<div class="g-break" style="left:${pct(P(BREAK.s))}%;width:${pct(P(BREAK.e)+DAY)-pct(P(BREAK.s))}%"></div>`+(TODAY>=A&&TODAY<B?`<div class="g-today" style="left:${pct(TODAY+DAY/2)}%"></div>`:"");
  let rows="";
  for(const [k,p] of Object.entries(PHASES)){
    if(!state.filter[k])continue;
    rows+=`<div class="g-row g-phase"><div class="g-label"><i class="dot" style="background:${p.color}"></i><span>${p.name}</span></div><div class="g-track">${grid}${overlay}</div></div>`;
    for(const t of TASKS.filter(x=>x.ph===k).sort((a,b)=>P(a.s)-P(b.s))){
      const l=pct(P(t.s)),w=pct(P(t.e)+DAY)-l;
      rows+=`<div class="g-row"><div class="g-label">${box(t)}<span title="${esc(t.t)}">${esc(t.t)}</span>${t.st?`<small>${doneSteps(t)}/${t.st.length}</small>`:""}</div><div class="g-track">${grid}${overlay}
        <button class="g-bar ${t.ms?"ms":""} ${st(t.id)}" data-id="${t.id}" style="left:${l}%;width:${w}%;background:${p.color}" aria-label="${esc(t.t)}, ${range(t)}">${t.ms?"":range(t)}</button></div></div>`;
    }
  }
  view.innerHTML=`<p class="note">Arraste para os lados no celular. Losangos são marcos; a faixa listrada é a pausa das festas; a linha fina é hoje.</p><div class="gantt"><div class="g-inner">${scale}${rows}</div></div>
  <div class="legend"><span><i class="sw" style="background:var(--accent)"></i>Hoje</span><span><i class="sw" style="background:repeating-linear-gradient(135deg,transparent 0 3px,var(--line-strong) 3px 4px)"></i>${BREAK.label}</span><span>Número ao lado = etapas feitas</span></div>`;
}

function weeks(){
  let html=`<div class="weeks">`;let n=1;
  for(let w=P("2026-10-12");w<=P("2027-01-11");w+=7*DAY,n++){
    const we=w+6*DAY;const list=vis().filter(t=>P(t.s)<=we&&P(t.e)>=w).sort((a,b)=>P(a.s)-P(b.s));
    const isNow=TODAY>=w&&TODAY<=we;const off=P(BREAK.s)<=we&&P(BREAK.e)>=w;
    const hrs=list.filter(t=>!t.ms).reduce((a,t)=>{const days=(P(t.e)-P(t.s))/DAY+1;const ov=(Math.min(we,P(t.e))-Math.max(w,P(t.s)))/DAY+1;return a+t.h*ov/days},0);
    html+=`<section class="week ${isNow?"now":""}"><div><h3>Semana ${n}</h3><small>${fmt(iso(w))} – ${fmt(iso(we))}${isNow?" · esta semana":""}</small><small>≈ ${Math.round(hrs)} h de dedicação${off?" · festas":""}</small></div><ul>`;
    html+=list.length?list.map(t=>`<li><button class="item ${st(t.id)}" data-id="${t.id}">${box(t)}<span class="t">${esc(t.t)}${tag(t)}<span class="m"><i class="dot" style="background:${PHASES[t.ph].color};margin-right:6px"></i>${PHASES[t.ph].name} · ${range(t)}${t.st?" · "+stepTxt(t):""}</span></span></button></li>`).join(""):`<li class="note">Sem tarefas. Descanso.</li>`;
    html+=`</ul></section>`;
  }
  view.innerHTML=html+`</div>`;
}

function board(){
  const cols=[["todo","A fazer"],["doing","Fazendo"],["done","Feito"]];
  view.innerHTML=`<div class="board">${cols.map(([k,n])=>{const list=vis().filter(t=>!t.ms&&st(t.id)===k).sort((a,b)=>P(a.s)-P(b.s));
    return `<div class="col"><h3>${n}<span>${list.length}</span></h3>${list.map(t=>`<div class="card"><button class="item" style="padding:0" data-id="${t.id}"><span class="t">${esc(t.t)}${tag(t)}<span class="m"><i class="dot" style="background:${PHASES[t.ph].color};margin-right:6px"></i>${range(t)} · ${t.h} h · ${stepTxt(t)}</span></span></button>
      <div class="sbar" aria-hidden="true"><i style="width:${doneSteps(t)/t.st.length*100}%"></i></div>
      <div class="acts">${k!=="todo"?`<button class="mini" data-move="${t.id}" data-to="${k==="done"?"doing":"todo"}">← Voltar</button>`:""}${k!=="done"?`<button class="mini" data-move="${t.id}" data-to="${k==="todo"?"doing":"done"}">${k==="todo"?"Começar":"Concluir"} →</button>`:""}</div></div>`).join("")||`<p class="note" style="margin:4px">Nada aqui.</p>`}</div>`}).join("")}</div>`;
}

const MONTHS=["2026-10","2026-11","2026-12","2027-01"];
function cal(){
  if(!state.calMonth){const cur=iso(TODAY).slice(0,7);state.calMonth=MONTHS.includes(cur)?cur:MONTHS[0]}
  const [y,m]=state.calMonth.split("-").map(Number);const first=Date.UTC(y,m-1,1);const last=Date.UTC(y,m,0);
  const lead=(new Date(first).getUTCDay()+6)%7;const i=MONTHS.indexOf(state.calMonth);
  let cells=["seg","ter","qua","qui","sex","sáb","dom"].map(d=>`<div class="dow">${d}</div>`).join("");
  for(let k=0;k<lead;k++)cells+=`<div class="day out"></div>`;
  for(let d=first;d<=last;d+=DAY){
    const ds=iso(d);const list=vis().filter(t=>P(t.s)<=d&&P(t.e)>=d);const ms=list.filter(t=>t.ms);
    const off=d>=P(BREAK.s)&&d<=P(BREAK.e);
    cells+=`<button class="day ${d===TODAY?"today":""} ${state.selDay===ds?"sel":""} ${off?"off":""}" data-day="${ds}" aria-label="${fmt(ds,{day:"numeric",month:"long"})}, ${list.length} tarefas"><b>${new Date(d).getUTCDate()}</b><span class="dots">${list.filter(t=>!t.ms).map(t=>`<i style="background:${PHASES[t.ph].color};opacity:${st(t.id)==="done"?.35:1}"></i>`).join("")}</span>${ms.map(t=>`<span class="ms">◆ ${esc(t.t.replace("Marco: ",""))}</span>`).join("")}</button>`;
  }
  const sel=state.selDay&&state.selDay.startsWith(state.calMonth)?state.selDay:null;
  const dl=sel?vis().filter(t=>P(t.s)<=P(sel)&&P(t.e)>=P(sel)):[];
  view.innerHTML=`<div class="cal-nav"><button data-cal="-1" ${i===0?"disabled":""} aria-label="Mês anterior">‹</button><h3>${new Date(first).toLocaleDateString("pt-BR",{month:"long",year:"numeric",timeZone:"UTC"})}</h3><button data-cal="1" ${i===MONTHS.length-1?"disabled":""} aria-label="Próximo mês">›</button></div>
  <div class="cal">${cells}</div>
  <div class="daylist">${sel?`<h4>${fmt(sel,{weekday:"long",day:"numeric",month:"long"})}</h4><ul>${dl.length?dl.map(t=>`<li><button class="item ${st(t.id)}" data-id="${t.id}">${box(t)}<span class="t">${esc(t.t)}${tag(t)}<span class="m">${PHASES[t.ph].name} · ${range(t)}${t.st?" · "+stepTxt(t):""}</span></span></button></li>`).join(""):`<li class="note">Nenhuma tarefa neste dia.</li>`}</ul>`:`<p class="note" style="margin:0">Toque em um dia para ver as tarefas.</p>`}</div>`;
}

function render(){
  document.querySelectorAll("#views button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.v===state.view));
  ({timeline,weeks,board,cal})[state.view]();stats();
}

view.addEventListener("click",e=>{
  const mv=e.target.closest("[data-move]");if(mv){state.status[mv.dataset.move]=mv.dataset.to;save();render();return}
  const c=e.target.closest("[data-cal]");if(c){state.calMonth=MONTHS[MONTHS.indexOf(state.calMonth)+Number(c.dataset.cal)];save();render();return}
  const d=e.target.closest("[data-day]");if(d){state.selDay=d.dataset.day;save();render();return}
  const t=e.target.closest("[data-id]");if(t)open(t.dataset.id);
});

const sheet=document.getElementById("sheet"),panel=document.getElementById("panel");let lastFocus=null;
function open(id,focusSel){
  const t=TASKS.find(x=>x.id===id);const p=PHASES[t.ph];if(sheet.hidden)lastFocus=document.activeElement;
  const sts=[["todo","A fazer"],["doing","Fazendo"],["done","Feito"]];const m=state.steps[id]||{};const S=stepsOf(t);
  panel.innerHTML=`<button class="close" id="closeBtn" aria-label="Fechar">×</button>
    <div class="eyebrow" style="color:${p.color}">${p.name}${t.ms?" · marco":""}</div>
    <h2 id="dTitle">${esc(t.t)}</h2><div class="when">${t.s===t.e?fmt(t.s,{weekday:"long",day:"numeric",month:"long"}):fmt(t.s,{day:"numeric",month:"long"})+" até "+fmt(t.e,{day:"numeric",month:"long"})}</div>
    <p>${esc(t.d)}</p>
    <dl><dt>Entrega</dt><dd>${esc(t.out)}</dd>${t.h?`<dt>Esforço</dt><dd>≈ ${t.h} h no total</dd>`:""}</dl>
    ${S.length?`<h3>Etapas<span>${doneSteps(t)} de ${S.length}</span></h3><ul class="steps">${S.map((s,i)=>`<li class="${m[i]?"ok":""}"><input type="checkbox" id="st-${id}-${i}" data-step="${i}" ${m[i]?"checked":""}><label for="st-${id}-${i}">${esc(s.t)}${s.u?`<br><a href="${s.u}" target="_blank" rel="noopener">${esc(s.l||"Tutorial")} ↗</a>`:""}</label></li>`).join("")}</ul>`:""}
    ${t.ms?"":`<div class="status" role="group" aria-label="Andamento">${sts.map(([k,n])=>`<button data-st="${k}" aria-pressed="${st(t.id)===k}">${n}</button>`).join("")}</div>`}`;
  panel.dataset.id=id;sheet.hidden=false;(panel.querySelector(focusSel||"#closeBtn")||panel.querySelector("#closeBtn")).focus();
}
function close(){sheet.hidden=true;if(lastFocus&&document.contains(lastFocus))lastFocus.focus()}
sheet.addEventListener("click",e=>{
  if(e.target===sheet||e.target.closest("#closeBtn"))return close();
  const b=e.target.closest("[data-st]");if(b){state.status[panel.dataset.id]=b.dataset.st;save();render();open(panel.dataset.id,`[data-st="${b.dataset.st}"]`)}
});
sheet.addEventListener("change",e=>{
  const c=e.target.closest("[data-step]");if(!c)return;const id=panel.dataset.id;const t=TASKS.find(x=>x.id===id);
  const m=state.steps[id]=state.steps[id]||{};if(c.checked)m[c.dataset.step]=1;else delete m[c.dataset.step];
  const n=doneSteps(t);
  if(n===t.st.length)state.status[id]="done";
  else if(n>0)state.status[id]="doing";
  else if(st(id)!=="todo")state.status[id]="todo";
  save();render();open(id,`[data-step="${c.dataset.step}"]`);
});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!sheet.hidden)close()});

document.getElementById("themeBtn").addEventListener("click",()=>{
  const r=document.documentElement;const cur=r.dataset.theme||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");
  r.dataset.theme=cur==="dark"?"light":"dark";try{localStorage.setItem("estudos-theme",r.dataset.theme)}catch(e){}
});

chips();render();
