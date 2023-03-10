import { SaveAsEnum } from '@/utils/types';

export const readFile = (file: Blob, asText = true): Promise<string | ArrayBuffer | null> => {
  const reader = new FileReader();

  if (asText && file.type?.includes('text')) {
    reader.readAsText(file);
  } else {
    reader.readAsDataURL(file);
  }

  return new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = () => {
      reject(new Error('An error occurred while trying to read the file'));
    };
  });
};

const downloadHelper = (name: string, data: BlobPart | BlobPart[], options?: BlobPropertyBag) => {
  const link = document.createElement('a');
  link.download = name;

  const updatedData = Array.isArray(data) ? data : [data];

  const blob = new Blob(updatedData, options);

  link.href = URL.createObjectURL(blob);

  link.click();

  URL.revokeObjectURL(link.href);

  link.remove();
};

export const download = (data: string, name: string, saveAs: SaveAsEnum) => {
  const actions = {
    [SaveAsEnum.TEXT]: async () => {
      downloadHelper(name, data);
    },
    [SaveAsEnum.FILE]: async () => {
      if (!data.startsWith('data:')) {
        downloadHelper(name, data);
        return;
      }

      const extension = data.split(',')[0].split('/')[1].split(';')[0];
      const nameWithExtension = `${name}.${extension}`;

      const res = await fetch(data);
      const blob = await res.blob();

      downloadHelper(nameWithExtension, blob);
    },
  };

  actions[saveAs]().catch(console.error);
};
