(() => {
  // src/svg/Svg.js
  function addSvg(parent, w, h, attrs) {
    let g = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    g.setAttribute("width", w || 1e3);
    g.setAttribute("height", h || 600);
    g.setAttribute("viewBox", `0 0 ${w || 1e3} ${h || 600}`);
    if (attrs) {
      for (let i in attrs) {
        g.setAttribute(i, attrs[i]);
      }
    }
    parent.appendChild(g);
    return g;
  }
  function addSvgElement(parent, nodename, attrs) {
    let g = document.createElementNS("http://www.w3.org/2000/svg", nodename);
    if (attrs) {
      for (let i in attrs) {
        g.setAttribute(i, attrs[i]);
      }
    }
    parent.appendChild(g);
    return g;
  }
  function setAttrs(el, attrs) {
    for (let i in attrs) {
      el.setAttribute(i, attrs[i]);
    }
  }

  // src/components/functions/rand.js
  var Colores = "#aaaaaa #bbbbbb #cccccc #aaaaaa #bbbbbb #cccccc #aaaaaa #bbbbbb #cccccc #aaaaaa #bbbbbb #cccccc #000000 #55ff66".split(" ");
  function randCol(arr) {
    return arr ? rand(arr) : rand(Colores);
  }
  function noiseVal(n) {
    return Math.random() * n - n / 2;
  }
  function rand(v) {
    if (!isNaN(v)) {
      return parseInt(Math.random() * v);
    }
    return v[parseInt(Math.random() * v.length)];
  }

  // src/components/functions/Pt.js
  function Pt(x, y) {
    if (x == null || y == null)
      return { x: 0, y: 0 };
    return { x, y };
  }

  // src/components/Cerdas.js
  function Cerdas(svg, ww, hh, nsegs, conf) {
    if (conf) {
    } else {
      conf = {};
    }
    let configuration = { nsegs, noise: 150, ...conf };
    let active = true;
    let noise = configuration.noise;
    let flap;
    let amp = 30;
    let altern = false;
    let path;
    let secs = 1;
    let sto;
    let op, ep, dots = [], x, y, lh, sh, lw, sw;
    change(true);
    path.addEventListener("mouseover", change);
    function change(firstChange) {
      if (!active)
        return;
      buildPoints(nsegs, { w: ww, h: hh });
      changePathColor(path);
      clearTimeout(sto);
      let rt = rand(8e3) + 3e3;
      sto = setTimeout(function() {
        change();
      }, firstChange ? 0.1 : rt);
    }
    function setActive(bol) {
      if (bol) {
        active = true;
        change();
        return;
      }
      clearTimeout(sto);
      active = false;
    }
    function buildPoints(segs, svgSize) {
      let noiseTemp = Math.random() * 30 < 2 ? noise * 3 : noise;
      op = Pt(svgSize.w / 2, 0);
      ep = Pt(svgSize.w / 2, svgSize.h);
      dots = [];
      x = op.x;
      y = op.y;
      lh = ep.y - op.y;
      sh = lh / segs;
      lw = ep.x - op.x;
      sw = lw / segs;
      for (var i = 1; i <= segs; i++) {
        x += sw;
        y += sh;
        let nsy = y + noiseVal(sh / 2);
        let rrx = flap ? x - (amp + noiseVal(noiseTemp)) : x + (amp + noiseVal(noiseTemp));
        if (i == segs - 1)
          rrx = op.x;
        dots.push({
          lab: "S ",
          y: i == segs ? ep.y : nsy,
          x: i == segs ? op.x : x + noiseVal(noiseTemp),
          ry: nsy - sh / 2,
          rx: rrx
        });
        if (altern)
          flap = !flap;
      }
      points = [
        { lab: "M ", hidden: true, x: op.x, y: op.y },
        { lab: "L ", x: op.x, y: op.y },
        ...dots
      ];
      d = `${points.map((p) => {
        let str = " " + p.lab;
        if (isNaN(p.rx)) {
        } else {
          str += p.rx + " , " + p.ry + " ";
        }
        if (isNaN(p.x)) {
        } else {
          str += p.x + " , " + p.y + " ";
        }
        return str;
      }).join(" ")} `;
      let id = rand(1e5);
      let rn = Math.random() * 2 + 0.4;
      if (path) {
        setAttrs(path, { d, style: `transition: all ${rn}s ease-in-out` });
      } else {
        path = addSvgElement(svg, "path", { id, d, stroke: randCol(), fill: "none", style: `transition: all ${Math.random() / 3 + 0.2}s ease-in-out` });
        addSvgElement(svg, "circle", { cx: op.x, cy: ep.y, r: 10, fill: "#222222", stroke: "none" });
      }
    }
    function changePathColor(pathElement) {
      pathElement.setAttribute("stroke", randCol());
    }
    return { change, setActive };
  }

  // src/components/VNav.js
  function VNav(fn) {
    let nav = document.querySelector(".main-nav");
    if (nav) {
    } else
      return "";
    let buts = [...nav.querySelectorAll("a")];
    let str = "";
    let n = buts.length;
    buts.forEach((b, i) => {
      b.style.marginLeft = `${parseInt(Math.random() * 70)}px`;
      b.style.transform = `rotate(${0}deg)`;
      setTimeout(() => {
        b.style.opacity = `${1}`;
        b.style.transform = `rotate(${parseInt(Math.random() * 30) - 15}deg)`;
      }, (i + 1) * 300);
    });
    fn(n + 2);
  }

  // src/main.js
  var CERDAS = [];
  var apdivs;
  var logdiv;
  window.addEventListener("DOMContentLoaded", (event) => {
    let header = document.body.querySelector("header");
    if (header) {
    } else {
      header = document.createElement("header");
      document.body.prepend(header);
    }
    header.innerHTML = `<header>
<div class='logo'>
[ Ana Gonzalez Gamboa ]<br><span> [ Compositora, violoncellista experimental e improvisadora ] </span>
</div>
</header>`;
    apdivs = [...document.querySelectorAll(".js-app")];
    logdiv = document.querySelector(".log");
    init();
  });
  function init() {
    VNav(navCreated);
  }
  function navCreated(n) {
    svgInit(n * 112);
    createSections();
  }
  function createSections() {
    apdivs.forEach(function(el, index) {
      if (index == 0) {
        return;
      }
      let w = window.innerWidth;
      let serds = el.getAttribute("data-ncerdas");
      if (isNaN(serds)) {
        serds = 9;
      }
      let nsegs = el.getAttribute("data-nsegs");
      if (isNaN(nsegs)) {
        nsegs = parseInt(Math.random() * 4 + 3);
      }
      let noise = el.getAttribute("data-noise");
      if (isNaN(noise)) {
        noise = 150;
      }
      let h = el.getAttribute("data-h");
      if (isNaN(h)) {
        h = window.innerHeight;
      }
      let svg = addSvg(apdivs[index], w, Number(h) + 20, { style: "background:none;" });
      for (var i = 0; i < serds; i++) {
        let C = Cerdas(svg, w, Number(h), parseInt(Math.random() * 4 + 3), { nsegs: Number(nsegs), noise: Number(noise) });
        CERDAS.push(C);
        C.setActive(false);
      }
    });
  }
  function svgInit(h) {
    let w = window.innerWidth;
    h = h || window.innerHeight;
    let svg = addSvg(apdivs[0], w, h + 20, { style: "background:#ffffffdd;" });
    for (var i = 0; i < 20; i++) {
      CERDAS.push(Cerdas(svg, w, h, parseInt(Math.random() * 4 + 3)));
    }
  }
})();
