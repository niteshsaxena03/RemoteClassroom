import { getUploadAuthParams } from "@imagekit/next/server";

export async function GET() {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

  if (!privateKey || !publicKey) {
    return Response.json(
      { error: "ImageKit credentials are not configured" },
      { status: 500 }
    );
  }

  try {
    const imagekitAuthParams = getUploadAuthParams({ privateKey, publicKey });
    return Response.json({ imagekitAuthParams, publickey: publicKey });
  } catch (error) {
    return Response.json(
      { error: `Error in imagekit: ${error}` },
      { status: 500 }
    );
  }
}
