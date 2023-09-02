<template>
  env測試
  <button class="btn btn-primary" @click="fetchTodo">test API</button>
  <div>
    {{ todo }}
  </div>
</template>

<script setup>
import { getTodoApi } from '@/apis/todo/todo'
import { ref } from 'vue'

const todo = ref('點擊測試api')
console.log(import.meta.env.VITE_SOME_KEY) // 123
console.log(import.meta.env.DB_PASSWORD) // undefined
const fetchTodo = async () => {
  try {
    let res = await getTodoApi()
    console.log(res)
    if (res.status === 200) {
      todo.value = res.data
    }
  } catch (error) {}
}
</script>

<style lang="scss"></style>
