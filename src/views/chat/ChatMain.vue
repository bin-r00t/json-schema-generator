<script setup>
import ChatHeader from "./components/ChatHeader.vue";
import MessageBubble from "./components/MessageBubble.vue";

const handleHeaderClick = (side) => {
  console.log("click side", side);
};
</script>

<template>
  <div class="chat-main h-screen flex flex-col bg-slate-50">
    <ChatHeader @click="handleHeaderClick" />
    <div class="main flex-1 overflow-y-auto">
      <div class="message-container flex flex-col gap-3 p-3">
        <MessageBubble
          v-for="n in 8"
          message="hello from there..."
          :sender="true"
        />
        <MessageBubble
          v-for="n in 10"
          message="hello from thesdfasdfre..."
          :sender="false"
        />
      </div>
    </div>
    <div class="footer bg-black">fdas</div>
  </div>
</template>
