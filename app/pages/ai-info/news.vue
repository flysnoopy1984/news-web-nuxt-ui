<template>
     <div class="lg:max-w-[calc(100%-500px)] lg:mx-auto">
          <div class="sticky-header">
               <div class="header-container">
               <h1 class="page-title">最新推送新闻</h1>
               <div class="filter-section">
                    <div class="mb-4">
                        <USelect v-model="selectedTags"
                            :items=sources.selectListData
                            multiple
                            placeholder="选择新闻来源筛选"
                            class="min-w-[200px]"
                        />
                    </div>
                    <div class="selected-tags">
                         <div class="flex gap-2 flex-wrap">
                              <kks-tag
                                   v-for="tag in selectedTags"
                                   :key="tag"
                                   :color="getColorById(tag)"
                                   closable
                                   class="mr-1 mb-1 cursor-pointer max-w-[150px] truncate"
                                   @close="selectedTags = selectedTags.filter(t => t !== tag)"
                              >
                                   {{ tag }}
                              </kks-tag>
                         </div>
                    </div>
                    </div>
               </div>
          </div>
          <div v-if="status === 'pending'" class="loading">
            <div class="spinner"></div>
            <span>加载中...</span>
          </div>
          <div v-else-if="error" class="error-message">
            {{ error }}
          </div>
          <div v-else-if="newsList?.length === 0" class="empty-message">
            暂无最新推送新闻
          </div>
          <div v-else class="news-list">
            <div v-for="item in filteredNewsList" 
              :key="item.newsInfoId" 
              class="news-item"
              @click="openNews(item.url)">

              <div class="news-content">
                <div class="news-title">{{ item.title }}</div>
                <kks-tag :color="getColorById(item.sourceId)" class="max-w-[150px] truncate"
                >
                  {{ item.sourceName }}
                </kks-tag>
              </div>
              <div class="news-time">{{ formatTime(item.createDateTime) }}</div>

            </div>
          </div>
     </div>
</template>
<script lang="ts" setup>
import type { PushNewsLatest } from '~/types/news';

// import '~/assets/css/ai-info/news.css'
const selectedTags = useState<string[]>('news-selected-tags', () => []);
const sources = useNewsSources()
const sourceList = sources.value.sourceList

const getColorById =  (id: string) => sourceList.find(s => s.id === id)?.color || '#666666'

const { data: newsList, status,error } = useKksFetch<PushNewsLatest[]>('/aiInfo/push/news', {method: 'POST'})

//根据下拉框的内容过滤
const filteredNewsList = computed(() => {
  if (!Array.isArray(newsList.value)) return []
  if (selectedTags.value.length === 0) return newsList.value
  return newsList.value.filter(item => item && item.sourceId && selectedTags.value.includes(item.sourceId))
})

// 不直接打开新闻链接，url套一层kakasong域名的，为了小程序使用,跳不了。。。
const openNews = (url: string) => {
  if (url) {
    // const miniUrl = "https://www.kakasong.cn/webview?url="+url;
    window.open(url, '_blank')
  }
}

/* cookie 管理 start*/
// 从cookie中获取已保存的标签
const cookieTags = useCookie('kks_news_tags', {
  maxAge: 3600 * 24 * 30, // 30天有效期
  default: () => selectedTags.value,
})
// 初始化selectedTags
if (cookieTags.value && cookieTags.value.length > 0) {
  selectedTags.value = cookieTags.value
}
// 当标签变化时，更新cookie
watch(selectedTags, (newTags) => {
  cookieTags.value = [...newTags]
})
/* cookie 管理 end*/

</script>


<style scoped>
.header-container {
    background: #fff;
    padding: 16px;
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
  }

  .page-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
  }

  .filter-section {
    width: 100%;
    margin-bottom: 8px;
  }
  
  .selected-tags {
    margin-top: 8px;
    min-height: 32px;
  }
  
  .sticky-header {
    position: sticky;
    top: 0;
    z-index: 10;
    width: 100%;
  }
  
  .page-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
  }
  
  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top-color: #0066cc;
    animation: spin 1s ease-in-out infinite;
    margin-bottom: 10px;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .error-message, .empty-message {
    text-align: center;
    color: #666;
    margin-top: 40px;
    font-size: 16px;
  }
  
  .news-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .news-item {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 16px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .news-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .news-content {
    flex: 1;
    display: flex;
    align-items: flex-start;
    gap: 8px;
  }
  
  .news-title {
    font-size: 16px;
    font-weight: 500;
    color: #333;
    line-height: 1.4;
  }
  
  .news-tag {
    display: inline-block;
    font-size: 12px;
    padding: 2px 6px;
    border-radius: 4px;
    background-color: #e6f7ff;
    color: #0066cc;
    white-space: nowrap;
    margin-left: 8px;
  }
  
  .news-time {
    font-size: 12px;
    color: #999;
    white-space: nowrap;
    margin-left: 8px;
  }

</style>
