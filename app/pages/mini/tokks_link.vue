<!--
created by JackySong@2023
-->

<template>
    <div class="mainContainer">
        <div class="card">
            <div class="signHeader">
                <a class="logo" ></a>
                <div class="titleRow">
                    <div class="title">卡卡送 </div>
                     <div class="web-des">为您提供最贴心的祝福</div>
                </div>
            </div>
            <UButton icon="iconamoon:enter-bold" class="btnLogin" label="进入" color="info" @click="toMiniApp"></UButton>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type {resultUrlLinkVo} from '~/types/common'

definePageMeta({  
    layout:'blank'
})
const resLink = useState<resultUrlLinkVo | null>('resLink', () => null);
    
init();

function toMiniApp(){
    window.open(resLink.value?.url_link, '_blank')
}

//     if(toUrl == undefined || toUrl=="" )
//         init();
//     else{
//         if(process.client){
//             window.location.href = toUrl;
//         }      
//     }
// }

function init(){
    // debugger
    const route = useRoute();
    const scheme = route.query.scheme;
    const posterId = route.query.posterId;
    let req={}
    if(posterId != undefined){
        if(posterId == "home"){
            req = {
                "path": "/pages/home/mainPage",
                "query": ""
            }
        }
        else if(posterId == "section"){
            req = {
                "path": "/pages/home/home_section",
                "query": encodeURI("sectionCode=dailyInter&sectionName=日常互动"),
            }
        }
        else if(posterId == "calendar"){
            req = {
                "path": "/pages/home/home_calendar",
                "query": "",
            }
        }
        else{
            req = {
                "path": "/pages/detail/scan/qr",
                "query": "scene="+posterId,
            }
        }

        reqLinkUrl(req);
        return;
    }
}
 function reqLinkUrl(req:any){

   const {data} = useKksFetch<resultUrlLinkVo>("/mini/genUrlLink", 
        {
            method: 'POST',
            body:req
        }
    )
    resLink.value = data.value || null;

     
    return;
}
</script>

<style scoped>
@font-face{
  font-family: 'aliHealth';
  src:url("@/assets/fonts/kks-aliHealth.ttf");
}
@font-face{
  font-family: 'bxz';
  src:url("@/assets/fonts/kks-biaoxiaozhi.ttf");
}

.mainContainer{
    margin:20px auto;
    display: flex;
    justify-content: center;
}
.card{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.signHeader{
    display: flex;
    justify-content: center;
}
.signHeader .logo{
    display:inline-block;
    height: 80px;
    width: 100px;
    background: url('/img/kksLogo_128.png')  no-repeat;
    background-size: 80px 80px;
}
.titleRow{
    display: flex; 
    flex-direction: column;
    justify-content: space-around;
}
.title{
    font-size: 20px;
    font-weight: 700; 
    font-family: 'aliHealth';
    color: #4441A9;
    margin-top:8px;
}
.web-des{
    font-family: 'bxz';
    letter-spacing: 2px;
    font-size: 14px;
    margin-left: 2px;
    margin-right: 10px;
    color: #61a9b9;
    padding-top: 6px;
}
.btnLogin{
    margin-top:40px;
    
}
</style>
