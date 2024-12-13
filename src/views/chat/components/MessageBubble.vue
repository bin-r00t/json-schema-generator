<script setup>
const props = defineProps(["message", "sender", "timestamp"]);
const emits = defineEmits(["click"]); // not used for now...

const user = {
  id: true,
};
</script>

<template>
  <div
    class="message-bubble p-2"
    :class="[
      sender === user.id
        ? 'sender-me self-end bg-slate-500 text-white rounded-lg rounded-br-none'
        : 'sender-other self-start bg-slate-300 text-slate-900 rounded-lg rounded-tl-none',
    ]"
  >
    {{ message }}
  </div>
</template>
