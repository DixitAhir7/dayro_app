export default function onRenderCallback(
    id,
    phase, // either "mount" (first render) or "update"
    actualDuration, // time spent rendering the committed update
    baseDuration, // estimated time to render the entire subtree without memoization
    startTime, // when React started rendering this update
    commitTime, // when React committed this update
    interactions // Set of interactions belonging to this update
) {
    console.log(`[Profiler - ${id}]`);
    console.log("Phase:", phase);
    console.log("Actual Duration:", actualDuration.toFixed(2), "ms");
    console.log("Base Duration:", baseDuration.toFixed(2), "ms");
    console.log("Start Time:", startTime.toFixed(2), "ms");
    console.log("Commit Time:", commitTime.toFixed(2), "ms");
    console.log("Interactions:", interactions);
};