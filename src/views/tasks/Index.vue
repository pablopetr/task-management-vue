<script setup lang="ts">
import { useStore } from 'vuex';
import { onMounted, ref } from 'vue';

const store = useStore();
const tasks = ref(null);

onMounted(async () => {
  try {
    await store.dispatch('tasks/index'); // Ensure the namespace is 'tasks'
  } catch (err) {
    console.error('Failed to fetch tasks:', err);
  } finally {
    tasks.value = store.state.tasks.tasks;

    console.log(tasks);
  }
});
</script>

<template>
  <div>
    <h1 class="font-bold text-2xl">Tasks</h1>
    <div>
      <router-link to="/tasks/create">Create Task</router-link>
    </div>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.id">
          <td>{{ task.title }}</td>
          <td>{{ task.description }}</td>
          <td>
            <router-link :to="{ name: 'tasks.edit', params: { id: task.id } }">Edit</router-link>
            <button @click="deleteTask(task.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
</style>
