<template>
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position:absolute;width:0;height:0" aria-hidden="true"><defs><symbol viewBox="0 0 512 512" id="bin"><path d="M64 160v320c0 17.6 14.4 32 32 32h288c17.6 0 32-14.4 32-32V160H64zm96 288h-32V224h32v224zm64 0h-32V224h32v224zm64 0h-32V224h32v224zm64 0h-32V224h32v224zM424 64H320V24c0-13.2-10.8-24-24-24H184c-13.2 0-24 10.8-24 24v40H56c-13.2 0-24 10.8-24 24v40h416V88c0-13.2-10.8-24-24-24zm-136 0h-96V32.401h96V64z"></path></symbol><symbol viewBox="0 0 20 32" id="arrow"><path d="M16.552 5.633l-2.044-2.044L2.243 15.854l12.265 12.557 2.044-2.044L6.331 15.854z"></path></symbol><symbol viewBox="0 0 10 10" id="arrow_up"><g fill="none" fill-rule="evenodd"><rect width="10" height="10" rx=".5"></rect><path fill="#A7A7A7" d="M5.047 2.843L.691 6.906a.382.382 0 0 1-.522-.56l4.56-4.252a.382.382 0 0 1 .523.01.51.51 0 0 1 .263.128l4.292 4.08a.42.42 0 0 1 .022.597l.049-.052a.41.41 0 0 1-.584.022L5.047 2.843z"></path></g></symbol><symbol viewBox="0 0 10 10" id="arrow_down"><path fill="#A7A7A7" fill-rule="evenodd" d="M5.04 6.268L.827 2.337a.37.37 0 0 0-.518.017.37.37 0 0 0 .019.518L4.784 7.03a.37.37 0 0 0 .545-.05.437.437 0 0 0 .102-.072l4.225-4.014a.396.396 0 0 0 .013-.564l.047.05a.397.397 0 0 0-.565-.015l-4.11 3.904z"></path></symbol><symbol viewBox="0 0 12 12" id="search"><g fill="none" fill-rule="evenodd"><path fill="#F5F5F5" d="M-179-10h375v805h-375z"></path><path fill="#FFF" d="M-179 0h375v22h-375z"></path><text font-family="PingFangSC-Regular, PingFang SC" font-size="11" transform="translate(-179)"><tspan x="179.5" y="16" fill="#333">黄焖鸡</tspan> <tspan x="212.5" y="16" fill="#999">标准份</tspan></text><g><path fill="#FFF" d="M-179-11h375v44h-375z"></path><path fill="#F5F5F5" d="M-167-3h351a2 2 0 0 1 2 2v24a2 2 0 0 1-2 2h-351a2 2 0 0 1-2-2V-1a2 2 0 0 1 2-2z"></path><path fill="#999" fill-rule="nonzero" d="M11.255 5.338C11.11 2.475 8.787.152 5.924.008A5.632 5.632 0 0 0 .008 5.926c.145 2.845 2.44 5.158 5.284 5.325a5.636 5.636 0 0 0 2.24-.319.507.507 0 1 0-.342-.954 4.622 4.622 0 0 1-1.839.261c-2.327-.137-4.211-2.036-4.33-4.365A4.618 4.618 0 0 1 5.871 1.02c2.344.119 4.251 2.026 4.37 4.37a4.602 4.602 0 0 1-1.275 3.434.62.62 0 0 0 .007.866l2.16 2.16a.507.507 0 1 0 .718-.716L9.956 9.238a5.615 5.615 0 0 0 1.3-3.9z"></path></g></g></symbol><symbol viewBox="0 0 15 16" id="recommend"><path fill="none" fill-rule="evenodd" stroke="#333" d="M9.965 14.52H3.792V7.924v6.596H1.499A.493.493 0 0 1 1 14.026l.004-6.53c0-.272.22-.492.499-.492h1.283c.555 0 1.006.438 1.006.92.946 0 2.707-2.777 3.897-6.216 0 0-.288.965.035-.113.322-1.079 1.663-.624 1.685.83-.022 4.203 0 3.684 0 3.684h3.776c.553 0 1.001.455 1.001.998v3.734c0 3.782-4.221 3.679-4.221 3.679z"></path></symbol><symbol viewBox="0 0 64 64" id="loading"><path fill-rule="evenodd" d="M60 36h-8c-2.203 0-4-1.797-4-4 0-2.208 1.797-4 4-4h8c2.203 0 4 1.792 4 4 0 2.203-1.797 4-4 4zM48.973 20.686a4 4 0 0 1-5.66 0 3.995 3.995 0 0 1 0-5.655l5.66-5.653a3.99 3.99 0 0 1 5.65 0 4 4 0 0 1 0 5.655l-5.65 5.656zM32 64a4 4 0 0 1-4-4v-8a4 4 0 0 1 4-4c2.203 0 4 1.797 4 4v8c0 2.203-1.797 4-4 4zm0-48a4 4 0 0 1-4-4V4a4 4 0 1 1 8 0v8c0 2.208-1.797 4-4 4zM15.03 54.624a3.995 3.995 0 0 1-5.654 0 3.99 3.99 0 0 1 0-5.65l5.655-5.66a3.995 3.995 0 0 1 5.657 0 4.004 4.004 0 0 1 0 5.66l-5.655 5.65zm0-33.938L9.373 15.03a3.995 3.995 0 0 1 0-5.654 4 4 0 0 1 5.654 0l5.655 5.655a3.995 3.995 0 0 1 0 5.657 3.99 3.99 0 0 1-5.65 0zM16 32a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4 4 4 0 0 1 4-4h8a4 4 0 0 1 4 4zm32.973 11.314l5.65 5.66a3.99 3.99 0 0 1 0 5.65 3.992 3.992 0 0 1-5.65 0l-5.66-5.65a4 4 0 0 1 0-5.66 4 4 0 0 1 5.66 0z"></path></symbol><symbol viewBox="0 0 32 32" id="arrow-right"><path fill="#999" d="M26.055 16L10.118 32 6.45 28.142l12.205-12.269L5.944 3.92 9.865-.001z"></path></symbol><symbol viewBox="0 0 33 32" id="default"><path fill="#3b87c8" d="M13.374 29.064a.94.94 0 0 1-.941-.941V6.476l-7.285 6.899a.942.942 0 0 1-1.299-1.364l8.876-8.424a.94.94 0 0 1 1.59.681v23.855a.94.94 0 0 1-.941.941zM20.904 29.355h-.008a.94.94 0 0 1-.375-.078.943.943 0 0 1-.559-.86V3.944a.94.94 0 1 1 1.882 0v22.287l7.238-6.842a.94.94 0 0 1 1.289 1.366l-8.818 8.338a.943.943 0 0 1-.649.264z"></path></symbol><symbol viewBox="0 0 32 32" id="distance"><path fill="#2a9bd3" d="M15.884 31.236l-.042.001a.888.888 0 0 1-.59-.224l-7.91-7.91a7.548 7.548 0 0 1-.498-.471 12.752 12.752 0 0 1-3.747-9.045C3.097 6.523 8.824.796 15.888.796s12.791 5.727 12.791 12.791c0 3.532-1.432 6.73-3.747 9.045-.196.196-.409.391-.613.578l-7.813 7.804a.886.886 0 0 1-.589.223l-.035-.001zm0-28.667C9.818 2.59 4.908 7.513 4.908 13.582c0 3.023 1.218 5.762 3.19 7.752l.461.435 7.316 7.316 7.2-7.2q.284-.249.551-.516a10.977 10.977 0 0 0 3.225-7.787c0-6.066-4.905-10.987-10.965-11.013z"></path><path fill="#2a9bd3" d="M15.884 18.524a5.707 5.707 0 0 1-4.07-1.732l-.001-.001a5.76 5.76 0 1 1 4.119 1.734h-.05zm-2.817-2.942a3.982 3.982 0 1 0 0-5.626c-.726.717-1.175 1.713-1.175 2.813s.449 2.096 1.175 2.813z"></path></symbol><symbol viewBox="0 0 32 32" id="fengniao"><path fill="#27a9e1" d="M5.953 2.793s-.117 1.801.857 3.56c.361.255 10.458 6.218 10.458 6.218L5.953 2.794z"></path><path fill="#b8e5fa" d="M9.604.889s-.333 1.404.069 3.147c.254.307 7.801 8.116 7.801 8.116L9.604.889z"></path><path fill="#0089cf" d="M29.282 14.601l-4.861-.361s-.133-.001-.147-.226h-.002a2.652 2.652 0 0 0-2.978-2.357h-.003l-.011.001-.12.019-.004.001c-.432.075-1.812.374-3.038 1.285 0 0-.167.121-.421.33L2.665 6.043s3.254 8.665 12.207 11.98c-1.6 2.849-7.407 13.48-7.407 13.48l2.446-1.306s.775-2.853 1.884-4.957c.609-.936 1.211-.992 1.498-1.141.291-.151 3.707-.765 6.431-4.339.897-1.166 1.244-2.666 1.723-4.261.28-.061 3.008-.651 3.789-.718 1.068-.092 4.045-.181 4.045-.181z"></path><path fill="#0089cf" d="M7.392 17.849c-1.567-1.368-2.199-3.219-2.035-5.217-.232-.288-.45-.572-.654-.851-.484 2.903.555 4.854 2.176 6.269 1.538 1.342 3.635 1.85 5.466 1.577-1.674.109-3.563-.565-4.953-1.778z"></path><path fill="#0089cf" d="M12.345 19.628h.002zm-7.642-7.846c.204.279.421.563.654.851-.164 1.998.468 3.849 2.035 5.217 1.292 1.128 3.016 1.79 4.597 1.79.12 0 .238-.004.356-.011a6.554 6.554 0 0 1-.975.071c-1.568 0-3.22-.54-4.49-1.648-1.621-1.415-2.66-3.366-2.176-6.269z"></path></symbol><symbol viewBox="0 0 23 32" id="hot"><path fill="#f07373" d="M9.859 29.375c-3.489-.771-6.362-3.097-7.187-5.551-.882-2.623-1.029-6.873-.238-9.318l-1.727.037.001.002.001.004.004.01.011.029.038.091c.039.09.086.191.142.3.155.304.349.627.586.955a7.477 7.477 0 0 0 2.711 2.318c.583.153.583.153 1.087-.188.187-.263.187-.263.224-.39.028-.094.041-.176.05-.28.01-.109.016-.238.022-.47.063-2.219.162-3.38.562-4.943a10.05 10.05 0 0 1 .814-2.185c1.433-2.723 4.843-6.053 6.699-7.021l-1.325-.962c-.064.382-.127.992-.131 1.722-.008 1.252.169 2.393.616 3.329.261.547.525.968 1.132 1.862l.23.339c.86 1.281 1.161 1.986 1.069 2.653l-.009.125c.069.517.069.517.781.906.451-.026.451-.026.578-.104.144-.093.144-.093.19-.136.041-.037.079-.077.123-.125.068-.076.153-.178.245-.295.22-.279.458-.615.677-.963.648-1.028 1.045-1.988 1.037-2.845l-.914.009-.706.581c.295.358.809 1.075 1.33 1.936.826 1.363 1.492 2.791 1.898 4.209 1.1 3.845.3 9.288-2.245 11.75a9.652 9.652 0 0 1-1.659 1.29 10.232 10.232 0 0 1-3.471 1.332c-.794.151-1.385.191-2.064.191h-.009a2.75 2.75 0 0 1-.373-.03 6.007 6.007 0 0 1-.585-.115 7.765 7.765 0 0 1-.536-.15l-.578 1.735a9.182 9.182 0 0 0 1.445.341c.221.031.43.048.627.048h.009a12.546 12.546 0 0 0 2.407-.224 12.011 12.011 0 0 0 4.088-1.572c.699-.431 1.358-.94 1.971-1.533 3.098-2.998 4-9.132 2.731-13.567-.455-1.591-1.188-3.161-2.092-4.653-.569-.939-1.134-1.727-1.482-2.15l-1.645-1.998.024 2.588c.004.412-.281 1.1-.756 1.853a9.64 9.64 0 0 1-.569.809 4.528 4.528 0 0 1-.158.195c.028-.027.028-.027.16-.113.122-.075.122-.075.57-.101.71.388.71.388.778.902h-.914l.906.125c.174-1.262-.261-2.281-1.362-3.922l-.235-.347c-.554-.817-.787-1.189-.995-1.624-.306-.642-.444-1.53-.438-2.53a10.566 10.566 0 0 1 .107-1.431L14.44.304l-1.628.85c-2.18 1.138-5.862 4.733-7.471 7.791a11.873 11.873 0 0 0-.967 2.583 19.2 19.2 0 0 0-.511 3.147c-.036.423-.061.839-.079 1.273-.011.281-.019.531-.029.924-.005.191-.01.298-.015.354a.403.403 0 0 1 .019-.077c.027-.099.027-.099.203-.346.492-.332.492-.332 1.112-.157a5.745 5.745 0 0 1-2.54-2.496 3.456 3.456 0 0 1-.093-.197l-.018-.044-.002-.006v.001l.001.002v.002l-.915-2.473-.812 2.51c-.917 2.836-.757 7.485.245 10.463 1.042 3.099 4.442 5.852 8.526 6.754l.395-1.785z"></path></symbol><symbol viewBox="0 0 32 32" id="price"><path fill="#e6b61a" d="M16 32c8.837 0 16-7.163 16-16S24.837 0 16 0 0 7.163 0 16s7.163 16 16 16zm0-2C8.268 30 2 23.732 2 16S8.268 2 16 2s14 6.268 14 14-6.268 14-14 14z"></path><path fill="#e6b61a" d="M23.14 6.06l-5.12 8.65h4.48v1.54h-5.49v2.43h5.49v1.54h-5.49v5.1h-2.02v-5.1H9.53v-1.54h5.46v-2.43H9.53v-1.54h4.45L8.8 6.06h2.24l4.99 8.48 4.93-8.48h2.18z"></path></symbol><symbol viewBox="0 0 33 32" id="rating"><path fill="#eba53b" d="M27.087 31.84L16.8 25.553 6.504 31.84l2.824-11.727-9.186-7.878 12.019-.941L16.801.16l4.631 11.134 12.019.941-9.158 7.849zM16.8 23.369l7.407 4.527-2.014-8.471 6.588-5.647-8.659-.696L16.8 5.063l-3.341 8.019-8.659.696 6.588 5.647-2.014 8.471z"></path></symbol><symbol viewBox="0 0 38 32" id="selected"><path fill="#3190e8" d="M32.291 2.327c.582-.582 1.455-.582 2.036 0l2.036 2.036c.582.582.582 1.455 0 2.036L13.818 29.09c-.582.582-1.455.582-2.036 0L1.455 18.908c-.582-.582-.582-1.455 0-2.036l2.036-2.036c.582-.582 1.455-.582 2.036 0l7.273 7.273L32.291 2.327z"></path></symbol><symbol viewBox="0 0 32 32" id="speed"><path fill="#37c7b7" d="M16 32c8.837 0 16-7.163 16-16S24.837 0 16 0 0 7.163 0 16s7.163 16 16 16zm0-2C8.268 30 2 23.732 2 16S8.268 2 16 2s14 6.268 14 14-6.268 14-14 14z"></path><path fill="#37c7b7" d="M15 7v11.002l5.678 4.882 1.304-1.517-5.33-4.583.348.758V6.999h-2z"></path></symbol><symbol viewBox="0 0 26 26" id="more-filter"><path d="M9.001 15.009V23a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7.981l7.788-10.01a1 1 0 0 0-1.578-1.228l-8 10.28a1 1 0 0 0-.21.615V22h-4v-7.324a1 1 0 0 0-.2-.6L4.001 5h14a1 1 0 0 0 0-2H2a1 1 0 0 0-.8 1.6L9 15.009z"></path></symbol><symbol viewBox="0 0 17 14" id="supervip"><defs><linearGradient id="supervip_a" x1="100%" x2="0%" y1="50%" y2="50%"><stop offset="0%" stop-color="#FDBD05"></stop><stop offset="100%" stop-color="#FFDB72"></stop></linearGradient></defs><path fill="url(#supervip_a)" fill-rule="evenodd" d="M11.666 6.286l-2.95-3.923a.266.266 0 0 0-.43 0L5.333 6.29a1.063 1.063 0 0 1-1.487.227L1.43 4.747a.266.266 0 0 0-.379.066.289.289 0 0 0-.046.212l1.452 8.485c.039.228.21.408.43.454 1.891.387 9.356.388 11.22 0a.554.554 0 0 0 .427-.452l1.463-8.506a.28.28 0 0 0-.22-.326.265.265 0 0 0-.206.048L13.156 6.51a1.063 1.063 0 0 1-1.49-.225z" transform="translate(0 -1.255)"></path></symbol></defs></svg>
    <div class="search-wr">
      <section class="search-bar">
        <svg @click="goBack" aria-label="返回按钮" role="button" class="app-21LS3_1">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow">
            <svg viewBox="0 0 20 32" id="arrow" width="100%" height="100%"><path d="M16.552 5.633l-2.044-2.044L2.243 15.854l12.265 12.557 2.044-2.044L6.331 15.854z"></path></svg>
          </use>
          </svg>
          <form class="search-from" @submit.prevent="searchBtn" >
              <svg aria-hidden="true" class="app-2kCc4_1">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#search">
                  <svg viewBox="0 0 12 12" id="search" width="100%" height="100%"><g fill="none" fill-rule="evenodd"><path fill="#F5F5F5" d="M-179-10h375v805h-375z"></path><path fill="#FFF" d="M-179 0h375v22h-375z"></path><text font-family="PingFangSC-Regular, PingFang SC" font-size="11" transform="translate(-179)"><tspan x="179.5" y="16" fill="#333">黄焖鸡</tspan> <tspan x="212.5" y="16" fill="#999">标准份</tspan></text><g><path fill="#FFF" d="M-179-11h375v44h-375z"></path><path fill="#F5F5F5" d="M-167-3h351a2 2 0 0 1 2 2v24a2 2 0 0 1-2 2h-351a2 2 0 0 1-2-2V-1a2 2 0 0 1 2-2z"></path><path fill="#999" fill-rule="nonzero" d="M11.255 5.338C11.11 2.475 8.787.152 5.924.008A5.632 5.632 0 0 0 .008 5.926c.145 2.845 2.44 5.158 5.284 5.325a5.636 5.636 0 0 0 2.24-.319.507.507 0 1 0-.342-.954 4.622 4.622 0 0 1-1.839.261c-2.327-.137-4.211-2.036-4.33-4.365A4.618 4.618 0 0 1 5.871 1.02c2.344.119 4.251 2.026 4.37 4.37a4.602 4.602 0 0 1-1.275 3.434.62.62 0 0 0 .007.866l2.16 2.16a.507.507 0 1 0 .718-.716L9.956 9.238a5.615 5.615 0 0 0 1.3-3.9z"></path></g></g></svg>
                </use>
              </svg>
              <input type="search" autofocus="autofocus" @keyup="search" v-model="search1" :placeholder="hintInfo" class="search-input">
              <button  type="submit" @click="hotFood(search1,$event)" class="search-btn">搜索</button>
          </form>  
      </section>
      <div v-if="searchIndex">
        <div class="seach-content" v-show="!isShow">
          <div style>
          <ul>
            <li @click="searchShop(item.id,item.newname,$event)"  role="button" v-if="restaurants" v-for="item in restaurants" :key="item.id">
              <div class="search-shop">
                <img :src="item.image_path|imgUrl" alt="">
                <div class="shop-info">
                  <div>
                    <p class="shop-title">
                      <span class="shop-p"  v-html="item.name">
                      </span>
                      <span v-if="item.tags.length" v-for="(icon, index) in item.tags" :key="index" class="iconsong" :style="`background:#${icon.name_color}`">
                        {{icon.name}}
                      </span>
                    </p>
                  </div>
                  <span class="search-rating">
                    评价{{item.rating.toFixed(1)}}
                  </span>
                </div>
              </div>
            </li>
            <li @click="hotFood(item.newword,$event)" class="search-word" v-for="(item, index) in words" :key="index">
              <svg class="search-icon">
                <use xlink:href="#search">
                  <svg viewBox="0 0 12 12" id="search" width="100%" height="100%"><g fill="none" fill-rule="evenodd"><path fill="#F5F5F5" d="M-179-10h375v805h-375z"></path><path fill="#FFF" d="M-179 0h375v22h-375z"></path><text font-family="PingFangSC-Regular, PingFang SC" font-size="11" transform="translate(-179)"><tspan x="179.5" y="16" fill="#333">黄焖鸡</tspan> <tspan x="212.5" y="16" fill="#999">标准份</tspan></text><g><path fill="#FFF" d="M-179-11h375v44h-375z"></path><path fill="#F5F5F5" d="M-167-3h351a2 2 0 0 1 2 2v24a2 2 0 0 1-2 2h-351a2 2 0 0 1-2-2V-1a2 2 0 0 1 2-2z"></path><path fill="#999" fill-rule="nonzero" d="M11.255 5.338C11.11 2.475 8.787.152 5.924.008A5.632 5.632 0 0 0 .008 5.926c.145 2.845 2.44 5.158 5.284 5.325a5.636 5.636 0 0 0 2.24-.319.507.507 0 1 0-.342-.954 4.622 4.622 0 0 1-1.839.261c-2.327-.137-4.211-2.036-4.33-4.365A4.618 4.618 0 0 1 5.871 1.02c2.344.119 4.251 2.026 4.37 4.37a4.602 4.602 0 0 1-1.275 3.434.62.62 0 0 0 .007.866l2.16 2.16a.507.507 0 1 0 .718-.716L9.956 9.238a5.615 5.615 0 0 0 1.3-3.9z"></path></g></g></svg>
                </use>
              </svg>
              <p class="word" v-html="item.word"></p>
            </li>
          </ul>
          </div>
        </div>
        <section v-show="isShow">
          <header class="histry" v-if="his"> 
            <span>历史搜索</span>
          <div @click="clearHis" aria-label="清除历史搜索" role="button" class="index-3cPNo">
              <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#bin">
                  <svg viewBox="0 0 512 512" id="bin" width="100%" height="100%"><path d="M64 160v320c0 17.6 14.4 32 32 32h288c17.6 0 32-14.4 32-32V160H64zm96 288h-32V224h32v224zm64 0h-32V224h32v224zm64 0h-32V224h32v224zm64 0h-32V224h32v224zM424 64H320V24c0-13.2-10.8-24-24-24H184c-13.2 0-24 10.8-24 24v40H56c-13.2 0-24 10.8-24 24v40h416V88c0-13.2-10.8-24-24-24zm-136 0h-96V32.401h96V64z"></path></svg>
                </use>
              </svg>
            </div>
          </header>
          <section class="his-con-wr">
            <button @click="hotFood(item, $event)" class="hisBtn" v-for="(item, index) in his" :key="index">{{item}}</button>
          </section>
        </section>
        <section v-show="isShow" style="margin-top: .4rem;margin-top: 4vw;">
          <header class="histry" > 
            <span>热门搜索</span>
          </header>
          <section class="his-con-wr">
            <button @click="hotFood(item.word ,$event)" class="hisBtn" v-for="(item, index) in hotFoods" :key="index">{{item.word}}</button>
          </section>
        </section>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import {setSession, getSession, setLocation, getLocation} from '@/common/public.js'
import axios from 'axios'
export default {
  data() {
    return {
      lat:null,
      lon: null,
      search1: null,
      cityId: null,
      words: null,
      restaurants:null,
      foods: null,
      his: null,
      hotFoods: null,
      isShow: true,
      shop:null,
      hintInfo: '输入商家、商品名称',
      searchIndex: true,
      shopInfo: null,
      position: null
    }
  },
  mounted() {
    const _this = this
    this.lat = getSession('latitude')
    this.lon = getSession('longitude')
    this.cityId = getSession('cityId')
    this.position = this.$store.state.position
    this.his = getLocation('his') ? JSON.parse(getLocation('his')) : null
    axios.get(
      `/apis/restapi/shopping/v3/hot_search_words?latitude=${_this.position.lat}&longitude=${_this.position.lng}`
    ).then(data => {
      this.hotFoods = data.data
    })
  },
  methods: {
    search: function () {
      const _this = this
      if(!this.search1) {
        this.isShow = true
        return
      }
      this.isShow = false
      axios.get(`/apis/restapi/shopping/v1/typeahead?kw=${this.search1}&latitude=${_this.position.lat}&longitude=${this.position.lng}&city_id=${this.position.cityId}`)
        .then(data => { 
          data.data.restaurants.map(res => {
            res.newname = res.name
            let reg = new RegExp(data.data.search_word,"g")
            let arr = reg.exec(res.name)
           if(arr) {
            // let arr1 = res.name.split(arr[0])
            let reg = '/'+data.data.search_word+'/g'
            res.name = res.name.replace(eval(reg), '<span style="display:inline-block;color:#999" class="search-words">'+data.data.search_word+'</span>','g')
             
           }
          })
          data.data.word_with_meta.map(word => {
            word.newword = word.word
            let reg = new RegExp(data.data.search_word,"g")
            let arr = reg.exec(word.word)
            if(arr) {
              // let arr1 = res.name.split(arr[0])
              let reg = '/'+data.data.search_word+'/g'
            word.word = word.word.replace(eval(reg), '<span style="display:inline-block;color:#999" class="search-words">'+data.data.search_word+'</span>','g')
           }
          })
          this.words = data.data.word_with_meta
          
          this.restaurants = data.data.restaurants
          console.log(data)
        })
    },
    searchBtn: function(){
      // window.localStorage.clear('his')
      if (!this.search1) {
        return
      }
      this.addHis(this.search1)
        this.$router.replace({name: 'searchShop', query:{keyword: this.search1}})
    },
    clearHis: function () {
      window.localStorage.clear('his')
      this.his = null
    },
    addHis: function(his){
      if (!getLocation('his')) {
        let arr = []
        arr.unshift(his)
        setLocation('his', JSON.stringify(arr))
      }else{
       
        let arr1 = JSON.parse(getLocation('his'))
        if(!arr1.some(value => value === his)){
          arr1.unshift(his)
          if(arr1.length>10){
            arr1.pop()
          }
          setLocation('his', JSON.stringify(arr1))
        }
      }
    },
    hotFood: function(keyword,ev){
      this.addHis(keyword)
      axios.get(
        `/apis/restapi/shopping/v2/restaurants/search?offset=0&limit=15&keyword=${keyword}&latitude=${this.position.lat}&longitude=${this.position.lng}&search_item_type=3&is_rewrite=1&extras[]=activities&extras[]=coupon&terminal=h5`
        ).then(data => {
          this.shopInfo = data.data
          this.$store.dispatch('setKeyWord', keyword)
          this.$router.replace({name: 'searchShop', query:{keyword}})
        })
        
    },
    searchShop: function(shopId,keyword, ev) {
      const node = ev.target
      this.$router.push({path: `/shop/${shopId}`})
    },
    goBack: function() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="stylus" scoped>
.search-wr {
  height: 10vh

  .search-bar {
    -webkit-align-items: center
    align-items: center
    z-index: 101
    background: #fff
    z-index: 52
    display: -webkit-flex
    display: flex
    position: relative

    .app-21LS3_1 {
      width: 0.933333rem
      width: 9.333333vw*0.5vw
      height: 0.933333rem
      height: 9.333333vw*0.5vw
      fill: #999
      font-size: 24px
      padding: 0.133333rem 0.133333rem 0.133333rem 0
      padding: 1.333333vw 1.333333vw 1.333333vw 0
    }
  }
  .search-from {
    -webkit-flex-grow: 1
    flex-grow: 1
    padding: 0.293333rem 0.293333rem 0.293333rem 0
    padding: 2.933333vw 2.933333vw 2.933333vw 0
    margin-left: 0.293333rem
    margin-left: 2.933333vw
    background-color: #fff
    z-index: 101
    display: -webkit-flex
    display: flex
    position: relative

    .app-2kCc4_1 {
      width: 0.293333rem
      width: 2.933333vw
      height: 0.293333rem
      height: 2.933333vw
      position: absolute
      top: 0.533333rem
      top: 5.333333vw
      left: 0.293333rem
      left: 2.933333vw
    }
    .search-input {
      -webkit-flex-grow: 1;
      flex-grow: 1;
      border-radius: .026667rem;
      border-radius: .266667vw;
      -webkit-appearance: none;
      background-color: #f8f8f8;
      padding: .173333rem .4rem .173333rem .88rem;
      padding: 1.733333vw 4vw 1.733333vw 8.8vw;
      font-size: .346667rem;
      color: #666;
      outline: none;
      border: none;
    }
    .search-btn {
      outline: none;
      color: #333;
      font-size: .426667rem;
      background: #fff;
      font-weight: 700;
      margin-left: .293333rem;
      margin-left: 2.933333vw;
      outline: none;
      border: none;
    }
  }
  .histry {
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    font-size: .426667rem;
    padding: .2rem .333333rem;
    padding: 2vw 3.333333vw;
    color: #666;
    font-weight: 700;
    .index-3cPNo {
      padding-top: .053333rem;
      padding-top: .533333vw;
      svg {
        height: .32rem;
        height: 3.2vw;
        width: .32rem;
        width: 3.2vw;
        color: #cecece;
        fill: currentColor;
      }
    }
  }
  .seach-content {
    height: calc(100vh - 1.36rem);
    height: calc(100vh - 13.6vw);
    .search-shop {
      padding: 0 .426667rem;
      padding: 0 4.266667vw;
      display: -webkit-flex;
      display: flex;
      height: 1.493333rem;
      height: 14.933333vw;
      -webkit-align-items: center;
      align-items: center;
      img {
        -webkit-flex: none;
        flex: none;
        width: .64rem;
        width: 6.4vw;
        height: .64rem;
        height: 6.4vw;
        margin-right: .426667rem;
        margin-right: 4.266667vw;
        border-radius: .013333rem;
        border-radius: .133333vw;
        max-width 100%
      }
      .shop-info {
        display: -webkit-flex;
        display: flex;
        -webkit-justify-content: space-between;
        justify-content: space-between;
        -webkit-align-items: center;
        align-items: center;
        -webkit-flex: 1;
        flex: 1;
        height: 1.493333rem;
        height: 14.933333vw;
        border-bottom: 1px solid #e3e3e3;
        .shop-title {
          display: -webkit-flex;
          display: flex;
          -webkit-align-items: center;
          align-items: center;
          .shop-p {
            display: inline-block;
            max-width: 5.6rem;
            max-width: 56vw;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: .373333rem;
            color: #333;
            margin-right: .08rem;
            margin-right: .8vw;
            .search-words {
              color: #999;
            }
          }
          .iconsong{
            color: #fff;
            font-size: .533333rem;
            border-radius: .053333rem;
            border-radius: .533333vw;
            height: .693333rem;
            height: 6.933333vw;
            line-height: .693333rem;
            line-height: 6.933333vw;
            text-align: center;
            display: inline-block;
            padding: 0 .08rem;
            padding: 0 .8vw;
            margin-left: .08rem;
            margin-left: .8vw;
            -webkit-transform: scale(.5);
            transform: scale(.5);
            -webkit-transform-origin: 0 50%;
            transform-origin: 0 50%;
          }
        }
      }
    }
  }
  .search-rating {
    color: #999;
    font-size: .32rem;
  }
  .search-words {
    color: #999;
  }
  .search-word{
    display: -webkit-flex;
    display: flex;
    height: 1.173333rem;
    height: 11.733333vw;
    -webkit-align-items: center;
    align-items: center;
    padding: 0 .4rem;
    padding: 0 4vw;
    font-size: .373333rem;
  }
  .search-icon{
    height: .346667rem;
    height: 3.466667vw;
    width: .346667rem;
    width: 3.466667vw;
    margin-right: .32rem;
    margin-right: 3.2vw;
  }
  .word{
    -webkit-flex: 1;
    flex: 1;
    height: 1.173333rem;
    height: 11.733333vw;
    line-height: 1.173333rem;
    line-height: 11.733333vw;
    border-bottom: 1px solid #e3e3e3;
  }
  .his-con-wr{
    padding: 0 .333333rem .333333rem;
    padding: 0 3.333333vw 3.333333vw;
    .hisBtn{
      outline: none;
      border: none;
      display: inline-block;
      border-radius: .066667rem;
      border-radius: .666667vw;
      padding: .2rem .266667rem;
      padding: 2vw 2.666667vw;
      font-size: .373333rem;
      margin-right: .333333rem;
      margin-right: 3.333333vw;
      margin-top: .333333rem;
      margin-top: 3.333333vw;
      color: #666;
      background-color: #f7f7f7;
    }
  }
}
</style>
