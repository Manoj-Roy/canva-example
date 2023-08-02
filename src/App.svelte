<script>
	import { getContext, setContext } from "svelte";
	import {
		Col,
		Container,
		Row,
		Badge,
		Icon,
		Card,
		CardBody,
		ListGroup,
		ListGroupItem,
		Tooltip
	} from "sveltestrap";
	import { writable } from "svelte/store";
	import { Draw } from "./canvas/draw";

	// let isOpen = false;
	// const toggle = () => (isOpen = !isOpen);
	export let items;
	export let elemenType = { type: "", color: "", counterType: "" };
	export let data;
	export let counter;
	const store = writable(elemenType);
	// setContext("counter", counter);
	// let getKey = getContext("key");
	function elementAdd(elmType) {
		elemenType = elmType;
		store.update((oldValues) => (oldValues = elmType));
		console.log(counter);
	}
	store.subscribe((value) => {
		data = value;
		// console.log(value);
		// // setContext("key", data);
	});
</script>

<main class="pt-0">
	<header class="mb-3">
		<ul class="list-group">
			<li class="list-group-item d-flex justify-content-center">
				<Icon name="palette-fill" style="margin-right:3px" /> Draw Your Own
			</li>
		</ul>
	</header>

	<!-- <Container> -->
	<section class="d-flex mb-5">
		<Card>
			<CardBody>
				<ListGroup>
					{#each items as item, i}
						<ListGroupItem>
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<div
								class={item.type}
								style={"background-color:" + item.color}
								on:click={elementAdd(item)}
							/>
						</ListGroupItem>
					{/each}
				</ListGroup>
			</CardBody>
		</Card>
		<Card>
			<CardBody>
				<div>
					{#if data}<Draw propValue={store} />{/if}
				</div>
			</CardBody>
		</Card>
	</section>
	<footer class="mt-3 fixed-bottom">
		<ul class="list-group">
			<li
				class="list-group-item d-flex justify-content-around bd-highlight"
			>
				<div class="p-2 bd-highlight d-flex">
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<h4 id="undo"
						on:click={() =>
							store.update(
								(oldValues) =>
									(oldValues = { counterType: "undo" })
							)}
					>
						<Badge pill secondary style="cursor:pointer"
							><Icon name="arrow-counterclockwise" /></Badge
						>
					</h4>
					<Tooltip target="undo" top>Undo</Tooltip>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<h4 id="redo"
						on:click={() =>
							store.update(
								(oldValues) =>
									(oldValues = { counterType: "redo" })
							)}
					>
						<Badge pill secondary style="cursor:pointer"
							><Icon name="arrow-clockwise" /></Badge
						>
					</h4>
					<Tooltip target="redo" top>Redo</Tooltip>

				</div>
				<div class="p-2 bd-highlight" />
				<div class="p-2 bd-highlight">
					<label for="customRange3" class="form-label"
						>Page Size</label
					>
					<input
						type="range"
						class="form-range"
						min="0"
						max="5"
						step="0.5"
						style="border: none;"
						id="customRange3"
					/>
				</div>
			</li>
		</ul>
	</footer>
</main>

<style>
	:root {
		--node-size-width: 60px;
		--node-size-height: 60px;
	}
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	
	.rect {
		width: var(--node-size-width);
		height: var(--node-size-height);
	}
	.circle {
		width: var(--node-size-width);
		height: var(--node-size-height);
		border-radius: 50%;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
