export default {
  beforeMount(el, binding) {
     el.clickOutsideEvent = function(event) {
       if (!el.contains(event.target)) {
         binding.value();
       }
     };
     document.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el) {
     document.removeEventListener('click', el.clickOutsideEvent);
  }
 };