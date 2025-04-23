export interface PushNewsLatest {
    sourceId: string;       // 渠道ID
    sourceName: string;     // 渠道名
    newsInfoId: string;     // news_infos表主键ID
    createDateTime: string; // 创建时间
    title: string;          // 新闻标题（关联自news_infos表）
    url: string;            // 新闻URL（关联自news_infos表）
}