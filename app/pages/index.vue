<template>
  <div class="flex flex-col items-center justify-center gap-4 h-100">
    <h1 class="font-bold text-2xl text-(--ui-primary)">
      卡卡送
    </h1>

    <div class="flex flex-col items-center gap-2">
      <a href="https://ui.nuxt.com/getting-started/installation/nuxt" target="_blank">
        <img src="/img/kks_mini_ys.jpg" alt="KKS Logo" />
      </a>

      <UButton
        label="news"
        color="neutral"
        variant="outline"
        icon="token-branded:zero-network"
        to="/ai-info/news"
        
      />
    </div>
  </div>
</template>
<script setup lang="ts">
useHead({
   meta:[
     { 
      name: 'p:domain_verify', 
      content: '2012aca8232b82b17619e74facf7aaee' 
    }

   ],
})
</script>
