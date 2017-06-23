<template>
  <button class="button" :class="{ 'loading': loading }">
    <span v-if="!loading">
      <span v-if="icon" :class="`fa fa-${icon}`" style="margin-right:7px;"></span>
      {{ text }}
    </span>
    <span v-else class="fa fa-refresh"></span>
  </button>
</template>
<script>
  export default {
    props: {
      /**
       * Text to render inside the button.
       * @type {Object}
       */
      text: {
        type: String,
      },

      /**
       * If button is loading.
       */
      loading: {
        type: Boolean,
        default: false,
      },

      icon: {
        type: String,
      },
    },
  };
</script>
