import createDataClient from "./createDataClient";

const isProd = true;
const dataEndpoint = isProd
  ? "https://anvaka.github.io/citation-data/1/"
  : "http://localhost:8081/";
const dataClient = createDataClient(dataEndpoint);

export default dataClient;