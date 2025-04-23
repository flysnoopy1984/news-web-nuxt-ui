<template>
  <div class="page-container">
    <mainHeader></mainHeader>
    <div class="main-content">
      <slot></slot>
    </div>
    <mainFooter></mainFooter>
  </div>
</template>

<style>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 确保至少占满整个视窗高度 */
}

.main-content {
  flex: 1; /* 填充所有剩余空间 */
}
</style>