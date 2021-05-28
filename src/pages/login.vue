<template>
  <video
    :controls="false"
    :autoplay="true"
    muted
    :loop="true"
    class="video"
  >
    <source
      src="src/assets/login.webm"
      type="video/webm"
    />
  </video>
  <div id="login">

    <van-button
      class="btn"
      round
      color="var(--theme-color)"
      style="color: black;"
      icon-prefix="iconfont"
      icon="netease"
      @click="isShow=true"
    >
      网易云账号登录
    </van-button>
    <router-link
      class="see"
      :to="{name: 'home'}"
    >
      不登陆，随便看看
    </router-link>
    <p class="protocol">
      <span>继续使用即代表同意</span>
      <span class="protocol-link">《许可协议》</span>
      <span class="protocol-link">《隐私保护协议》</span>
    </p>
  </div>

  <van-popup
    v-model:show="isShow"
    teleport="#app"
    id="popup"
    style="background-color: var(--second-background-color);"
  >
    <van-form
      @submit="submit"
      label-width="3em"
    >
      <van-field
        v-model="form.phone"
        type="digit"
        name="手机号"
        label="手机号"
        autocomplete="tel-national"
        clearable
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-model="form.password"
        type="password"
        name="密码"
        label="密码"
        autocomplete="off"
        clearable
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-button
        round
        color="var(--theme-color)"
        style="color: black;"
        class="btn"
        native-type="submit"
      >
        提交
      </van-button>
    </van-form>
  </van-popup>
</template>
<script lang='ts'>
import { defineComponent, reactive, ref } from "vue";
import { Button, Popup, Form, Field } from "vant";
import { useRouter } from "vue-router";
import { useUserStore } from "~/stores/user";


export default defineComponent({
  name: "login",
  components: {
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Form.name]: Form,
    [Field.name]: Field,
  },
  setup() {
    const router = useRouter()
    const userStore = useUserStore()

    const form = reactive({
      phone: "",
      password: ""
    })
    const isShow = ref(false)

    const submit = async () => {
      if (await userStore.phoneLogin(form)) {
        router.push({ name: "home" }).catch((e) => {
          console.error(`Being outed to home: ${e}`)
        })
      }
    }
    return {
      isShow,
      form,
      submit,
    }
  }
});
</script>
<style scoped lang="less">
.video {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
}
#login {
  position: absolute;
  top: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  .btn {
    order: 3;
    width: max-content;
    align-self: center;
    font-weight: 900;
    padding: 3vh 8vw;
  }
  .see {
    order: 2;
    margin: 2.6vh 0;
    color: var(--text-color);
  }
  .protocol {
    order: 1;
    color: var(--second-text-color);
    font-size: 0.6em;
    margin: 1.6vh 0;
    .protocol-link {
      color: var(--text-color);
    }
  }
}
#popup {
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    div.van-field {
      background: inherit;
    }
    :deep(input) {
      border-radius: 1vmin;
      background-color: var(--background-color);
      color: var(--text-color);
    }
  }
  button {
    margin: 1vh 0;
  }
}
</style>