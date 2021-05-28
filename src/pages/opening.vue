<template>
  <van-swipe :loop="false">
    <template #indicator="{ active }">
      <indicators
        :active="active"
        :num="5"
        color="var(--text-color)"
      ></indicators>
    </template>
    <van-swipe-item
      v-for="item of swipeItems"
      :key="item.image"
    >
      <van-image
        :src="item.image"
        :alt="item.quote +'——'+ item.from"
        fit="cover"
        radius="2.5vmin"
      ><span class="tags">
          <tag
            v-for="tag of item.tags"
            :key="tag"
          >{{tag}}</tag>
        </span>
      </van-image>
      <quote class="quote">
        <template #default>{{item.quote}}</template>
        <template #from>{{item.from}}</template>
      </quote>
      <logo class="logo"></logo>
    </van-swipe-item>
    <van-swipe-item>
      <span class="slogn">
        <p>CELESTE</p>
        <p>VOIX</p>
      </span>
      <logo class="logo"></logo>

      <van-button
        round
        color="var(--theme-color)"
        class="btn"
        style="color: black;"
        @click="pushToLogin"
      >
        Let's VOIX
      </van-button>
    </van-swipe-item>
  </van-swipe>
</template>
<script lang='ts'>
import { defineComponent, reactive } from "vue";
import { Swipe, SwipeItem, Image, Button } from 'vant';
import Quote from "~/components/quote.vue";
import Tag from "~/components/tag.vue";
import Logo from "~/components/logo.vue";
import Indicators from "~/components/indicators.vue";
import { useRouter } from "vue-router";

interface Item {
  image: string
  tags: string[]
  quote: string
  from: string
}

export default defineComponent({
  name: "opening",
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Image.name]: Image,
    [Button.name]: Button,
    Quote,
    Tag,
    Logo,
    Indicators,
  },
  setup() {
    const router = useRouter()
    const swipeItems = reactive<Item[]>([
      {
        image: "src/assets/opening/AndyWarhol.png",
        tags: ["# 1967", "# Andy Warhol"],
        quote: "V.U.将会比Beatles更有成就，受其影响的乐队将会不计其数…",
        from: "安迪 • 沃霍尔"
      },
      {
        image: "src/assets/opening/TR808.png",
        tags: ["# 808s & Heartbreak", "# Revolution"],
        quote: "Roland TR-808 重新定义了当代说唱音乐，成为说唱文化的重要组成部分。",
        from: "《The Verge》"
      },
      {
        image: "https://pic.rmb.bdstatic.com/29253aa31a314c68589f82b0d64e399b.jpeg",
        tags: ["# 音乐使人自由", "# YMO"],
        quote: "对于有崭新的创造性和自由想法的音乐，我还是非常想保持拍手称赞的态度。",
        from: "坂本龙一"
      },
      {
        image: "src/assets/opening/TOMBOY.jpeg",
        tags: ["# K-indie", "韩流来袭"],
        quote: "熬过讨厌的20岁 你看上去百无聊赖燃起的火 可不能瞬间化为乌有…",
        from: "TOMBOY - 혁오"
      }
    ])
    const pushToLogin = () => {
      router.push({ name: "login" }).catch((e) => { console.error(e) })
    }
    return {
      swipeItems,
      pushToLogin,
    }
  }
});
</script>
<style scoped lang="less">
.van-swipe {
  background-color: var(--background-color);
  .indicators {
    bottom: 2vh;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .van-swipe-item {
    display: flex;
    flex-direction: column;
    flex-shrink: inherit;
    padding: 0 5vw;
    height: 100vh;
    .van-image {
      position: relative;
      width: 90vmin;
      height: 90vmin;
      margin: 5vh 0;
      .tags {
        position: absolute;
        left: 1.5vmin;
        bottom: 1.5vmin;
        .van-tag {
          margin: 1.5vmin;
        }
      }
    }
    .quote {
      width: 80vw;
      margin: 0 0 5vh 0;
      display: block;
      color: var(--text-color);
    }
    .logo {
      position: absolute;
      height: 6vh;
      bottom: 10vh;
    }
  }
  .van-swipe-item:last-child {
    padding: 0 10vw;
    .slogn {
      font-family: "Hartwell";
      font-size: 4em;
      font-weight: bolder;
      line-height: 0.9em;
      letter-spacing: 0.006em;
      margin: 20vh 0 4vh 0;
      color: var(--text-color);
    }
    .logo {
      position: relative;
      height: 6vh;
      bottom: inherit;
    }
    .btn {
      position: absolute;
      width: max-content;
      bottom: 6vh;
      align-self: center;
      font-weight: 900;
    }
  }
}
</style>