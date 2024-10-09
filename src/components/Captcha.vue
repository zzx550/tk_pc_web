<template>
  <div class="captcha-container">
    <div class="d_input">
      <div class="d_title">验证码</div>
      <div class="d_content">
        <input
          maxlength="4"
          v-model="userInput"
          :placeholder="'请输入验证码'"
          type="text"
        />
        <canvas
          ref="captchaCanvas"
          :width="width"
          :height="height"
          @click="refreshCaptcha"
        ></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { message } from "ant-design-vue";

export default {
  name: "Captcha",
  props: {
    width: {
      type: Number,
      default: 100,
    },
    height: {
      type: Number,
      default: 46,
    },
    length: {
      type: Number,
      default: 4,
    },
  },
  setup(props, { emit }) {
    const captchaCanvas = ref(null);
    const captchaText = ref("");
    const userInput = ref("");
    const isValid = ref(false);

    const generateRandomText = (length) => {
      const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
      let text = "";
      for (let i = 0; i < length; i++) {
        text += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return text;
    };

    const drawCaptcha = () => {
      const canvas = captchaCanvas.value;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, props.width, props.height);

        // 背景
        ctx.fillStyle = "#f0f0f0";
        ctx.fillRect(0, 0, props.width, props.height);

        // 随机干扰线
        for (let i = 0; i < 5; i++) {
          ctx.strokeStyle = getRandomColor();
          ctx.beginPath();
          ctx.moveTo(Math.random() * props.width, Math.random() * props.height);
          ctx.lineTo(Math.random() * props.width, Math.random() * props.height);
          ctx.stroke();
        }

        // 随机干扰点
        for (let i = 0; i < 30; i++) {
          ctx.fillStyle = getRandomColor();
          ctx.beginPath();
          ctx.arc(
            Math.random() * props.width,
            Math.random() * props.height,
            1,
            0,
            2 * Math.PI
          );
          ctx.fill();
        }

        // 绘制文本
        captchaText.value = generateRandomText(props.length);
        ctx.font = `${props.height / 2}px Arial`;
        ctx.fillStyle = "#333";
        ctx.textBaseline = "middle";
        const textWidth = ctx.measureText(captchaText.value).width;
        const startX = (props.width - textWidth) / 2;
        const startY = props.height / 2;

        // 为每个字符添加随机旋转
        for (let i = 0; i < captchaText.value.length; i++) {
          const char = captchaText.value[i];
          ctx.save();
          const x =
            startX + ctx.measureText(captchaText.value.substring(0, i)).width;
          const y = startY;
          const angle = (Math.random() - 0.5) * (Math.PI / 4); // 随机旋转±22.5度
          ctx.translate(x, y);
          ctx.rotate(angle);
          ctx.fillText(char, 0, 0);
          ctx.restore();
        }
      }
    };

    const getRandomColor = () => {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    const refreshCaptcha = () => {
      drawCaptcha();
      userInput.value = "";
      emit("captchaRefreshed");
    };

    const validateCaptcha = () => {
      if (userInput.value.toLowerCase() === captchaText.value.toLowerCase()) {
        isValid.value = true;
        emit("captchaValid", true);
      } else {
        message.error("验证码错误，请重试~");
        isValid.value = false;
        emit("captchaValid", false);
        setTimeout(() => {
          refreshCaptcha();
        }, 1000);
      }
    };

    onMounted(() => {
      drawCaptcha();
    });

    watch(userInput, (newVal) => {
      if (newVal.length >= 4) {
        validateCaptcha();
      }
    });

    return {
      captchaCanvas,
      userInput,
      isValid,
      refreshCaptcha,
      validateCaptcha,
    };
  },
};
</script>
<style scoped lang="less">
.captcha-container {
  .d_input {
    display: flex;
    flex-direction: column;
    .d_title {
      font-size: 20px;
      font-weight: 500;
    }
    .d_content {
      flex: 1;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin-top: 15px;

      input {
        width: 336px;
        height: 46px;
        border-radius: 4px;
        background-color: #f6f7f9;
        font-size: 14px;
        margin-right: 15px;
      }
    }
  }
}
</style>
