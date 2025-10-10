<script>
    import {fade} from "svelte/transition"
    import Item from './item.svelte';

	let { latest_items = [], selectedTag = $bindable("journalism"), tags = [], shuffleing = $bindable(false) } = $props();

	let ascending = $state(false);
// let displayItems = $state(latest_items);

    let displayItems = $derived.by(() => {
        // console.log("latest_items", latest_items, "selectedTag", selectedTag);
        if (!latest_items) return [];
        // Create a sorted copy to avoid mutating the original array
        let sortedItems = [...latest_items].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return ascending ? dateA - dateB : dateB - dateA;
        }).map(d => {
            const [Y, M, _] = d.date.split("-");
            return { ...d, displayDate: `${Y}-${M}` };
        });

        // Filter by selectedTag
        if (selectedTag !== "all") {
            return sortedItems.filter(item => item.tags && item.tags.includes(selectedTag));
        }

        return sortedItems;
    });

    const checkOverflowAndToggleArrow = (element) => {
        const isOverflowing = element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight;
        if (isOverflowing) {
            element.classList.add('has-overflow');
        } else {
            element.classList.remove('has-overflow');
        }
    }

</script>

<div class="control-panel">
	<!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
	<div class="sort-toggle" role="button"
				tabindex="0"
				onclick={() => (ascending = !ascending)}
				onkeydown={() => (ascending = !ascending)}>
		{#if ascending}
			
				LATEST ↑
		{:else}
        LATEST ↓
		{/if}
</div>

	<div class="tags">
		{#each tags as tag}
			<span
				class="tag"
				role="button"
                class:selected={selectedTag === tag}
				tabindex="0"
				onclick={() =>
					selectedTag = tag}
                onkeydown={() =>
					selectedTag = tag}
			>
				{tag}
			</span>
		{/each}
	</div>
</div>

{#if displayItems?.length === 0}
	<p>No items found.</p>
{/if}


{#each displayItems as item, i (item.date, i)}
{#if !shuffleing}
	<Item {item} {i} />
{/if}
{/each}

<style>



    .sort-toggle {
		font-size: 14px;
		font-weight: 800;
		margin-bottom: 10px;
        margin: 0;
        width: var(--date-width);
        margin-right: 20px;
        	cursor: pointer;
       
	}

    .tags {
        display: flex;
        flex-wrap: wrap;
           width: calc(100% - var(--date-width));
    }

	/* .sort-toggle span {
		cursor: pointer;
		font-size: 16px;
		font-weight: 600; 
	} */

	.tag {
        white-space: nowrap;
		padding: 5px 10px;
		color: var(--fg-color);
		background-color: var(--bg-color);
		border-radius: 20px;
		margin-right: 5px;
		cursor: pointer;
		font-size: 12px;
		transition: background-color 0.3s ease;
		border: 1px solid var(--fg-color);
        transition: background-color 0.3s ease, color 0.3s ease;
	}

	.control-panel {
		display: flex;
		margin-bottom: 20px;
		align-items: flex-end;
        width: 100%;
	}

    .selected {
        background-color: var(--fg-color);
        color: var(--bg-color);
    }

    .tag:hover {
        background-color: var(--fg-color);
        color: var(--bg-color);
    }


      @media (max-width: 600px) {
        .control-panel {
            flex-direction: column;
            align-items: flex-start;
        }
       .tags {
        width: 100%;
       }
       h4 {
        width: 100%;
       }
       .tag {
        margin-top: 10px;
       }
    }
</style>
