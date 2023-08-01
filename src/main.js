import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		items: [{ color: 'red', type: 'rect', counterType:'' }, { color: 'green', type: 'circle' , counterType:''}]
	}
});

export default app;