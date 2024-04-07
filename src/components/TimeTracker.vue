<template>
   <div class="bg-white rounded shadow flex">
    <div class="flex items-center px-4">
      <div class="flex flex-none min-w-52 border-r mr-3 border-neutral-200 pr-3 items-center">
        <h3 class="text-sm font-medium px-2">{{ formattedTimeWorked }}</h3>
        <div class="w-full">
          <Button :text="buttonText" @click="onButtonClick" :isClockedIn="isClockedIn" />
        </div>
      </div>
      <div class="relative">
        <div class="dropdown-container py-4 w-full h-full flex items-center">
          <img class="h-10" src="@/assets/batman-avatar.webp" alt="avatar">
          <p class="truncate ml-2 font-semibold">{{ employee.name }}</p>
          <span class="inline-block ml-3 svg-icon"><svg class="w-full h-full stroke-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000"></path> </g></svg></span>
        </div>
        <ul class="bg-white w-auto rounded-xl min-w-64 dropdown shadow rounded-t-none py-3">
          <li class="flex cursor-pointer px-4 py-3 mb-2 text-sm items-center justify-between relative accounts hover:bg-gray-100">
            <span class="flex-none svg-icon"><svg viewBox="0 0 1024 1024" class="icon stroke-current" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z" fill="#000000"></path></g></svg></span>
            <p class="hover:text-blue-400 flex-1 text-center mr-2">
              <a href="#">Mis Cuentas</a>
            </p>
            <ul class="absolute w-auto shadow bg-white px-3 py-3 rounded-xl rounded-r-none dropdown-second-level">
              <li class="px-2 py-2">
                <div class="flex w-auto rounded-xl max-w-max items-center">
                  <div class="mr-2 h-12 w-12 flex items-center">
                    <img class="h-10 w-10" src="@/assets/batman-avatar.webp" alt="avatar">
                  </div>
                  <div class="flex flex-col">
                    <div class="truncate text-sm">
                      <span class="mr-1 font-bold">Sesame1</span>
                      <p class="inline-block">{{ employee.name }}</p>
                    </div>
                    <span class="text-xs text-gray-400">Hoy llevas 00:00</span>
                  </div>
                </div>
              </li>
              <li class="px-2">
                <div class="flex w-auto rounded-xl max-w-max items-center">
                  <div class="mr-2 h-12 w-12 flex items-center">
                    <img class="h-10 w-10" src="@/assets/batman-avatar.webp" alt="avatar">
                  </div>
                  <div class="flex flex-col">
                    <div class="truncate text-sm">
                      <span class="mr-1 font-bold">Sesame2</span>
                      <p class="inline-block">{{ employee.name }}</p>
                    </div>
                    <span class="text-xs text-gray-400">Hoy llevas 00:00</span>
                  </div>
                </div>
              </li>
            </ul>
          </li>
          <li class="flex cursor-pointer px-4 py-3 mb-2 text-sm justify-center hover:text-blue-400 hover:bg-gray-100"><a href="#">Vista Empleado</a></li>
          <li class="flex cursor-pointer px-4 py-3 mb-2 text-sm justify-center hover:text-blue-400 hover:bg-gray-100"><a href="#">Mi perfil</a></li>
          <li class="flex cursor-pointer px-4 py-3 text-sm justify-center text-red-400 hover:bg-gray-100">Cerrar Sesión</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import { mapActions, mapState } from "pinia";
import { useTimeTrackerStore } from '@/store'
import { formatTime } from "@/helpers/helpers";

export default {
  name: "TimeTracker",
  components: {
    Button,
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
    };
  },
  methods: {
    ...mapActions(useTimeTrackerStore, ['getWorkEntries', 'clockIn', 'clockOut']),
    onButtonClick() {
      this.isClockedIn ? this.clockOut() : this.clockIn()
    }
  },
  mounted() {
    this.getWorkEntries()
  }
}
</script>

<style scoped>
.dropdown {
  position: absolute;
  right: 8px;
  display: none;
  z-index: 50;
}

.dropdown-second-level {
  top: -12px;
  right: 256px;
  display: none;
}

.svg-icon {
  height: 16px;
  width: 16px;
  min-height: 16px;
  max-height: 16px;
}

.dropdown-container:hover + .dropdown {
 display: block;
}

.dropdown:hover {
  display: block;
}

.accounts:hover .dropdown-second-level {
  display: block;
}

</style>
