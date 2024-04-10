<template>
  <div class="bg-white rounded shadow flex">
    <div class="flex items-center px-4">
      <div class="flex flex-none min-w-52 border-r mr-3 border-neutral-200 pr-3 items-center">
        <h3 class="text-sm font-medium pr-2">{{ formattedTimeWorked }}</h3>
        <div v-if="isClockedIn" class="w-full mr-2">
          <Button :text="'Pausar'" :disabled="true" :isClockedIn="isClockedIn" />
        </div>
        <div class="w-full">
          <Button :text="buttonText" @click="onButtonClick" :isClockedIn="isClockedIn" />
        </div>
      </div>
      <div class="relative">
        <div class="py-4 w-full h-full flex items-center cursor-pointer" @click="toggleDropdown">
          <div class="relative">
            <img class="h-10" src="@/assets/batman-avatar.webp" alt="avatar">
            <div :class="{ 'bg-green-500': isClockedIn, 'bg-gray-400': !isClockedIn }" class="absolute -right-1 top-4 rounded-full h-2 w-2"></div>
          </div>
          <p class="truncate ml-2 font-semibold">{{ employee.name }}</p>
          <span class="inline-block ml-3 w-4 h-4 min-w-4 min-h-4"><svg class="w-full h-full stroke-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000"></path> </g></svg></span>
        </div>
        <DropdownMenu v-if="showDropdown">
          <ul class="bg-white w-auto rounded-xl min-w-64 absolute right-2 shadow rounded-t-none py-3">
            <li class="flex cursor-pointer px-4 py-3 mb-2 text-sm items-center justify-between relative hover:bg-gray-100" @click="toggleAccountsDropdown">
              <span class="flex-none w-4 h-4 min-w-4 min-h-4"><svg viewBox="0 0 1024 1024" class="icon stroke-current" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z" fill="#000000"></path></g></svg></span>
              <p class="hover:text-blue-400 flex-1 text-center mr-2">
                Mis Cuentas
              </p>
              <DropdownMenu v-if="showAccountsDropdown">
                <ul class="absolute w-auto shadow min-w-64 bg-white py-3 rounded-xl rounded-r-none -top-3 right-64">
                  <li class="px-4  hover:bg-gray-100" v-for="userAccount in userAccounts" :key="userAccount.account">
                    <div class="flex w-auto rounded-xl max-w-max items-center">
                      <div class="mr-2 h-12 w-12 flex items-center">
                        <img class="h-10 w-10" src="@/assets/batman-avatar.webp" alt="avatar">
                      </div>
                      <div class="flex flex-col">
                        <div class="truncate text-sm">
                          <span class="mr-1 font-bold">{{ userAccount.account }}</span>
                          <p class="inline-block">{{ employee.name }}</p>
                        </div>
                        <span class="text-xs text-left text-gray-400">{{ `Hoy llevas ${userAccount.timeWorked}`}}</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </DropdownMenu>
            </li>
            <li class="flex cursor-pointer px-4 py-3 mb-2 text-sm justify-center hover:text-blue-400 hover:bg-gray-100 close-dropdown"><a href="#">Vista Empleado</a></li>
            <li class="flex cursor-pointer px-4 py-3 mb-2 text-sm justify-center hover:text-blue-400 hover:bg-gray-100 close-dropdown"><a href="#">Mi perfil</a></li>
            <li class="flex cursor-pointer px-4 py-3 text-sm justify-center text-red-400 hover:bg-gray-100 close-dropdown">Cerrar Sesión</li>
          </ul>
        </DropdownMenu>
      </div>
    </div>
  </div>
  </template>

<script>
import Button from "@/components/Button.vue";
import DropdownMenu from "@/components/DropdownMenu.vue";
import { mapActions, mapState } from "pinia";
import { useTimeTrackerStore } from '@/store'
import { formatTime } from "@/helpers/helpers";

export default {
  name: "TimeTracker",
  components: {
    Button,
    DropdownMenu
  },
  computed: {
    ...mapState(useTimeTrackerStore, ['isClockedIn', 'timeWorked', 'employee']),
    formattedTimeWorked() {
      return formatTime(this.timeWorked);
    },
    buttonText() {
      return this.isClockedIn ? 'Salir' : 'Entrar'
    }
  },
  data() {
    return {
      userAccounts: [
        {
          account: 'Sesame1',
          timeWorked: '00:00'
        },
        {
          account: 'Sesame2',
          timeWorked: '00:00'
        }
      ],
      showDropdown: false,
      showAccountsDropdown: false
    };
  },
  methods: {
    ...mapActions(useTimeTrackerStore, ['getWorkEntries', 'clockIn', 'clockOut']),
    onButtonClick() {
      this.isClockedIn ? this.clockOut() : this.clockIn()
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
      this.showAccountsDropdown = false
    },
    toggleAccountsDropdown() {
      this.showAccountsDropdown = !this.showAccountsDropdown;
    },
    closeDropdown(e) {
      if (!this.$el.contains(e.target) ||  e.target.closest('.close-dropdown')) {
        this.showDropdown = false;
        this.showAccountsDropdown = false
      }
    }
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeDropdown);
 },
  mounted() {
    this.getWorkEntries()
    document.addEventListener('click', this.closeDropdown);
  }
}
</script>
