import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function getNiches() {
  const result = await pool.query('SELECT * FROM niches WHERE status = $1 ORDER BY created_at DESC', ['active']);
  return result.rows;
}

export async function getNicheById(id: string) {
  const result = await pool.query('SELECT * FROM niches WHERE id = $1', [id]);
  return result.rows[0];
}

export async function getLocations() {
  const result = await pool.query('SELECT * FROM locations WHERE status = $1 ORDER BY name ASC', ['active']);
  return result.rows;
}

export async function createGenerationBatch(data: any) {
  const { batch_id, niche_id, mode, parameters } = data;
  const result = await pool.query(
    `INSERT INTO generation_batches (batch_id, niche_id, mode, status, parameters, logs)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [batch_id, niche_id, mode, 'pending', JSON.stringify(parameters), JSON.stringify([])]
  );
  return result.rows[0];
}

export async function getGenerationBatch(batchId: string) {
  const result = await pool.query(
    'SELECT * FROM generation_batches WHERE batch_id = $1',
    [batchId]
  );
  return result.rows[0];
}

export async function getBatchProgress(batchId: string) {
  const batch = await getGenerationBatch(batchId);
  if (!batch) return null;
  return batch;
}

export async function getPagesByBatch(batchId: string, limit = 100, offset = 0) {
  const result = await pool.query(
    `SELECT gp.* FROM generated_pages gp
     INNER JOIN generation_batches gb ON gp.batch_id = gb.id
     WHERE gb.batch_id = $1
     ORDER BY gp.created_at DESC
     LIMIT $2 OFFSET $3`,
    [batchId, limit, offset]
  );
  return result.rows;
}
