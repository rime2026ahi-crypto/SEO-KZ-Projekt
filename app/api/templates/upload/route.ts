import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const niche = formData.get('niche') as string;

    if (!file || !niche) {
      return NextResponse.json(
        { error: 'File and niche are required' },
        { status: 400 }
      );
    }

    const fileContent = await file.text();

    console.log(`Template uploaded: ${file.name} for niche: ${niche}`);
    console.log(`File size: ${file.size} bytes`);

    return NextResponse.json(
      {
        message: '✅ Template uploaded successfully!',
        template: {
          name: file.name,
          niche,
          size: file.size,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Template upload error:', error);
    return NextResponse.json(
      { error: 'Template upload failed', details: String(error) },
      { status: 500 }
    );
  }
}
