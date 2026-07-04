// Database queries - только для runtime, не для build time
export async function getNiches() {
  return [];
}

export async function getNicheById(id: string) {
  return null;
}

export async function getLocations() {
  return [];
}

export async function createGenerationBatch(data: any) {
  return { id: 'mock-id', ...data };
}

export async function getGenerationBatch(batchId: string) {
  return null;
}

export async function getBatchProgress(batchId: string) {
  return null;
}

export async function getPagesByBatch(batchId: string, limit = 100, offset = 0) {
  return [];
}
