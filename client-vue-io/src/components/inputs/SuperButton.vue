<template>
	<button class="relative">
		<svg width="334" height="71" viewBox="0 0 334 71" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g class="path_2">
				<path d="M289.195 0H44.8049L0 31V35.5L44.8049 71H289.195L334 35.5V31L289.195 0Z" fill="#D9D9D9" fill-opacity="0.01"/>
			</g>
			<g class="path_1">
				<path d="M289.195 0H44.8049L0 35.5L44.8049 71H289.195L334 35.5L289.195 0Z" fill="url(#paint0_linear_1990_4204)"/>
			</g>
			<defs>
				<linearGradient id="paint0_linear_1990_4204" x1="0" y1="0" x2="336.83" y2="53.0217" gradientUnits="userSpaceOnUse">
				<stop stop-color="#F79A08"/>
				<stop offset="1" stop-color="#E15100"/>
			</linearGradient>
			</defs>
		</svg>
	</button>
</template>

<script>
export default {
	name: 'SuperButton',
	props: {
		name: {
			type: String,
			required: true
		}
	}
}
</script>

<style scoped>

button {
	cursor: default;
	width: fit-content;
	content-visibility: visible;
}

.path_1 {
	cursor: pointer;
	border: 10px solid rgba(210, 147, 52, 0.3);
}

.path_2 {
	filter: drop-shadow(0px 4px 0px #4A2204);
}

svg {
	filter: border();
	overflow: visible;
}

#text {
	width: 100%;
	background: linear-gradient(91.92deg, #F79A08 0%, #E15100 100%);
}
</style>