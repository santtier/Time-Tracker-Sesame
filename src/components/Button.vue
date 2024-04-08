<template>
  <button
    :disabled="disabled"
    :class="{ 'bg-green-400': !isClockedIn, 'bg-red-500': isClockedIn, 'button-disabled': disabled  }"
    class="w-32 h-8 text-white text-xs font-bold py-1 px-4 rounded-xl hover:shadow-md"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: {
      type: String,
      required: true,
    },
    isClockedIn: {
      type: Boolean,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    }
  },
};
</script>

<style scoped>
.button-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  --tw-bg-opacity: 1;
  background-color: rgba(209, 213, 219, var(--tw-bg-opacity));
}

</style>