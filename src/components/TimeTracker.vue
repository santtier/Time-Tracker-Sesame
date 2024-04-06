<template>
   <div class="bg-white p-4 rounded shadow">
    <h2 class="text-xl font-semibold mb-4">Time Tracker</h2>
    <div class="flex justify-between">
      <div>
        <p class="text-gray-700 mb-2">Tiempo trabajado:</p>
        <h3 class="text-2xl font-bold">{{ formattedTimeWorked }}</h3>
      </div>
      <div>
        <Button :text="buttonText" @click="onButtonClick" />
      </div>
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue";
import { mapActions, mapState } from "pinia";
import { useTimeTrackerStore } from '../store'
import { formatTime } from "../helpers/helpers";

export default {
  name: "TimeTracker",
  components: {
    Button,
  },
  computed: {
    ...mapState(useTimeTrackerStore, ['isClockedIn', 'timeWorked']),
    formattedTimeWorked() {
      return formatTime(this.timeWorked);
    },
    buttonText() {
      return this.isClockedIn ? 'Salir' : 'Entrar'
    }
  },
  data() {
    return {
    };
  },
  methods: {
    ...mapActions(useTimeTrackerStore, ['getWorkEntries', 'clockIn', 'clockOut']),
    onButtonClick() {
      if (this.isClockedIn) {
        this.clockOut()
        this.buttonText = 'Entrar'
      } else {
        this.clockIn()
        this.buttonText = 'Salir'
      }
    }
  },
  mounted() {
    this.getWorkEntries()
  }
}
</script>

<style>

</style>
