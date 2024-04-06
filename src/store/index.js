import { defineStore } from 'pinia'
import api from '../api';

export const useTimeTrackerStore = defineStore('timeTracker', {
  state: () => ({
    isClockedIn: false,
    timeWorked: 0,
    employeeId: "12345",
  }),
  actions: {
    async getWorkEntries() {
      try {
        const response = await api.get('/work-entries');

        console.log(response)
      } catch {
        
      }
    }
  }
})