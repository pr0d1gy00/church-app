import React from "react";
import { TextInput } from "react-native";

interface SearchProps {
	placeholder: string;
}

export default function Search({ placeholder }: SearchProps) {
	return (
		<TextInput
			placeholder={placeholder}
			className="bg-[#ebebeb] focus:border-2 border-[#73937e] rounded-lg w-[90%] h-12 mt-2 justify-center px-4"
		/>
	);
}
