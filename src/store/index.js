import { defineStore } from 'pinia'
import api from '../api';

export const useTimeTrackerStore = defineStore('timeTracker', {
  state: () => ({
    isClockedIn: false,
    timeWorked: 0,
    employeeId: "",
    coordinates: {}
  }),
  actions: {
    async clockIn() {
      const workEntry = await api.post('/work-entries/clock-in', {
        employeeId: this.employeeId,
        workEntryIn: {
          coordinates: this.coordinates
        }
      })

      const workEntryData = await workEntry.data.data

      this.timeWorked = workEntryData.workedSeconds
      this.isClockedIn = true
      clearInterval(this.interval)
      this.interval = setInterval(() => {
        this.timeWorked++
      }, 1000);
    },
    async clockOut() {
      const workEntry = await api.post("/work-entries/clock-out", {
        employeeId: this.employeeId,
        workEntryOut: {
          coordinates: this.coordinates
        },
      });

      const workEntryData = workEntry.data.data
      clearInterval(this.interval)
      this.isClockedIn = false
      this.timeWorked = workEntryData.workedSeconds
    },
    async getWorkEntries() {
      try {
        const response = await api.get('/work-entries');

        const workEntriesData = response.data.data
        const lastWorkEntry = workEntriesData[workEntriesData.length - 1]
        const employeeData = lastWorkEntry.employee
        
        this.employeeId = employeeData.id
        this.coordinates = lastWorkEntry.workEntryIn.coordinates.latitude ? lastWorkEntry.workEntryIn.coordinates : lastWorkEntry.workEntryOut.coordinates
        
        if (lastWorkEntry) {
          if (employeeData.workStatus === 'online') {
            this.isClockedIn = true
            this.timeWorked =  Math.floor((Date.now() - new Date(lastWorkEntry.workEntryIn.date).getTime()) / 1000);
            clearInterval(this.interval)
            this.interval = setInterval(() => {
              this.timeWorked++
            }, 1000);
          } else {
            this.isClockedIn = false
            this.timeWorked = lastWorkEntry.workedSeconds
          }
        }
      } catch {
        console.error("Error getting work entries:");
      }
    }
  }
})