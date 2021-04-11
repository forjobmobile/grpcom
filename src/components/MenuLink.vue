<template>
  <q-expansion-item>
    <template v-slot:header>
      <q-item-section v-if="group_icon" avatar>
        <q-avatar :icon="group_icon" :color="group_color" :text-color="group_text_color" />
      </q-item-section>

      <q-item-section v-if="group_img" avatar>
        <q-avatar>
          <img :src="group_img">
        </q-avatar>
      </q-item-section>

      <q-item-section>
        {{ group_title }}
      </q-item-section>

      <q-item-section side>
        <EssentialLink
          v-for="link in principalLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-item-section>
    </template>
  </q-expansion-item>

  <!--q-item
    clickable
    tag="a"
    target="_blank"
    :href="link"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item-->
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { LinksRedesSociais } from 'components/linksRedesSociais';

export default defineComponent({
  name: 'MenuLink',
  props: {
    group_title: {
      type: String,
      required: true
    },

    group_color: {
      type: String,
      required: true
    },

    group_icon: {
      type: String,
      required: true
    },

    group_img: {
      type: String,
      required: true
    },    

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
    }
  },
  setup() {
    const linksMenu = ref(LinksRedesSociais);

    return {linksMenu}
  }
});
</script>
