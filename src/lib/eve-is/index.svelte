<script>
    import { onMount } from "svelte";
    import {fade} from "svelte/transition";

    import { base } from '$app/paths';

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

    const selectRandomTag = (tags, selected = selectedTag, fallback = "all") => {
        let possibletags = tags.filter(t => t !== selected);
        if (possibletags.length === 0) return fallback;

        const randomIndex = Math.floor(Math.random() * possibletags.length);
        return possibletags[randomIndex];
    };

    let shuffleTextOptions = [
        "press me",
        "shuffle",
        "mix it up",
        "change colors",
        "new vibe",
        "fresh look",
        "try again",
        "that the best you can do?",
        "surprise me",
        "let's see it again",
        "give me a new one",
        "another round",
        "hit me baby one more time",
    ];

    let icons = [
        "favicon.png",
        "favicon-2.png",
        "favicon-3.png",
        "favicon-4.png",
    ]
    let selectedIcon = $state(icons[0]);
    let currentColorComboIndex = 0;
    let shuffleText = $state(shuffleTextOptions[0]);
    const shuffle = (e) => {
        if (e && e.type === "keydown" && e.key !== "Enter") {
            return; // only respond to Enter key
        }

        if (e) {
            shuffleText = selectRandomTag(shuffleTextOptions, shuffleText, shuffleTextOptions[0]);
        }
       
        
        shuffleing = true;
       

        //randomely change the color combo
    
        currentColorComboIndex++
        if (currentColorComboIndex >= color_combos.length) {
            currentColorComboIndex = 0;
        }
        if (mounted) {
            document.documentElement.style.setProperty('--bg-color', color_combos[currentColorComboIndex][0]);
            document.documentElement.style.setProperty('--fg-color', color_combos[currentColorComboIndex][1]);
            selectedTag = selectRandomTag(tags);
        }

        setTimeout(() => {
            if (e) {
                // shuffleText = selectRandomTag(shuffleTextOptions, shuffleText, shuffleTextOptions[0]);
                selectedIcon = selectRandomTag(icons, selectedIcon, icons[0]);
            }
        }, 300); // adjust the delay as needed

        setTimeout(() => {
            displayIds = selectRandomIs();
            shuffleing = false;
            // shuffleText = "shuffle";
        }, 700); // adjust the delay as needed   
       
    };

    let headHeight = $state(37);

</script>
<div class="icon-wrapper">
<img src={`${base}/${selectedIcon}`}  onclick={shuffle} onkeydown={shuffle} role="button" class:shuffleing alt="emoji" width="32" height="32"/>
</div>

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
    <span class="read-more" class:shuffleing={shuffleing} class:not-shuffleing={!shuffleing}><a href="{base}/about">read more »</a></span>
    {/if}
    </div>
</div>


<button class="shuffle-button" onclick={shuffle} onkeydown={shuffle}>
    <!-- <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="m360-240 56-56-62-64h166v-80H354l62-64-56-56-160 160 160 160Zm240-160 160-160-160-160-56 56 62 64H440v80h166l-62 64 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg> -->
    <!-- <svg xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 17 15">
    <path d="M11.9004 0L16.0656 3.55738L11.9004 7.11475L16.0656 10.6721L11.9004 14.2295V11.8579H9.72661L7.48933 9.62863L9.17126 7.95271L10.7104 9.48634H11.9004V7.11475V4.74317H10.7104L3.57013 11.8579H0V9.48634H2.58636L9.72661 2.37158H11.9004V0ZM0 2.37158H3.57013L5.80741 4.60087L4.12548 6.27679L2.58636 4.74317H0V2.37158Z"/>
    </svg> -->
    <svg xmlns="http://www.w3.org/2000/svg" height="1.3em" viewBox="0 -960 960 960" width="1.3em"><path d="M560-160v-80h104L537-367l57-57 126 126v-102h80v240H560Zm-344 0-56-56 504-504H560v-80h240v240h-80v-104L216-160Zm151-377L160-744l56-56 207 207-56 56Z"/></svg>
    {shuffleText}
</button>

<style>

    .wrapper-wrapper {
        margin-top: 90px;
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





    /* svg {
        padding-left: 10px;
    } */

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
        font-size: 18px;
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
        text-align: left;
    
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

    .icon-wrapper {
        text-align: right;
    }
    
    .icon-wrapper img {
        animation: icon-spin 4s linear infinite;
        cursor: pointer;
        /* transition: animation-duration 3s ease-in-out; */
    }

    .icon-wrapper img.shuffleing {
        opacity: 1;
        animation-duration: 0.3s;

    }

    @keyframes icon-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    @media (max-width: 400px) {
        .head-wrapper {
            font-size: 24px;
        }
        button {
            font-size: 14px;
        }
    }

</style>