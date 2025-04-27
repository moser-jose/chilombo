export type FontWeightType =
	| 'normal'
	| 'bold'
	| '100'
	| '200'
	| '300'
	| '400'
	| '500'
	| '600'
	| '700'
	| '800'
	| '900'

export type FontStyle = {
	fontFamily: string
	fontWeight: FontWeightType
}

export type FontVariant = 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'heavy'

export type FontsType = Record<FontVariant, FontStyle>
