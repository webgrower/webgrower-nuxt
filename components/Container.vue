<template>
    <div class="container">
        <slot />
    </div>
</template>

<style scoped>
.container {
    grid-column: wide-start/wide-end;
}
</style>