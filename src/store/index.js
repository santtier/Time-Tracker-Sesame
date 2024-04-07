import { defineStore } from 'pinia'
import api from '@/axios/api';
import { startTimeWorkedInterval, stopTimeWorkedInterval } from '@/helpers/helpers'

export const useTimeTrackerStore = defineStore('timeTracker', {
  state: () => ({
    isClockedIn: false,
    timeWorked: 0,
    employee: {},
    coordinates: {},
    interval: null
  }),
  actions: {
    async clockIn() {
      await api.post('/work-entries/clock-in', {
        employeeId: this.employee.id,
        workEntryIn: {
          coordinates: this.coordinates
        }
      })

      this.timeWorked = 0
      this.isClockedIn = true
      startTimeWorkedInterval(this)
    },
    async clockOut() {
      const workEntry = await api.post("/work-entries/clock-out", {
        employeeId: this.employee.id,
        workEntryOut: {
          coordinates: this.coordinates
        },
      });

      this.isClockedIn = false
      this.timeWorked = workEntry.data.data.workedSeconds
      stopTimeWorkedInterval(this)
    },
    async getWorkEntries() {
      try {
        const response = await api.get('/work-entries');
        const mostRecentWorkEntryData = response.data.data[0]
        const employeeData = mostRecentWorkEntryData.employee
        
        this.employee = {
          id: employeeData.id,
          name: `${employeeData.firstName} ${employeeData.lastName}`
        }
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