import newman from "newman"; // require Newman in your project
import collection from "./sample-collection.json";

// call newman.run to pass `options` object and wait for callback
newman.run(
  {
    collection,
    reporters: ["cli", { myreporter: { "option-name": "option-value" } }],
  },
  (err) => {
    if (err) {
      throw err;
    }
    console.error("collection run complete!");
  }
);

function CustomReporter(emitter, reporterOptions, collectionRunOptions) {
  console.log({ emitter, reporterOptions, collectionRunOptions });
}



export default CustomReporter;
