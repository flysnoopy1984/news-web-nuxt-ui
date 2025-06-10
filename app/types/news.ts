export interface PushNewsLatest {
    sourceId: string;       // 渠道ID
    sourceName: string;     // 渠道名
    newsInfoId: string;     // news_infos表主键ID
    createDateTime: string; // 创建时间
    title: string;          // 新闻标题（关联自news_infos表）
    url: string;            // 新闻URL（关联自news_infos表）
}

// API请求参数接口
export interface QNewsInfos {
    // 根据实际需要添加参数，这里提供一个基本结构
    sourceList?: string[];   // 来源ID列表
    createDate?: string;      // 创建时间
}
