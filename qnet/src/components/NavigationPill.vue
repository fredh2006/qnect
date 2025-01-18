<template>
    <div :class="['navigation-pill', state]">
      <span>{{ label }}</span>
    </div>
  </template>
  
  <script>
  export default {
    name: "NavigationPill",
    props: {
      label: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        default: "default",
      },
    },
  };
  </script>
  
  <style scoped>
  .navigation-pill {
    padding: 8px 16px;
    border-radius: 16px;
    background-color: #ddd;
    color: #333;
    text-align: center;
  }
  </style>
  