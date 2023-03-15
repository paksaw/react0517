import "styled-components";

declare module "styled-components" {
	export interface DefaultTheme {
		bgColor: string;
		textColor: string;
		accentColor: string;
		accentFadedColor: string;
		cardColor: string;
		activeCardColor: string;
		buttonColor: string;
		hoverButtonColor: string;
	}
}