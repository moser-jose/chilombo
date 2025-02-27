import { StyleSheet } from 'react-native'
import { fontSize } from '@/constants/FontSize'
import colors from '@/constants/Colors'
import { fontFamily } from '@/constants/FontFamily'

export const defaultStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  text: {
    color: colors.text,
    fontSize: fontSize.base,
  },
})

export const utilsStyles = StyleSheet.create({
  centeredRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  emptyContentImage: {
    alignSelf: 'center',
    height: 200,
    marginTop: 40,
    opacity: 0.3,
    width: 200,
  },
  emptyContentText: {
    ...defaultStyles.text,
    color: colors.textMuted,
    marginTop: 20,
    textAlign: 'center',
  },
  itemSeparator: {
    borderColor: colors.textMuted,
    borderWidth: StyleSheet.hairlineWidth,
    opacity: 0.3,
  },
  slider: {
    borderRadius: 16,
    height: 7,
  },
})

export const scrollViewHorizontal = StyleSheet.create({
  horizontal: {
    flex: 1,
  },
})
