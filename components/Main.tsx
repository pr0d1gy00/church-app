import React from 'react'
import Login from '../app/login'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { View } from 'react-native'
import Registercell from '../app/registercell'
export function Main() {
	const insets = useSafeAreaInsets()
	return (
		<View style={{paddingTop: insets.top, paddingBottom:insets.bottom}} className="w-full flex-col flex-1 items-center justify-center">
			<Login/>
		</View>
	)
}
