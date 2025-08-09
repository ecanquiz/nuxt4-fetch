<script setup>
const config = useRuntimeConfig();

const { data: intData } = await useFetch(
  () => `${config.public.intApiBase}/hello`
);

const { data: posts, pending, error } = await useFetch(`${config.public.extApiBase}/posts`, {
  lazy: true,       // Carga después de montar el componente
  server: false,    // Solo ejecuta en cliente
  //pick: ['userId', 'id', 'title', 'body'],  // Solo trae campos específicos
});
</script>

<template>
  <div>{{ intData.message  }}</div>
  <div v-if="pending">Cargando...</div>
  <div v-else-if="error">{{ error.message }}</div>
  <ul v-else>
    <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
  </ul>

</template>

