<script>
import copy from "../data/copy.json";
import LatestList from "$lib/latest-list/index.svelte";
import EveIs from "$lib/eve-is/index.svelte";

import { fade } from "svelte/transition";

const is_isms = copy.is_isms;
const latest_items = copy.latest_items;
let shuffleing = $state(false);

let tags = ["all", "journalism", "data vis", "interactives", "art"];
let selectedTag = $state("journalism");



</script>
<div class="page-wrapper" out:fade={{ duration: 500 }} in:fade={{ duration: 500, delay: 500 }}>

<EveIs {is_isms} {tags} bind:shuffleing={shuffleing} bind:selectedTag={selectedTag} />

<LatestList {latest_items} {tags} bind:selectedTag={selectedTag} {shuffleing}/>

</div> 
{#if !shuffleing}
<div class="footer">

  <p class="text"> Made with SvelteKit by Eve Washington © 2025 </p>
  <p class="links"> 
    <a href="https://github.com/evewashington/2025-website-upgrade">Repo</a> |
    <a href="https://evewashington.github.io/college-portfolio/">Old Site</a>  | 
    <a href="https://instagram.com/eve.washington">IG</a> |
    <a href="https://linkedin.com/in/eve-w">LinkedIn</a>
    </p>
  
</div>
{/if}

<style>

.page-wrapper {
    padding: 40px; 
}


  .footer {
    text-align: center;
    margin: 20px 0;
    font-size: 0.9em;
  }

  .footer .text {
    margin: 0;
    font-weight: 600;
  }

  .footer .links {
    margin-top: 5px

  }

  .footer a {
    color: unset
  }

  .footer a:hover {
    text-decoration: underline;
}

@media (max-width: 600px) {
    .page-wrapper {
        padding: 20px;
    }
}
</style>
