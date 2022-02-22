import {Mask} from "../models/App";

export const ConvertPXToVW = (px: number): number => {
	return px * (100 / 375);
};

export const IsUndefined = (obj: any): boolean => {
    return typeof obj === 'undefined'
}

export const FormatNumber = (text: string): string => {
	let pattern = '+7 123 456-78-90', arr = text.match(/\d/g), i = 0;
	if (arr === null || !arr) return text;

	text = pattern.replace(/\d/g, (a: string, b: number): string => {
		if (arr?.length) i = b + 1;
		return String(arr?.shift());
	}).substring(0, i);
	return text.substring(0, 1) + '7' + text.substring(1 + 1) || '';
};

export const MakeMask = (url: string, mask: Mask) : string => {
    if (!mask) {
        return url;
    }
    switch (mask) {
        case Mask.At: {
            return "@" + url;
        }
        case Mask.PhoneNumber: {
            return FormatNumber(url);
        }
        case Mask.Link: {
            return url;
        }
        case Mask.Email: {
            return url;
        }
        default: {
            return url;
        }
    }
}

export const DeclOfNum = (number: number, words: string[]) => {
    return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];
}

export const ToBase64 = (file:File):Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result?.toString() || '');
        reader.onerror = error => reject(error);
    })
}

export const ToBase64FromUrl = async (url: string): Promise<string> => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => resolve(reader.result?.toString() || '');
    reader.onerror = error => reject(error);
  });
}