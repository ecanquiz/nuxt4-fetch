<script setup>
// https://nuxt.com/docs/4.x/getting-started/data-fetching
const config = useRuntimeConfig();

const { data, error, execute, status } = await useFetch( () => `${config.public.intApiBase}/hello`, {
  immediate: false
});

const { data: intData } = await useFetch(
  () => `${config.public.intApiBase}/hello`
    //, {
    //  lazy: false,    /* It's not necessary because by default it's false */
    //  server: true,   /* It's not necessary because by default it's true */
    //}
);

const { data: post, pending: postPending, error: postError } = await useFetch(`${config.public.extApiBase}/posts/1`, {
  lazy: false,
  server: false,
  pick: [ // Only bring specific fields
    // 'userId',
    'id',
    'title',
    // 'body'
  ],  
});

const { data: posts, pending: postsPending, error: postsError } = await useFetch(`${config.public.extApiBase}/posts`, {
  lazy: true,       // Load after mounting the component
  server: false,    // Only runs on client 
  transform: (posts) => {
    return posts.map(post => ({
      // userId: post.userId,
      id: post.id,
      title: post.title,
      // body: post.body
    }))
  }
});
</script>

<template>

  <div v-if="status === 'idle'">
    <button @click="execute">Get data</button>
  </div>
  <div v-else-if="status === 'pending'">
    Loading greeting...
  </div>
  <div v-else>
    {{ data }}
  </div>

  <div>{{ intData.message  }}</div> <!-- v-if="intData" It is not necessary because it renders on the server -->

  <div v-if="postPending">Cargando Post...</div>
  <div v-else-if="postError">{{ postError.message }}</div>
  <div v-else-if="post">{{ post.title }}</div> <!-- v-if="post" It is not necessary because it renders on the server -->

  <div v-if="postsPending">Cargando Posts...</div>
  <div v-else-if="postsError">{{ postsError.message }}</div>
  <ul v-else-if="posts">
    <li v-for="p in posts" :key="p.id">{{ p.title }}</li>
  </ul>
</template>
