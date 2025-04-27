import { FontSize } from '@/src/types/FontSize'
import { FontsType } from '@/src/types/FontFamily'
import { Colors } from '@/src/types/colors'
export interface Theme {
	dark: boolean
	colors:Colors
	fonts: FontsType
	size: FontSize
}
