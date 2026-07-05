import { NextRequest, NextResponse } from 'next/server';
// @ts-ignore
import { Pool } from 'pg';

async function initializeDatabase() {
  try {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      return {
        error: 'DATABASE_URL not configured',
        status: 500,
      };
    }

    const pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
    });

    const client = await pool.connect();

    const queries = [
      `CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255),
        role VARCHAR(50) DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,

      `CREATE TABLE IF NOT EXISTS niches (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        keywords JSONB DEFAULT '[]',
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,

      `CREATE TABLE IF NOT EXISTS locations (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        country VARCHAR(100) DEFAULT 'Kazakhstan',
        region VARCHAR(255),
        latitude FLOAT,
        longitude FLOAT,
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,

      `CREATE TABLE IF NOT EXISTS templates (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        niche_id UUID REFERENCES niches(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255),
        content TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,

      `CREATE TABLE IF NOT EXISTS generation_batches (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        batch_id VARCHAR(100) UNIQUE NOT NULL,
        niche_id UUID REFERENCES niches(id),
        mode VARCHAR(50) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        total_pages INT DEFAULT 0,
        completed_pages INT DEFAULT 0,
        unique_pages INT DEFAULT 0,
        duplicate_pages INT DEFAULT 0,
        error_count INT DEFAULT 0,
        started_at TIMESTAMP,
        completed_at TIMESTAMP,
        estimated_completion TIMESTAMP,
        parameters JSONB DEFAULT '{}',
        logs JSONB DEFAULT '[]',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,

      `CREATE TABLE IF NOT EXISTS generated_pages (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        batch_id UUID REFERENCES generation_batches(id) ON DELETE CASCADE,
        niche_id UUID REFERENCES niches(id),
        location_id UUID REFERENCES locations(id),
        url VARCHAR(500) UNIQUE,
        title VARCHAR(255),
        content TEXT,
        status VARCHAR(50) DEFAULT 'draft',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,

      `INSERT INTO niches (name, slug, description) VALUES
        ('Сантехнические услуги', 'santehnik', 'Услуги сантехника'),
        ('Электрические услуги', 'electrician', 'Услуги электрика'),
        ('Ремонт квартир', 'repair', 'Услуги по ремонту')
      ON CONFLICT (slug) DO NOTHING`,

      `INSERT INTO locations (name, slug, country, region) VALUES
        ('Алматы', 'almaty', 'Kazakhstan', 'Алматы'),
        ('Нур-Султан', 'nur-sultan', 'Kazakhstan', 'Акмола'),
        ('Караганда', 'karaganda', 'Kazakhstan', 'Караганда'),
        ('Шымкент', 'shymkent', 'Kazakhstan', 'Түркістан'),
        ('Актобе', 'aktobe', 'Kazakhstan', 'Западно-Казахстанская')
      ON CONFLICT (slug) DO NOTHING`,
    ];

    for (const query of queries) {
      await client.query(query);
    }

    client.release();
    await pool.end();

    return {
      message: '✅ Database initialized successfully!',
      status: 200,
    };
  } catch (error) {
    console.error('Database initialization error:', error);
    return {
      error: 'Database initialization failed',
      details: String(error),
      status: 500,
    };
  }
}

export async function GET(request: NextRequest) {
  const result = await initializeDatabase();
  return NextResponse.json(
    result.message ? { message: result.message } : { error: result.error, details: result.details },
    { status: result.status }
  );
}

export async function POST(request: NextRequest) {
  const result = await initializeDatabase();
  return NextResponse.json(
    result.message ? { message: result.message } : { error: result.error, details: result.details },
    { status: result.status }
  );
}
