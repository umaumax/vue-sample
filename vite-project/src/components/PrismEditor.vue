<template>
  <prism-editor class="my-editor" v-model="code" :highlight="highlighter" line-numbers></prism-editor>
</template>

<script setup>
    import
    {
        PrismEditor
    }
    from 'vue-prism-editor'
    import 'vue-prism-editor/dist/prismeditor.min.css'

    import
    {
        highlight,
        languages
    }
    from 'prismjs/components/prism-core'
    import 'prismjs/components/prism-clike'
    import 'prismjs/components/prism-bash'
    import 'prismjs/components/prism-javascript'
    import 'prismjs/components/prism-python'
    import 'prismjs/themes/prism-tomorrow.css'

    import
    {
        reactive
    }
    from "vue";

    const props = defineProps(
    {
        code:
        {
            type: String,
            default: "!CODE HERE!",
        },
        config:
        {
            default:
            {
                'language': 'bash'
            },
        },
    });

    const code = reactive(props.code)
    const config = props.config

    function highlighter(code)
    {
        return highlight(code, languages[config.language])
    }
</script>

<style>
    .my-editor {
        background: #2d2d2d;
        color: #ccc;
        font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
        font-size: 14px;
        line-height: 1.5;
        padding: 5px;
    }

    .prism-editor__textarea:focus {
        outline: none;
    }
</style>
