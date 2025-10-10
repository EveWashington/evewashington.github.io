<script>
import { fade} from "svelte/transition";
import bio_data from "../../data/bio.json";

const {bio, awards} = bio_data;

</script>


<div class="page-wrapper" in:fade={{ duration: 500, delay: 500 }} out:fade={{ duration: 500 }}>
<div class="navigate-back">
    <a href="../">« home</a>
</div>

<h3>About Eve</h3>
{#each bio as graf}
    <p>{graf}</p>
{/each}

{#if awards.length > 0}
    <h3>Awards</h3>
    <ul>
        {#each awards as award}
            <li>{award}</li>
        {/each}
    </ul>
{/if}

<h5>Get in touch with me at: eve [dot] s [dot] l [dot] washington [at] gmail [dot] com</h5>

</div>

<style>

h5 {
    font-weight: 300;
    font-size: 14px;
    margin-top: 40px;
}
.page-wrapper {
    padding: 80px 10px; 
    max-width: 600px;
    margin: 0 auto;
}

li {
    margin-bottom: 10px;
}

a {
    color: unset
}

</style>