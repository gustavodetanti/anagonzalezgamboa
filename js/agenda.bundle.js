(() => {
  // www/src/svg/Svg.js
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

  // www/src/components/CerdaHorizontal.js
  function CerdaHorizontal(div) {
    console.log("cerdaHorizontal", div);
    div.style.margin = "2px auto";
    let w = div.clientWidth;
    let h = div.clientHeight;
    let svg = addSvg(div, w, h, { backgroundColor: "none" });
    let hh;
    let ar1 = [];
    let ar2 = [];
    let r1 = parseInt(Math.random() * 4) + 2;
    let r2 = parseInt(Math.random() * 5) + 2;
    let first = r1 > r2 ? r1 : r2;
    let last = r1 == first ? r2 : r1;
    hh = h / first;
    for (var i = 0; i < first; i++) {
      ar1.push(hh * (i + 1));
    }
    for (var i = 0; i < first; i++) {
      if (ar2.length >= last)
        ar2.push(hh * (Math.random() * last) + 10);
      else {
        let n = hh * i;
        n += Math.random() * (hh / 2);
        ar2.push(n);
      }
    }
    for (var i = 0; i < first; i++) {
      let f = Math.random() < 0.5 ? ar1 : ar2;
      let l = f == ar1 ? ar2 : ar1;
      addSvgElement(svg, "path", { d: `M10,${f[i]} L ${w - 10},${l[i]}`, stroke: "#aaaaaa" });
      addSvgElement(svg, "circle", { cx: 10, cy: f[i], r: 3, fill: "#333333", stroke: "none" });
      addSvgElement(svg, "circle", { cx: w - 10, cy: l[i], r: 3, fill: "#333333", stroke: "none" });
    }
  }

  // www/src/agenda.js
  function agendaLoaded(json) {
    let str = "";
    let txt = ``;
    let years = '<a href="index.html">HOME</a><br><br>';
    json.forEach(function(a) {
      txt += "\n\n\n\n" + a.year + "\n\n";
      years += `<a href='#${a.year}'>${a.year}</a> <br><br> `;
      str += `
    <a name='${a.year}' ></a>
    <div class='cerdaHorizontal' style='width:100px; height:50px;'>-</div>
    <div class='agenda-year' data-year='${a.year}'><h2 style='color:#337733'><b>${a.year}</b></h2>`;
      a.events.forEach(function(e) {
        str += `<div class='agenda-date' data-date='${e.date}'><b>${e.date}</b><p>`;
        txt += e.date + "\n\n";
        e.lines.forEach(function(li) {
          str += `${li}<br>`;
          txt += li + "\n";
        });
        txt += "\n\n";
        str += `</p></div>`;
      });
      str += `</div><!-- end -->`;
    });
    document.querySelector(".years").innerHTML = years;
    console.log(txt);
    document.querySelector("textarea").innerHTML = txt;
    document.querySelector(".content").innerHTML = str;
    [...document.querySelectorAll(".cerdaHorizontal")].forEach((cerda) => {
      CerdaHorizontal(cerda);
      console.log(cerda);
    });
  }
  document.addEventListener("DOMContentLoaded", () => {
    fetch("json/agenda.json").then((data) => data.json()).then((json) => {
      agendaLoaded(json);
    }).catch((err) => {
      console.log(err);
    });
  });
})();
