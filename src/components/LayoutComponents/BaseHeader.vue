<template>
	<q-header elevated>
		<q-toolbar>
			<q-btn
				flat
				dense
				round
				@click="leftDrawerOpen = !leftDrawerOpen"
				aria-label="Menu"
			>
				<q-icon name="menu" />
			</q-btn>

			<q-toolbar-title>
				Quasar App
			</q-toolbar-title>

			<div>Quasar v{{ $q.version }}</div>
		</q-toolbar>
	</q-header>
</template>

<script>
export default {
	name: 'base-header',
	methods: {
	}
}
</script>

