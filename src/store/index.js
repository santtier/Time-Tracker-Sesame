import { defineStore } from 'pinia'
import api from '@/axios/api';
import { startTimeWorkedInterval, stopTimeWorkedInterval } from '@/helpers/helpers'

export const useTimeTrackerStore = defineStore('timeTracker', {
  state: () => ({
    isClockedIn: false,
    timeWorked: 0,
    employeeId: "",
    coordinates: {},
    interval: null
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

      this.timeWorked = 0
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
        const mostRecentWorkEntryData = response.data.data[0]
        const employeeData = mostRecentWorkEntryData.employee
        
        this.employeeId = employeeData.id
        this.coordinates = mostRecentWorkEntryData.workEntryIn.coordinates
        
        if (mostRecentWorkEntryData) {
          this.isClockedIn = employeeData.workStatus === 'online';
          this.timeWorked = this.isClockedIn ? Math.floor((Date.now() - new Date(mostRecentWorkEntryData.workEntryIn.date).getTime()) / 1000) : mostRecentWorkEntryData.workedSeconds;
          this.isClockedIn ? startTimeWorkedInterval(this) : stopTimeWorkedInterval(this);
        }
      } catch (error) {
        console.error("Error getting work entries:", error);
      }
    }
  }
})