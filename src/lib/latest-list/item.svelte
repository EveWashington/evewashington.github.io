<script> 
import { fade } from "svelte/transition";

const { item, i } = $props();

let imagesContainer = $state(null);
let showLeftArrow = $state(false);
let showRightArrow = $state(false);

function checkScrollArrows() {
    if (!imagesContainer) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = imagesContainer;
   
    showLeftArrow = scrollLeft > 0;
    showRightArrow = scrollLeft < scrollWidth - clientWidth;
    console.log("showLeftArrow", showLeftArrow, "showRightArrow", showRightArrow);
}

function handleScroll() {
    checkScrollArrows();
}

// Check arrows when component mounts and images load
$effect(() => {
    if (imagesContainer) {
        checkScrollArrows();
    }
});

const autoScroll = (direction) => {
    if (!imagesContainer) return;
    const scrollAmount = 100; // Adjust scroll amount as needed
    if (direction === 'left') {
        imagesContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else if (direction === 'right') {
        imagesContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
};

</script>

<div class="item" in:fade={{ duration: 1000, delay: 300 * i}}>
		<div class="date-wrapper">
			<h3 class="date">{item.displayDate}</h3>
		</div>
		<div class="content-wrapper">
			<h2 class="title">
                {#if item.url}
                <a href={item.url}>{item.head}</a>
                {:else}
                {item.head}
                {/if}
            </h2>
			<p class="description">{item.summary}</p>
			{#if item.img_paths}
				<div class="images-wrapper">
					<div 
						class="images" 
						bind:this={imagesContainer}
						onscroll={handleScroll}
					>
						{#each item.img_paths.split(',') as img_path}
							<img src="/{img_path.trim()}" onload={checkScrollArrows} />
						{/each}
					</div>
					{#if showLeftArrow}
						<div class="scroll-arrow scroll-arrow-left" 
                        tabindex="0"
                        role="button"
                        onkeydown={() => autoScroll('left')}
                        onclick={() => autoScroll('left')}>←</div>
					{/if}
					{#if showRightArrow}
						<div class="scroll-arrow scroll-arrow-right" 
                        role="button"
                        tabindex="0"
                        onkeydown={() => autoScroll('right')}
                        onclick={() => autoScroll('right')}>→</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>




<style>

	.date-wrapper {
	    margin-right: 20px;
        display: flex;
        padding-top: 5px;
        width: var(--date-width);
        min-width: var(--date-width);
	}

	.content-wrapper {
        width: calc(100% - var(--date-width));
	
	}


    .images-wrapper {
        position: relative;
        margin-top: 10px;
    }

    .images {
        margin-top: 0;
        display: flex;
        flex-direction: row;
        gap: 10px;
        overflow-y: auto;
        scroll-snap-type: x mandatory;
        scrollbar-width: none; /* Firefox */
    }

    .images img {
        scroll-snap-align: start;
    }

	.images::-webkit-scrollbar {
		display: none;
	}

	.item {
		display: flex;
		border-bottom: dotted 1px var(--fg-color);
		width: 100%;
		padding: 12px 0;
	}
	.date {
		font-size: 14px;
		font-weight: 400;
		white-space: nowrap;
		margin: 0;
		/* text-align: right; */
	}

	.title a {
        color: unset; 
        text-decoration: none;
        /* text-underline-offset: 5px;
        text-decoration-thickness: 1px; */
	}

	h2 {
		margin-top: 0;
		margin-bottom: 7px;
		line-height: 1.2;

        font-size: 20px;
		font-weight: 600;
		margin: 0;
		color: unset;
	}

	
	p {
		margin: 0;
	}

	img {
		max-width: 300px;
	}

	.scroll-arrow {
        position: absolute;
        right: 10px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        z-index: 1;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
    }

    .scroll-arrow-left {
        left: 5px;
    }

    .scroll-arrow-right {
        right: 5px;

    }

	@media (max-width: 600px) {
		.item {
			flex-direction: column;
			align-items: flex-start;
		}
		.date-wrapper {
			margin-right: 0;
			margin-bottom: 10px;
		}
		img {
			max-width: 100%;
		}
        .content-wrapper {
            width: 100%;
        }   
        .date-wrapper {
            width: 100%
        }
	}

</style>