<template>
	<div class="flex flex-col gap-1">
		<label :for="`input-${name}`">{{ label }}</label>
		<input class="bob" type="text" :name="`input-${name}`" :id="`input-${name}`">
	</div>
</template>

<script>
export default {
	name: 'InputText',
	props: {
		label: {
			type: String,
			required: true
		},
		name: {
			type: String,
			required: true
		}
	}
}
</script>