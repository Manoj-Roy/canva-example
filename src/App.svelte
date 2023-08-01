<script>
	import { getContext, setContext } from "svelte";
	import { Col, Container, Row } from "sveltestrap";
	import { writable } from "svelte/store";
	import { Draw } from "./canvas/draw";
	import { Icon } from "sveltestrap";
	import { Card, CardBody } from "sveltestrap";
	import { ListGroup, ListGroupItem } from "sveltestrap";

	// let isOpen = false;
	// const toggle = () => (isOpen = !isOpen);
	export let items;
	export let elemenType = { type: "", color: "jj" };
	export let data;
	const store = writable(elemenType);
	// 	setContext("key", elemenType);
	// let getKey = getContext("key");
	function elementAdd(elmType) {
		// elemenType = elmType;
		store.update((oldValues) => (oldValues = elmType));
		// console.log(getKey);
	}
	store.subscribe((value) => {
		data = value;
		// setContext("key", data);
	});
</script>

<main class="pt-0">
	<header class="mb-3">
		<ul class="list-group">
			<li class="list-group-item d-flex justify-content-center">
				<Icon name="palette-fill" /> Draw Your Own
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
				<div class="p-2 bd-highlight">Flex item</div>
				<div class="p-2 bd-highlight" />
				<div class="p-2 bd-highlight">Flex item</div>
			</li>
		</ul>
	</footer>
</main>

<style>
	:root {
		--node-size-width: 50px;
		--node-size-height: 50px;
	}
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
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
