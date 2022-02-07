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
            case Mask.At:
            {
                return "@"+url;
            }
            case Mask.PhoneNumber:
            {
                return FormatNumber(url);
            }
            case Mask.Link:
            {
                return "@"+url;
            }
        }
    }