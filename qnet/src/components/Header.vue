<template>
    <div class="header">
      <!-- Logo Image -->
      <img class="block" alt="Block" :src="block" />
  
      <!-- Navigation Pills -->
      <div class="navigation-pill-list">
        <div class="navigation-pill-2" />
        <div class="navigation-pill-2" />
  
        <NavigationPill
          class="navigation-pill-instance"
          label="Our Mission"
          state="default"
        />
      </div>
  
      <!-- Authentication Component -->
      <HeaderAuth
        buttonClassName="header-auth-instance"
        buttonClassNameOverride="design-component-instance-node"
        divClassName="header-auth-2"
        state="logged-out"
      />
    </div>
  </template>
  
  <script>
  import HeaderAuth from './HeaderAuth.vue';
  import NavigationPill from './NavigationPill.vue';
  import block from '@/assets/block.svg';
  
  export default {
    name: 'Header',
    components: {
      HeaderAuth,
      NavigationPill,
    },
    data() {
      return {
        block,
      };
    },
  };
  </script>
  
  <style src="../styles/header.css"></style>
  