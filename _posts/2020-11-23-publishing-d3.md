<div class="Title"></div>
<div class="chart"></div>
<div class="legend"></div>
<p>Credit: <a href="https://observablehq.com/@datarichard/primary-stroke-hospital-transfers-to-and-from-rns">Primary stroke hospital transfers to and from RNS by Richard Morris</a></p>

<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js";
import define from "https://api.observablehq.com/@datarichard/primary-stroke-hospital-transfers-to-and-from-rns.js?v=3";
(new Runtime).module(define, name => {
  if (name === "Title") return Inspector.into(".Title")();
  if (name === "chart") return Inspector.into(".chart")();
  if (name === "legend") return Inspector.into(".legend")();
});
</script>