<template>
  <div class="mx-auto max-w-max bg-neutral-50 flex">
    <TimeTracker />
  </div>
</template>

<script>
import TimeTracker from '@/components/TimeTracker.vue';

export default {
  name: 'App',
  components: {
    TimeTracker
  }
}
</script>
