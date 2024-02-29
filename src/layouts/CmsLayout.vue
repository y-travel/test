<template lang="pug">
component(:is="$route?.meta?.layout || 'div'")
	router-view
</template>
<script lang="ts">
</script>