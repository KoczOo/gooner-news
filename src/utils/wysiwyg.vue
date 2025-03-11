<script lang="ts" setup>
import {Editor, EditorContent} from "@tiptap/vue-3";
import StarterKit from '@tiptap/starter-kit'
import {watch} from "vue";

const emit = defineEmits(['update'])
const props = defineProps(['content'])
const editor = new Editor({
  content: '',
  extensions: [
    StarterKit
  ],
  onUpdate: () => {
    emit('update', editor.getHTML())
  }
});

watch(() => props.content, () => {
  loadContent();
})

function loadContent() {
  if (props.content) {
    editor.commands.setContent(props.content);
  }
}

</script>

<template>
  <div class="awesome_editor">
    <div v-if="editor" class="btn_container">
            <span
                :class="{ 'is-active': editor.isActive('bold') }"
                @click="editor.chain().focus().toggleBold().run()"
            >
                Bold
            </span>
      <span
          :class="{ 'is-active': editor.isActive('italic') }"
          @click="editor.chain().focus().toggleItalic().run()"
      >
                Italic
            </span>
      <span
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      >
                H1
            </span>
      <span
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      >
                H2
            </span>
      <span
          :class="{ 'is-active': editor.isActive('bulletList') }"
          @click="editor.chain().focus().toggleBulletList().run()"
      >
                Bullet List
            </span>

    </div>
    <EditorContent :editor="editor"/>
  </div>
</template>

<style scoped>

</style>
