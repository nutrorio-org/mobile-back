import { ref, uploadBytesResumable } from 'firebase/storage';
import { getStorage } from 'firebase/storage';
import { app } from './config';
import { NODE_ENV } from '../../schema/enviroments.schema';

export async function uploadImage(file: Blob | Uint8Array | ArrayBuffer | any) {
  const storage = getStorage(app);
  const fileName = new Date().getTime();
  const folder = NODE_ENV != 'LOCAL' ? 'mobile/prod' : 'mobile/test';
  const imagesRef = ref(storage, `${folder + '/'}${fileName}.png`);
  const uploadTask = uploadBytesResumable(imagesRef, file);
  const path = (await uploadTask).task.snapshot.metadata.fullPath.split('/');
  return getFullUrl(path[1], folder);
}

function getFullUrl(path: string, type: 'mobile/prod' | 'mobile/test') {
  const token = 'ee35a5a7-5a27-4c92-8142-e934138';
  return `https://firebasestorage.googleapis.com/v0/b/oficial-nutrorio.appspot.com/o/${type}%2F${path}?alt=media&token=${token}`;
}

// export async function UploadPdf(file: Blob | Uint8Array | ArrayBuffer) {
// 	const storage = getStorage(app);

// 	const fileName = new Date().getTime();
// 	const imagesRef = ref(storage, `pdf/${fileName}.pdf`);
// 	const uploadTask = uploadBytesResumable(imagesRef, file);
// 	const path = (await uploadTask).task.snapshot.metadata.fullPath.split('/');
// 	return getFullUrl(path[1], 'pdf');
// }
