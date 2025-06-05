<template>
  <div class="webview-container">
    <ClientOnly v-if="url" >

      <iframe 
        
        :src="url" 
        class="webview-frame" 
        frameborder="0"
        allowfullscreen
        referrerpolicy="no-referrer"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-mixed-content"
        allow="mixed-content"
        @load="handleIframeLoad" 
        @error="handleIframeError"
      ></iframe>
    </ClientOnly>

    <div v-else-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
    <div v-else class="error-message">
      未提供URL参数
    </div>
  </div>
</template>

<script setup>
// 导入Nuxt的组合式API
import { ref, computed } from 'vue';
import { useRoute, useHead } from '#imports';

// 设置页面元数据
definePageMeta({
  layout: 'blank',
  ssr: false 
});

const route = useRoute();
const errorMessage = ref('');

// 使用计算属性获取URL参数
const url = computed(() => {
  if (route.query.url) {
    resultUrl = decodeURIComponent(route.query.url);
    return resultUrl;
  } else if (route.params.url) {
    return decodeURIComponent(route.params.url);
  }
  return '';
});

// iframe 加载成功处理函数
const handleIframeLoad = (event) => {
  // 加载成功，清除错误信息
  errorMessage.value = '';
  
  // 可以在这里添加额外的逻辑，例如记录访问日志等
};

// iframe 加载失败处理函数
const handleIframeError = (event) => {
  errorMessage.value = '无法加载请求的页面，可能该网站不允许被嵌入';
};

// 设置页面head
useHead({
  title: '网页浏览',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' }
  ]
});
</script>

<style scoped>
/* 设置容器为全屏 */
.webview-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #ffffff;
  z-index: 1000;
}

/* 设置iframe为全屏 */
.webview-frame {
  width: 100%;
  height: 100%;
  border: none;
  margin: 0;
  padding: 0;
}

/* 错误信息样式 */
.error-message {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 16px;
  color: #666;
}

/* 确保在移动设备上全屏显示 */
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  height: 100%;
  width: 100%;
}
</style>
