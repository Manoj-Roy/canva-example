<script>
    import { onMount } from "svelte";
    import { setContext, getContext } from "svelte";
    import { writable } from "svelte/store";

    export let propValue;
    let counter = -1;
    let max = 0;
    // let setData;
    // let getCounter = getContext('counter');

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
    function undo(params, canvas) {
        // console.log(params);
        let min = 0;        
        max--
        max >= min ? (canvas.item(max).visible = false) : (max = 0);
        canvas.renderAll();
    }
    function redo(params, canvas) {
        // console.log(params);
        let min = 0;
        max++;
        (max <= counter) ? (canvas.item(max-1).visible = true) : (max = counter);
        canvas.renderAll();
    }
    function drawMD(canvas) {
        propValue.subscribe((value) => {
            console.log(value);
            if(!value.counterType || value.counterType === '')  {
                counter++
                max = counter;
            } else {
                value.counterType === 'redo' ? redo(value, canvas) : undo(value, canvas);
            }

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
                
                console.log(counter);
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
