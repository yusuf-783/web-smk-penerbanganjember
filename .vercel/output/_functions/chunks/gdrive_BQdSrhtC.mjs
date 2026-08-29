//#region src/lib/gdrive.ts
/**
* Mengubah URL berbagi Google Drive menjadi URL gambar langsung (direct embeddable image)
* Mendukung format:
* - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
* - https://drive.google.com/open?id=FILE_ID
* - https://drive.google.com/uc?id=FILE_ID
* - https://lh3.googleusercontent.com/d/FILE_ID
* - URL gambar langsung (https://...jpg/png/webp)
*/
function formatGoogleDriveImageUrl(url) {
	if (!url) return "";
	const trimmed = url.trim();
	const fileDMatch = trimmed.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
	if (fileDMatch && fileDMatch[1]) return `https://lh3.googleusercontent.com/d/${fileDMatch[1]}`;
	const idParamMatch = trimmed.match(/drive\.google\.com\/(?:open|uc)\?(?:[^\s&]*&)?id=([a-zA-Z0-9_-]+)/);
	if (idParamMatch && idParamMatch[1]) return `https://lh3.googleusercontent.com/d/${idParamMatch[1]}`;
	return trimmed;
}
//#endregion
export { formatGoogleDriveImageUrl as t };
