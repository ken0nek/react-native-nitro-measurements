import { useColorScheme } from 'react-native'
import { lightTheme, darkTheme, type Theme } from '../theme'

export function useTheme(): Theme {
  const scheme = useColorScheme()
  return scheme === 'dark' ? darkTheme : lightTheme
}
