<script>
    import { onMount } from "svelte";
    import {fade} from "svelte/transition";
    let { is_isms = [], tags = [], selectedTag = $bindable("journalism"), shuffleing = $bindable(false) } = $props();

    const {title, context, fun} = is_isms;

    let color_combos = [
        ["#564154", "#EFE4D2"],
        ["#172815", "#648E90"], 
        ["#752306", "#DC7F9B"], 
        ["#EFE4D2", "#564154"],
        ["#648E90", "#172815"], 
        ["#DC7F9B", "#752306"],
    ]

    // let shuffleing = $state(false);
    let mounted = $state(false);
    onMount(() => {
        // Ensure is_isms is an array
        shuffle();
        mounted = true;
    });

    let displayIds = $state([]);

    const selectRandomIs = () => {
        if (is_isms.length < 3) return is_isms;

        //filter out currently selected isms
        const filteredTitle = title.filter(is => !displayIds.includes(is.trim()));
        const filteredContext = context.filter(is => !displayIds.includes(is.trim()));
        const filteredFun = fun.filter(is => !displayIds.includes(is.trim()));
        const ismsArray = [filteredTitle, filteredContext, filteredFun];

        // selct three random isms
        const selectedIs = [];
        while (selectedIs.length < 3) {
            const targetArray = ismsArray[selectedIs.length];
            const randomIndex = Math.floor(Math.random() * targetArray.length);
            const randomIs = targetArray[randomIndex];
            if (!selectedIs.includes(randomIs)) {
                if (randomIs.trim() === "") continue; // skip empty strings
                // check if the randomIs is already in selectedIs
                if ((selectedIs.length === 0 || !selectedIs.includes(randomIs.trim()))) {
                    // if not, add it to selectedIs
                    selectedIs.push(randomIs.trim());
                }
            }
        }
        return selectedIs;
    };

    const selectRandomTag = () => {
        let possibletags = tags.filter(t => t !== selectedTag);
        if (possibletags.length === 0) return "all";
        
 
        const randomIndex = Math.floor(Math.random() * possibletags.length);
        return possibletags[randomIndex];
    };

    let currentColorComboIndex = 0;
    const shuffle = () => {
        
        shuffleing = true;

        //randomely change the color combo
    
        currentColorComboIndex++
        if (currentColorComboIndex >= color_combos.length) {
            currentColorComboIndex = 0;
        }
        if (mounted) {
            document.documentElement.style.setProperty('--bg-color', color_combos[currentColorComboIndex][0]);
            document.documentElement.style.setProperty('--fg-color', color_combos[currentColorComboIndex][1]);
            selectedTag = selectRandomTag();
        }

        setTimeout(() => {
            displayIds = selectRandomIs();
            shuffleing = false;
        }, 700); // adjust the delay as needed   
       
    };

    let headHeight = $state(37);

</script>

<div class="wrapper-wrapper" style:padding-bottom={headHeight + "px"}>
    <div class="head-wrapper" bind:clientHeight={headHeight}>
    Eve is

    <span class="ism-wrapper" class:shuffleing={shuffleing}>
        {#each displayIds as is, i (is)} 
            <span class="ism" in:fade={{ duration: 1000, delay: (i * 700) + 700 }}>
            {#if i == 2}
                <span class="ism-separator">, and {is}.</span>
            {:else if i == 1 }
                <span class="ism-separator">&nbsp;{is}</span>
            {:else}
            { is }
            {/if}  
            </span>
        {/each}
    </span>

    {#if mounted}
    <span class="read-more" class:shuffleing={shuffleing} class:not-shuffleing={!shuffleing}><a href="./about">read more »</a></span>
    {/if}
    </div>
</div>


<button class="shuffle-button" onclick={shuffle} onkeydown={shuffle}>
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 17 15">
    <path d="M11.9004 0L16.0656 3.55738L11.9004 7.11475L16.0656 10.6721L11.9004 14.2295V11.8579H9.72661L7.48933 9.62863L9.17126 7.95271L10.7104 9.48634H11.9004V7.11475V4.74317H10.7104L3.57013 11.8579H0V9.48634H2.58636L9.72661 2.37158H11.9004V0ZM0 2.37158H3.57013L5.80741 4.60087L4.12548 6.27679L2.58636 4.74317H0V2.37158Z"/>
    </svg>
    shuffle
</button>

<style>

    .wrapper-wrapper {
        margin-top: 100px;
        height: 1.5em;
        overflow: visible;
        transition: padding-bottom 0.5s ease-in-out;
    }

    .head-wrapper {
        max-width: 600px;
        font-size: 30px;
        font-weight: 600;
        text-wrap: pretty;

    }

    .ism-wrapper {
        opacity: 1;
        transition: opacity 0.5s ease-in-out;
    }

    .shuffleing {
        opacity: 0;
    }

    .read-more {
        font-size: 16px;
        font-weight: 400;
        color: unset;
        white-space: nowrap;
        transition: opacity 0.5s ease-in-out 4s;
        text-decoration: underline;
        cursor: pointer;
    }

    .read-more.shuffleing {
        transition: opacity 0.5s ease-in-out 0s;
        opacity: 0;
    }

    button {
        padding: 5px 10px;
        font-size: 20px;
        font-weight: 600;
        background-color: var(--fg-color) !important;
        color: var(--bg-color) !important;
        border-radius: 5px;
        font-family: unset;
        display: flex;
        align-items: center;
        margin-bottom: 100px;
        cursor: pointer;
        border: none;
    
    }

    button:hover {
        animation: wiggle 0.4s ease-in-out;
    }

    @keyframes wiggle {
        0% { transform: rotate(0deg); }
        20% { transform: rotate(-5deg); }
        40% { transform: rotate(5deg); }
        60% { transform: rotate(-4deg); }
        80% { transform: rotate(4deg); }
        100% { transform: rotate(0deg); }
    }
    
    button svg {
        fill: var(--bg-color);
        margin-right: 5px;
    }

    a {
        color: unset;
        text-decoration: unset;
    }



</style>