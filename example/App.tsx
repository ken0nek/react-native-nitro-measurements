import React from 'react'
import { useColorScheme } from 'react-native'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { ConvertScreen } from './src/screens/ConvertScreen'
import { ArithmeticScreen } from './src/screens/ArithmeticScreen'
import { DimensionalScreen } from './src/screens/DimensionalScreen'
import { BenchmarkScreen } from './src/screens/BenchmarkScreen'
import { lightTheme, darkTheme } from './src/theme'

const Tab = createBottomTabNavigator()

const LightNavTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: lightTheme.background,
    card: lightTheme.surface,
    text: lightTheme.text,
    border: lightTheme.border,
    primary: lightTheme.primary,
  },
}

const DarkNavTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: darkTheme.background,
    card: darkTheme.surface,
    text: darkTheme.text,
    border: darkTheme.border,
    primary: darkTheme.primary,
  },
}

export default function App() {
  const scheme = useColorScheme()
  const isDark = scheme === 'dark'

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={isDark ? DarkNavTheme : LightNavTheme}>
        <Tab.Navigator
          screenOptions={{
            headerTitleStyle: { fontWeight: '600' },
          }}
        >
          <Tab.Screen
            name="Convert"
            component={ConvertScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="swap-horizontal" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Arithmetic"
            component={ArithmeticScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="calculator" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Dimensional"
            component={DimensionalScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="cube" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Benchmark"
            component={BenchmarkScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="speedometer" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
