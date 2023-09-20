import { compress as compressJSON, decompress as decompressJSON } from '@directus/utils';

export async function compress(raw: Record<string, any> | Record<string, any>[]): Promise<Buffer> {
	if (!raw) return raw;
	return await Buffer.from(compressJSON(raw), 'utf-8');
}

export async function decompress(compressed: Buffer): Promise<any> {
	if (!compressed) return compressed;
	return decompressJSON(compressed.toString(), { asBuffer: false });
}
