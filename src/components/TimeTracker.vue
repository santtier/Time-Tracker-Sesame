<template>
   <div class="bg-white p-4 rounded shadow">
    <h2 class="text-xl font-semibold mb-4">Time Tracker</h2>
    <div class="flex justify-between">
      <div>
        <p class="text-gray-700 mb-2">Tiempo trabajado:</p>
        <!-- <h3 class="text-2xl font-bold">{{ timeWorked }}</h3> -->
      </div>
      <div>
        <Button :text="buttonText" @click="onButtonClick" />
      </div>
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue";
import { mapActions } from "pinia";
import { useTimeTrackerStore } from '../store'

export default {
  name: "TimeTracker",
  components: {
    Button,
  },
  computed: {
  },
  data() {
    return {
      buttonText: "Entrar",
    };
  },
  methods: {
    ...mapActions(useTimeTrackerStore, ['getWorkEntries'])
  },
  mounted() {
    this.getWorkEntries()
  }
}
</script>

<style>

</style>
