import { processCode } from './developerOperations';
self.onmessage = async ({data}) => {
  try { self.postMessage({ output:await processCode(data.mode, data.input) }); }
  catch (error) { self.postMessage({ error:error.message || 'Could not process this input.' }); }
};
