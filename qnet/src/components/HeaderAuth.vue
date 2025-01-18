<template>
    <div :class="divClassName">
      <button :class="buttonClassName">Login</button>
    </div>
  </template>
  
  <script>
  export default {
    name: "HeaderAuth",
    props: {
      buttonClassName: {
        type: String,
        default: "",
      },
      buttonClassNameOverride: {
        type: String,
        default: "",
      },
      divClassName: {
        type: String,
        default: "",
      },
      state: {
        type: String,
        default: "logged-out",
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles for HeaderAuth if needed */
  </style>
  