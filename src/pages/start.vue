<template>
  <div>
    <input type="text" placeholder="Digite o código" v-model="code">
    <button @click="enter">Entrar</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      code: '',
    };
  },

  methods: {
    enter() {

    },
  },
};
</script>
