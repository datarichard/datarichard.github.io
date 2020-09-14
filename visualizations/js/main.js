// https://observablehq.com/@datarichard/moving-bubble-plot-of-hospital-transfers-using-d3-js@613
export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["trajectories@5.csv",new URL("./files/057b08f9c583d5373531999c67c7cb5355a7c6ab383baca19f8e5aa66750209d69a0a81c37502c0da6cd0cfbdbc152504e1b242db39cbb44a823dbccf226e3b3",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Moving bubble plot of hospital transfers using D3.js
***  
The data is ICD-10 coded STEMI patients (I21.0-3) who presented to ED and were admitted within NSLHD and CCLHD. Only patients who were transferred between facilities are shown.
<br>

Each day since May 1st 2016 is shown.`
)});
  main.variable(observer()).define(["html"], function(html){return(
html`<!DOCTYPE html>
<head>
  <meta charset="utf-8">
  <title>Timed Moving Bubbles</title>
  <link rel="stylesheet" href="style/style.css" type="text/css" media="screen" />
</head>
 
<div id="main-wrapper">
  <h1 id="timecount">Day: <span class="cnt">0</span></h2>
  <div id="chart"></div>
</div><!-- @end #main-wrapper -->
`
)});
  main.variable(observer("chart")).define("chart", ["d3","width","height","nodes","groups","forceCluster","forceCollide"], function(d3,width,height,nodes,groups,forceCluster,forceCollide)
{
  // Variables.
  let time_so_far = 0;
  
  // The SVG object.
  const svg = d3.create("svg")
    .attr("viewBox", [0, 0, width+40, height+40]);
  
  // ???
  svg.append("g")
    .attr("transform", "translate(" + 20 + "," + 20 + ")");
    
  // ???
  d3.select("#chart").style("width", (width + 20 + 20) + "px");

  // Circle for each node.
  const circle = svg.append("g")
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("fill", d => d.color);

  // Ease in the circles.
  circle
    .transition()
      .delay((d, i) => i * 5)
      .duration(800)
      .attrTween("r", d => {
          const i = d3.interpolate(0, d.r);
          return t => d.r = i(t);
    });
  
  // Group name labels
  svg.selectAll('.grp')
    .data(d3.keys(groups))
    .join("text")
    .attr("class", "grp")
    .attr("text-anchor", "middle")
    .attr("x", d => groups[d].x)
    .attr("y", d => groups[d].y - 70)
    .text(d => groups[d].fullname);

  // Group counts
  svg.selectAll('.grpcnt')
    .data(d3.keys(groups))
    .join("text")
    .attr("class", "grpcnt")
    .attr("text-anchor", "middle")
    .attr("x", d => groups[d].x)
    .attr("y", d => groups[d].y - 50)
    .text(d => groups[d].cnt);
  
  // Forces
  const simulation = d3.forceSimulation(nodes)
    .force("x", d => d3.forceX(d.x))
    .force("y", d => d3.forceY(d.y))
    .force("cluster", forceCluster())
    .force("collide", forceCollide())
    .alpha(.09)
    .alphaDecay(0);

  // Adjust position (and color) of circles.
  simulation.on("tick", () => {
    circle
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);
      // .attr("fill", d => groups[d.group].color);
  });
  
  // Make time pass. Adjust node stage as necessary.
  function timer() {
    nodes.forEach(function (o, i) {
      o.timeleft -= 1;
      if (o.timeleft == 0 && o.istage < o.stages.length - 1) {
        // Decrease count for previous group.
        groups[o.group].cnt -= 1;
        // Update current node to new group.
        o.istage += 1;
        o.group = o.stages[o.istage].grp;         // grp FROM CSV?
        o.timeleft = o.stages[o.istage].duration; // HERE IS DURATION
        // Increment count for new group.
        groups[o.group].cnt += 1;
      }
    });
    // Increment time.
    time_so_far += 1;
    d3.select("#timecount .cnt").text(time_so_far);
    // Update counters.
    svg.selectAll('.grpcnt').text(d => groups[d].cnt);
    // Do it again.
    d3.timeout(timer, 500);
  } // @end timer()
  
  // Start things off after a few seconds.
  d3.timeout(timer, 1000);
  
  return svg.node()
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`The data consists of _pid_, _grp_ and _duration_. _pid_ is the identity (ID) of the patient (i.e., anonymised journey key), represented by a moving circle in the visualization.  _grp_ is the hospital that each patient can visit at any one time: _RNS_, _Hornsby_, _Gosford_, _Ryde_. Only transfers are represented here so all patients will visit at least two hospitals, moving between each hospital in a serial fashion. The length of time (days since May 1st 2016) until transfer is given in _duration_.  

Note that the row order of the data provides the order of transfers for each patient.`
)});
  main.variable(observer()).define(["FileAttachment"], function(FileAttachment){return(
FileAttachment("trajectories@5.csv")
)});
  main.variable(observer()).define(["FileAttachment"], function(FileAttachment){return(
FileAttachment("trajectories@5.csv").text()
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@5")
)});
  main.variable(observer("width")).define("width", function(){return(
860
)});
  main.variable(observer("height")).define("height", function(){return(
600
)});
  main.variable(observer("radius")).define("radius", function(){return(
5
)});
  main.variable(observer("padding")).define("padding", function(){return(
1
)});
  main.variable(observer("cluster_padding")).define("cluster_padding", function(){return(
5
)});
  main.variable(observer("groups")).define("groups", function()
{
  const groups = {
    "Gosford": { x: 450, y: 150, color: "#93D1BA", cnt: 0, fullname: "Gosford" },
    "Wyong": { x: 550, y: 100, color: "#BEE5AA", cnt: 0, fullname: "Wyong"},
    "Hornsby": { x: 200, y: 375, color: "#79BACE", cnt: 0, fullname: "Hornsby" },
    "Ryde": { x: 150, y: 500, color: "lightblue", cnt: 0, fullname: "Ryde" },
    "Mona Vale": { x: 500, y: 350, color: "pink", cnt: 0, fullname: "Mona Vale"},
    "Manly": { x: 450, y: 500, color: "#FAF49A", cnt: 0, fullname: "Manly"},
    "RNS": { x: 300, y: 550, color: "grey", cnt: 0, fullname: "RNS" },
  };
  return groups
}
);
  main.variable(observer()).define(["groups"], function(groups){return(
groups['RNS']
)});
  main.variable(observer("stages")).define("stages", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
d3.csvParse(await FileAttachment("trajectories@5.csv").text(), d3.autoType)
)});
  main.variable(observer()).define(["stages"], function(stages){return(
stages[10]
)});
  main.variable(observer("people")).define("people", ["stages","d3"], function(stages,d3)
{
  const people = {};
  stages.forEach(d => {
    if (d3.keys(people).includes(d.pid + "")) {
      people[d.pid + ""].push(d);
    } else {
      people[d.pid + ""] = [d];
    }
  });
  return people
}
);
  main.variable(observer("nodes")).define("nodes", ["d3","people","groups","radius"], function(d3,people,groups,radius){return(
d3.keys(people).map(function(d) {
  // Initialize count for each group.
  groups[people[d][0].grp].cnt += 1;
  return {
    id: "node"+d,
    x: groups[people[d][0].grp].x + Math.random(),
    y: groups[people[d][0].grp].y + Math.random(),
    r: radius,
    color: groups[people[d][0].grp].color,
    group: people[d][0].grp,
    timeleft: people[d][0].duration,
    istage: 0,
    stages: people[d]
  }
})
)});
  main.variable(observer("forceCluster")).define("forceCluster", ["groups"], function(groups){return(
function forceCluster() {
  const strength = .15;
  let nodes;

  function force(alpha) {
    const l = alpha * strength;
    for (const d of nodes) {
      d.vx -= (d.x - groups[d.group].x) * l;
      d.vy -= (d.y - groups[d.group].y) * l;
    }
  }
  force.initialize = _ => nodes = _;

  return force;
}
)});
  main.variable(observer("forceCollide")).define("forceCollide", ["padding","cluster_padding","d3"], function(padding,cluster_padding,d3){return(
function forceCollide() {
  const alpha = 0.2; // fixed for greater rigidity!
  const padding1 = padding; // separation between same-color nodes
  const padding2 = cluster_padding; // separation between different-color nodes
  let nodes;
  let maxRadius;

  function force() {
    const quadtree = d3.quadtree(nodes, d => d.x, d => d.y);
    for (const d of nodes) {
      const r = d.r + maxRadius;
      const nx1 = d.x - r, ny1 = d.y - r;
      const nx2 = d.x + r, ny2 = d.y + r;
      
      quadtree.visit((q, x1, y1, x2, y2) => {
        if (!q.length) do {
          if (q.data !== d) {
            const r = d.r + q.data.r + (d.group === q.data.group ? padding1 : padding2);
            let x = d.x - q.data.x, y = d.y - q.data.y, l = Math.hypot(x, y);
            if (l < r) {
              l = (l - r) / l * alpha;
              d.x -= x *= l, d.y -= y *= l;
              q.data.x += x, q.data.y += y;
            }
          }
        } while (q = q.next);
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      });
    }
  }

  force.initialize = _ => maxRadius = d3.max(nodes = _, d => d.r) + Math.max(padding1, padding2);

  return force;
}
)});
  return main;
}
