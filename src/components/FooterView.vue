<template>
  <footer>
    <div v-for="item in items" :key="item.name">
      <span>{{ item.text }}</span>
      <a :href="item.url" target="_blank">{{ item.name }}</a>
    </div>
  </footer>
</template>

<script setup>
import { reactive } from 'vue'

const items = reactive([
  {
    text: 'challenge by',
    name: 'F2E 前端修練精神時光屋 第二屆',
    url: 'https://challenge.thef2e.com/'
  },
  {
    text: 'code by',
    name: 'Yilee',
    url: ''
  },
  {
    text: 'design by',
    name: 'Lauren',
    url: 'https://challenge.thef2e.com/user/2095?schedule=3863#works-3863'
  }
])
</script>

<style scoped lang="scss">
$white: #eef3f5;
$border-style: 1px solid;
footer {
  color: $white;
  background: #495156;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  gap: 1rem;

  a {
    margin-left: 0.5rem;
    color: $white !important;
    text-decoration: none;

    &:hover {
      opacity: 0.8;
    }
  }

  > div:nth-child(2) {
    border-left: $border-style;
    border-right: $border-style;
    padding: 0 1rem;
    a {
      pointer-events: none;
    }
  }
}
</style>
