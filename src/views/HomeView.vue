

<template>
  <main>
    <div id="game" ref="gameContainer"></div>

  </main>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import game from '../game';

const gameContainer = ref(null);
onMounted(() => {
  gameContainer.value.appendChild(game.canvas);

});

</script>
