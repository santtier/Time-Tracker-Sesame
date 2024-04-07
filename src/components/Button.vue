<template>
  <button
    :class="{ 'bg-green-500': !isClockedIn, 'bg-red-500': isClockedIn  }"
    class="w-full h-8 text-white text-sm text-font-light py-1 px-4 rounded-xl"
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
    }
  },
};
</script>