const p=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const s of e.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function i(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerpolicy&&(e.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?e.credentials="include":t.crossorigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function r(t){if(t.ep)return;t.ep=!0;const e=i(t);fetch(t.href,e)}};p();class n extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
      :host {
        margin: 2em;
      }

      .container-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 275px;
        height: 400px;

        transform-style: preserve-3d;

        perspective: 1000px;
        position: relative;
      }

      .card::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background: radial-gradient(transparent 30%, #000d);
      }

      .card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        height: 100%;

        font-family: Montserrat, sans-serif;

        background: linear-gradient(#fff, #aaa);
        background-color: #fff;
        background-image: var(--background-image);
        background-repeat: no-repeat;
        background-position: var(--bpx, 0%) var(--bpy, 0%);
        background-size: cover;
        border: 20px solid #fff;
        border-radius: 10px;
        box-shadow: 0 0 15px #000;
        transform: rotateY(var(--ry, 0deg)) rotateX(var(--rx, 0deg));
      }

      h1 {
        margin: 0;
        text-shadow: 0 0 10px #000a;

        color: #fff;
      }

      .sticker {
        transform: rotateY(var(--ry, 0deg)) rotateX(var(--rx, 0deg)) translateZ(42px);
      }

      .sticker,
      h1,
      p {
        z-index: 5;
        pointer-events: none;
      }

      p {
        color: #fff;
        font-weight: 300;
        text-shadow: 2px 2px 2px #000;
      }
    `}connectedCallback(){this.title=this.getAttribute("title"),this.src=this.getAttribute("src"),this.description=this.getAttribute("description"),this.background=this.getAttribute("background"),this.style.setProperty("--background-image",`url(${this.background})`),this.render(),this.init()}init(){const o=this.shadowRoot.querySelector(".card");this.shadowRoot.querySelector(".card img");const i=(r,t,e)=>{const s=t.clientWidth,a=t.clientHeight,c=Math.abs(r.offsetX/10)-s/20,d=Math.abs(r.offsetY/10)-a/20,l=Math.abs(r.offsetX/4)/s*100,f=Math.abs(r.offsetY/4)/a*100;t.style.setProperty("--bpx",`${l}%`),t.style.setProperty("--bpy",`${f}%`),t.style.setProperty("--ry",`${-c}deg`),t.style.setProperty("--rx",`${-d}deg`)};o.addEventListener("mousemove",r=>r.target===o&&i(r,o))}render(){this.shadowRoot.innerHTML=`
    <style>${n.styles}</style>
    <div class="container-card">
      <div class="card">
        <h1>${this.title}</h1>
        <img class="sticker" src="${this.src}" alt="${this.title}">
        <p>${this.description}</p>
      </div>
    </div>`}}customElements.define("parallax-card",n);
