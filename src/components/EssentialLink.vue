<template>
  <q-item
    clickable
    tag="a"
    target="_blank"
    :href="link"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :class="iconset" :name="icon" />
      <!--span :class="iconset">{{ icon }}</span-->
    </q-item-section>

    <q-item-section
      v-if="img"
      avatar
    >
      <q-img :src="img"/>
    </q-item-section>    

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<style>
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
</style>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
// import { matMenu } from '@quasar/extras/material-icons';
// import { bsMenu } from '@quasar/extras/bootstrap-icons';
// import { mdiAbTesting } from '@quasar/extras/mdi-v5';

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    },

    iconset: {
      type: String,
      default: 'material-icons'
    },    

    img: {
      type: String,
      default: ''
    }
  }
});
</script>
