class ParallaxCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
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
    `;
  }

  connectedCallback() {
    this.title = this.getAttribute("title");
    this.src = this.getAttribute("src");
    this.description = this.getAttribute("description");
    this.background = this.getAttribute("background");
    this.style.setProperty("--background-image", `url(${this.background})`);
    this.render();
    this.init();
  }

  init() {
    const card = this.shadowRoot.querySelector(".card");
    const image = this.shadowRoot.querySelector(".card img");

    const moveCard = (ev, card, image) => {
      const w = card.clientWidth;
      const h = card.clientHeight;
      const x = Math.abs(ev.offsetX / 10) - w / 20;
      const y = Math.abs(ev.offsetY / 10) - h / 20;

      const bpx = (Math.abs(ev.offsetX / 4) / w) * 100;
      const bpy = (Math.abs(ev.offsetY / 4) / h) * 100;

      // Background Position values
      card.style.setProperty("--bpx", `${bpx}%`);
      card.style.setProperty("--bpy", `${bpy}%`);

      // Card Transform Rotate values
      card.style.setProperty("--ry", `${-x}deg`);
      card.style.setProperty("--rx", `${-y}deg`);
    };

    card.addEventListener("mousemove", (ev) => ev.target === card && moveCard(ev, card, image));
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${ParallaxCard.styles}</style>
    <div class="container-card">
      <div class="card">
        <h1>${this.title}</h1>
        <img class="sticker" src="${this.src}" alt="${this.title}">
        <p>${this.description}</p>
      </div>
    </div>`;
  }
}

customElements.define("parallax-card", ParallaxCard);
