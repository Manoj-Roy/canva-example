import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		items: [{ color: 'red', type: 'rect' }, { color: 'green', type: 'circle' }]
	}
});

export default app;