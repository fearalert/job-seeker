import { NextResponse } from 'next/server';

const cosineSimilarity = (vecA: number[], vecB: number[]): number => {
  const dotProduct = vecA.reduce((sum, val, idx) => sum + val * vecB[idx], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val ** 2, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val ** 2, 0));
  return dotProduct / (magnitudeA * magnitudeB);
};

export async function POST(req: Request) {
  const { jobDescription, resume } = await req.json();

  if (!jobDescription || !resume) {
    return NextResponse.json({ error: 'Both fields are required' }, { status: 400 });
  }

  const processText = (text: string) =>
    text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);

  const jdTokens = processText(jobDescription);
  const resumeTokens = processText(resume);

  const allTokens = Array.from(new Set([...jdTokens, ...resumeTokens]));
  const jdVector = allTokens.map((token) => jdTokens.filter((t) => t === token).length);
  const resumeVector = allTokens.map((token) => resumeTokens.filter((t) => t === token).length);

  const score = cosineSimilarity(jdVector, resumeVector) * 100;

  const missingKeywords = jdTokens.filter((token) => !resumeTokens.includes(token));
  const recommendations = missingKeywords.map(
    (keyword) => `Consider including the keyword "${keyword}" in your resume.`
  );

  return NextResponse.json({
    score: score.toFixed(2),
    recommendations,
  });
}
