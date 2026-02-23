export interface Theme {
  background: string
  surface: string
  text: string
  textSecondary: string
  primary: string
  border: string
  error: string
  inputBackground: string
}

export const lightTheme: Theme = {
  background: '#F2F2F7',
  surface: '#FFFFFF',
  text: '#000000',
  textSecondary: '#6B7280',
  primary: '#007AFF',
  border: '#D1D5DB',
  error: '#FF3B30',
  inputBackground: '#F9FAFB',
}

export const darkTheme: Theme = {
  background: '#000000',
  surface: '#1C1C1E',
  text: '#FFFFFF',
  textSecondary: '#9CA3AF',
  primary: '#0A84FF',
  border: '#38383A',
  error: '#FF453A',
  inputBackground: '#2C2C2E',
}
