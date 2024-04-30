(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();const g=document.getElementById("cards_wrapper"),l=document.getElementById("search_input"),b=document.getElementById("search_box"),E=document.querySelector(".search_submit"),d=document.querySelector(".lang_change"),I=document.getElementById("top_button"),f=d.lastElementChild,p=d.firstElementChild,v=document.body;let w="",_=1,u="ko",i={page:0,results:[],total_pages:0,total_results:0},y=[];function M(){const t=window.innerHeight*.01;document.documentElement.style.setProperty("--vh",`${t}px`)}function x(){window.dispatchEvent(new Event("resize"))}const S=async(t,e)=>{const n=String(e);let s="";t==="ko"?s="ko-kr":t==="en"&&(s="en-US");const r=`https://api.themoviedb.org/3/movie/top_rated?language=${s}&page=${n}`,o={method:"GET",headers:{accept:"application/json",Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTMzNGMzYmY5YzU0MzVhOWU4MDZkMmI3NDlhMmM5MSIsInN1YiI6IjY2MjViMWFjZWI3OWMyMDE3ZWQzZjY4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GEfKvRKY7frVeo_dDiR84gHShsAMWhaDGnfxBePSaBE"}};try{const a=await fetch(r,o);if(!a.ok)throw new Error("서버 응답 실패");const c=await a.json();return e===1?(i=c,y=[...c.results]):(i={page:c.page,results:[...i.results,...c.results],total_pages:c.total_pages,total_results:c.total_results},y=[...i.results,...c.results]),c}catch(a){console.log(a)}},T=(t,e,n=!1)=>`
            <div class='card ${n?"modal-card":""}' data-id=${t.id}>
                <div class='movie_poster_box'>
                    <img src='https://image.tmdb.org/t/p/w500${t.poster_path}' alt='poster' />
                </div>
                <div class='movie_info'>
                    <h2>${t.title}</h2>
                    <span>평점 : ${e}</span>
                    <p class="movie_info_p ${n?"modal_info":""}">${t.overview}</p>
                </div>
            </div>
        `,L=(t,e)=>t.map((r,o)=>{const a=Math.round(r.vote_average*10)/10;return T(r,a,e)}).join(""),h=async(t,e)=>{e&&(g.innerHTML="");const n=await S(t,_),s=L(n.results,!1);return g.insertAdjacentHTML("beforeend",s),n},j=()=>{v.style.overflowY="hidden";const t=document.createElement("div");return t.setAttribute("class","searched_modal"),t.insertAdjacentHTML("beforeend",'<div class="searched_inner"></div>'),v.insertAdjacentElement("afterbegin",t),t},C=(t,e)=>{if(e.length===0){alert("검색어를 입력하세요!");return}return y.filter(s=>s.title.toLowerCase().includes(e))},O=(t,e)=>{t.preventDefault();const n=C(t,e);if(!n)return;if(n.length===0){alert("검색결과가 없습니다!");return}const s=j();n.length<=4&&(s.style.overflowY="hidden");const r=L(n,!0);s.addEventListener("click",o=>{v.style.overflowY="auto",(o.target.className==="searched_modal"||o.target.className==="searched_inner")&&o.currentTarget.remove()}),s.firstChild.insertAdjacentHTML("beforeend",r)},B=t=>{const e=t.target.closest(".card");if(e){const n=e.dataset.id;alert(`영화의 ID 는 : ${n} 입니다.`)}},m=t=>{const e=document.querySelectorAll(".card"),n=e[e.length-1];t.observe(n)},z=(t,e)=>{t.forEach(async n=>{const{target:s}=n;n.isIntersecting&&(_++,e.unobserve(s),await h(u,!1),m(e))})},k=async(t,e,n)=>{const s=n.dataset.lang,r=document.querySelector("header h1");_=1,s==="ko"?(n.dataset.lang="en",u="en",await h("en",!0),m(e),r.innerText="movieAllmovies",l.placeholder="Let's Search for A Movie",E.innerText="search",p.style.textShadow="1px 1px 2px white, 0 0 1em white, 0 0 0.2em white",p.style.color="white",f.style.color="#cfcfcf"):s==="en"&&(n.dataset.lang="ko",u="ko",await h("ko",!0),m(e),r.innerText="영화다영화",l.placeholder="영화를 검색해보자",E.innerText="검색",f.style.textShadow="1px 1px 2px white, 0 0 1em white, 0 0 0.2em white",f.style.color="white",p.style.color="#cfcfcf")},A=t=>{let e=t.target.value;/[a-zA-Z]/.test(e)?w=e.toLowerCase():w=e},H=()=>{window.scrollTo({left:0,top:0,behavior:"smooth"})},$=async()=>{window.addEventListener("orientationchange",x,!1),window.addEventListener("resize",M),window.dispatchEvent(new Event("resize")),await h(u,!1),I.addEventListener("click",H),l.focus();const t=new IntersectionObserver((e,n)=>z(e,n),{threshold:.8});m(t),d.addEventListener("click",e=>k(e,t,d)),g.addEventListener("click",B),l.addEventListener("input",A),b.addEventListener("submit",e=>O(e,w))};$();
