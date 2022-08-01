<template>
    <div class="wrapper">
        <img class="wrapper__img" src="../../assets/user.png" />
        <div class="wrapper__input">
            <input class="wrapper__input__content" placeholder="请输入用户名" v-model="username"/>
        </div>
        <div class="wrapper__input">
            <input class="wrapper__input__content" type="password" placeholder="请输入密码" v-model="password"/>
        </div>
        <div class="wrapper__input">
            <input class="wrapper__input__content" type="password" placeholder="确认密码" v-model="ensurement"/>
        </div>
        <div class="wrapper__login-button" @click="handleRegister">注册</div>
        <div class="wrapper__login-link"  @click="handleLoginClick">已有账号去登录</div>
        <toast-cpn v-if="show" :message="toastMessage"/>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import ToastCpn, { useToastEffect } from '../../components/ToastCpn.vue'

const useRegisterEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({ username: '', password: '', ensurement: '' })
  const handleRegister = async () => {
    try {
      const { username, password, ensurement } = data
      if (!username) {
        showToast('请输入用户名')
        return
      } else if (!password || !ensurement) {
        showToast('请输入密码')
      } else if (password !== ensurement) {
        showToast('两次密码输入不一致！')
      }
      const result = await post('/api/user/register', {
        username: data.username,
        password: data.password
      })
      if (result?.errno === 0) {
        router.push({ name: 'LoginView' })
      } else {
        showToast('注册失败')
      }
    } catch (e) {
      showToast('请求失败')
    }
  }
  const { username, password, ensurement } = toRefs(data)
  return { handleRegister, username, password, ensurement }
}

export default {
  name: 'RegisterView',
  components: { ToastCpn },
  setup () {
    const router = useRouter()
    const { show, toastMessage, showToast } = useToastEffect()
    const { handleRegister, username, password, ensurement } = useRegisterEffect(showToast)
    const handleLoginClick = () => {
      router.push({ name: 'LoginView' })
    }
    return { handleLoginClick, handleRegister, username, password, ensurement, show, toastMessage }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);

    &__img {
        display: block;
        margin: 0 auto 0.4rem;
        width: 0.66rem;
        height: 0.66rem;
    }

    &__input {
        box-sizing: border-box;
        margin: 0 0.4rem 0.16rem 0.4rem;
        padding: 0 0.16rem;
        width: 2.95rem;
        height: 0.48rem;
        background: #f9f9f9;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 6px;
        border-radius: 6px;

        &__content {
            border: none;
            outline: none;
            width: 100%;
            line-height: 0.48rem;
            background: none;

            &::placeholder {
                color: #777;
                font-size: 0.16rem;
            }
        }
    }

    &__login-button {
        text-align: center;
        line-height: 0.48rem;
        margin: 0.32rem auto 0.2rem;
        width: 2.95rem;
        height: 0.48rem;
        background: #0091ff;
        box-shadow: 0 4px 8px 0 rgba(0, 145, 255, 0.32);
        border-radius: 4px;
        border-radius: 4px;
        font-size: 0.16rem;
        color: #ffffff;
    }

    &__login-link {
        text-align: center;
        font-size: 0.14rem;
        color: #777;
    }
}
</style>
