<template>
  <v-snackbar
    v-for="(snackbar, index) in snackbars"
    :key="snackbar"
    :color="snackbar.color"
    :style="{'margin-bottom':calcMargin(index), 'transition-property':'all', 'transition-duration':'1s'}"
    :timeout="snackbar.timeout"
    v-model="snackbar.show"
  >
    {{ snackbar.message }}
      <template v-slot:actions>
        <v-btn variant="text" @click="snackbar.show=false">
          Close
        </v-btn>
      </template>
</v-snackbar>
</template>

<script setup>
    import
    {
        snackbars
    }
    from "@/snackbar"

    const calcMargin = (i) =>
    {
        return (i * 60) + 'px'
    }
</script>
