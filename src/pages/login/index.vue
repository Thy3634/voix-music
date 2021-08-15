<template>
  <div class="w-screen max-w-screen-sm h-screen flex flex-col items-center justify-end mx-auto">
    <video
      :controls="false"
      autoplay
      muted
      loop
      class="absolute object-cover h-screen w-full max-w-screen-sm z-0"
    >
      <source src="src/assets/login/bg.webm" type="video/webm" />
    </video>
    <button
      class="w-max bg-theme text-black px-6 py-4 rounded-full z-10 flex items-center space-x-1"
      @click="phoneLogin"
    >
      <NeteaseMusicIcon />
      <span>网易云音乐账号登录</span>
    </button>
    <router-link class="z-10 mt-4 mb-8" :to="{ name: 'home' }">不登陆，随便看看</router-link>
    <div class="mb-6 z-10 text-sm text-center">
      <span class="text-gray-500">继续使用及表示同意</span>
      <a class="inline-block">《许可协议》</a>
      <a class="inline-block">《隐私保护协议》</a>
    </div>
  </div>
  <Modal v-model:open="open">
    <div v-if="false" class="flex flex-col items-center justify-center">
      <DialogTitle class="text-xl">扫码登录</DialogTitle>
      <DialogDescription class="flex w-full items-center justify-center my-2">
        <img v-if="QRimg" :src="QRimg" alt="登录二维码" class="rounded" />
        <LoadingIcon v-else name="loading" class="w-6 h-6 animate-spin" />
        <div class="text-gray-500 text-sm">使用网易云 App 扫码登录</div>
      </DialogDescription>

      <div class="mt-4 flex justify-end">
        <button
          type="button"
          class="inline-block justify-center px-4 py-2 text-sm font-medium text-yellow-300 border border-transparent"
          @click="open = false"
        >取消</button>
      </div>
    </div>
    <div v-else class="flex">
      <div>
        <div class="rounded-full bg-yellow-300 m-4 p-3">
          <LoginIcon class="w-8 h-8 text-black" />
        </div>
      </div>
      <div class="flex flex-col">
        <DialogTitle class="text-xl">手机号密码登录</DialogTitle>
        <form class="mt-2">
          <DialogDescription>
            <MaterialInput
              name="phone"
              type="tel"
              v-model:value="phoneForm.phone"
              required
              autocomplete="tel"
              autofocus
            >
              <template #label>手机号</template>
            </MaterialInput>
            <MaterialInput
              name="password"
              type="password"
              v-model:value="phoneForm.password"
              required
              autocomplete="current-password"
            >
              <template #label>密码</template>
            </MaterialInput>
          </DialogDescription>

          <div class="mt-4 flex justify-end">
            <button
              type="button"
              class="inline-block justify-center px-4 py-2 text-sm font-medium text-yellow-300 border border-transparent"
              @click="phoneLogin"
            >登录</button>
            <button
              type="button"
              class="inline-block justify-center px-4 py-2 text-sm font-medium text-yellow-300 border border-transparent"
              @click="open = false"
            >取消</button>
          </div>
        </form>
      </div>
    </div>
  </Modal>
</template>
<script lang='ts'>
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "~/stores/user";
import { QR, phone } from "~/api/login";

import { DialogTitle, DialogDescription } from "@headlessui/vue";
import Modal from "#/Modal.vue";
import MaterialInput from "#/MaterialInput.vue"
import LoadingIcon from "!/icons/solid/loading.svg?component";
import NeteaseMusicIcon from "!/icons/solid/netease-music.svg?component";
import LoginIcon from "!/icons/outline/login.svg?component"

export default defineComponent({
  name: "Login",
  components: {
    Modal,
    DialogTitle,
    DialogDescription,
    MaterialInput,
    LoadingIcon,
    NeteaseMusicIcon,
    LoginIcon
  },
  setup() {
    const open = ref(false)
    const user = useUserStore()
    const router = useRouter()
    const QRimg = ref('')

    const QRCodeLogin = async () => {
      open.value = true
      let { data: { unikey } } = await QR.key()
      QRimg.value = (await QR.image(unikey)).data.qrimg;

      (async function polling() {
        const { code, cookie } = await QR.check(unikey)
        switch (code) {
          case 800:
            // 二维码过期
            unikey = (await QR.key()).data.unikey
            QRimg.value = (await QR.image(unikey)).data.qrimg;
            break
          case 803:
            // 成功
            document.cookie = cookie
            open.value = false
            router.push({ path: "/home" })
            return
          default:
            break
        }
        if (open.value === true) {
          setTimeout(() => {
            polling()
          }, 5000)
        }
      })()
    }

    const phoneForm = reactive({
      phone: '',
      password: ''
    })
    const phoneLogin = async () => {
      open.value = true
      console.log(phone(phoneForm.phone, phoneForm.password));
    }

    return {
      open,
      QRCodeLogin,
      QRimg,
      phoneLogin,
      phoneForm,
    }
  },
});
</script>