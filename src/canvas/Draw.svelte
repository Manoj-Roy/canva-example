<script>
    import { onMount } from "svelte";
    import { setContext, getContext } from "svelte";
    import { writable } from "svelte/store";

    export let propValue;
    let setData;

    onMount(() => {
        setTimeout(() => {
            let canvas = new fabric.Canvas("c");
            fabric && drawMD(canvas);
        }, 500);
    });
    function capitalized(text) {
        const word = text;
        const capitalized = word.charAt(0).toUpperCase() + word.slice(1);
        return capitalized;
    }
    function drawMD(canvas) {
        propValue.subscribe((value) => {
            let obj = {
                left: 120,
                top: 10,
                fill: value.color,
            };
            value.type === "rect" &&
                (obj = { ...obj, ...{ width: 150, height: 150 } });
            value.type === "circle" && (obj = { ...obj, ...{ radius: 30 } });
            if (value.type) {
                let rect = new fabric[capitalized(value.type)](obj);
                canvas.add(rect);
            }
        });
    }
</script>

<svelte:head>
    <script
        src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/500/fabric.min.js"
    ></script>
</svelte:head>

<div>
    <canvas
        id="c"
        width="1500"
        height="1000"
        style="border:1px solid #000000;"
        on:click={drawMD}
    />
</div>

<style>
</style>
