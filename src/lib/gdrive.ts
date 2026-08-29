/**
 * Mengubah URL berbagi Google Drive menjadi URL gambar langsung (direct embeddable image)
 * Mendukung format:
 * - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * - https://drive.google.com/open?id=FILE_ID
 * - https://drive.google.com/uc?id=FILE_ID
 * - https://lh3.googleusercontent.com/d/FILE_ID
 * - URL gambar langsung (https://...jpg/png/webp)
 */
export function formatGoogleDriveImageUrl(url: string | null | undefined): string {
  if (!url) return '';
  const trimmed = url.trim();
  
  // 1. Format: drive.google.com/file/d/{ID}/...
  const fileDMatch = trimmed.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileDMatch && fileDMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${fileDMatch[1]}`;
  }

  // 2. Format: drive.google.com/open?id={ID} atau drive.google.com/uc?id={ID}
  const idParamMatch = trimmed.match(/drive\.google\.com\/(?:open|uc)\?(?:[^\s&]*&)?id=([a-zA-Z0-9_-]+)/);
  if (idParamMatch && idParamMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${idParamMatch[1]}`;
  }

  // 3. Jika sudah direct link atau URL lain
  return trimmed;
}
