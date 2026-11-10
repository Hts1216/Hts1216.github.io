import type { FontConfig, ResolvedFontOptions } from "@/types/fontConfig.ts";
import { withUserConfig } from "@/utils/config-overlay.ts";
import { resolveFontOptions as resolve } from "@/utils/font-options.ts";

// 使用访客设备的系统字体，避免首次访问下载大型中文字体。
export const fontConfig: FontConfig = withUserConfig("font", {
	mode: "system",
	fontFamilies: [],
	subsetting: {
		enable: false,
		includeContent: true,
		includeI18n: true,
		includeConfig: true,
		includeCommon: true,
		allowRemoteText: false,
	},
	budget: {
		maxTotalBytes: 6 * 1024 * 1024,
		maxFamilyBytes: 4 * 1024 * 1024,
	},
});

export const resolvedFontOptions: ResolvedFontOptions = resolve(fontConfig);
export const resolveFontOptions: (config: FontConfig) => ResolvedFontOptions = resolve;
