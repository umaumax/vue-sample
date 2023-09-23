<template>
  <div style="text-align: left">
    <label>SearchBy:</label><input v-model="searchTerm" />
  </div>
  <table-lite
    :title="'Sample Table'"
    :is-static-mode="true"
    :is-fixed-first-column="true"
    :is-vertical-highlight="true"
    :columns="table.columns"
    :rows="table.rows"
    :total="table.totalRecordCount"
    :sortable="table.sortable"
  ></table-lite>
</template>

<script>
import { defineComponent, reactive, ref, computed } from "vue";
import TableLite from 'vue3-table-lite'
import { state } from "@/web-socket-app";

export default defineComponent({
  name: "App",
  components: { TableLite },
  setup() {
    const searchTerm = ref("");

    const data = state.data

    const table = reactive({
      columns: state.columns,
      rows: computed(() => {
        const keyword = searchTerm.value.toLowerCase();
        return data.filter(
          (x) => {
            for (const [key, value] of Object.entries(x)) {
              if (String(value).toLowerCase().includes(keyword)) { return true; }
            }
            return false
          }
        );
      }),
      totalRecordCount: computed(() => {
        return table.rows.length;
      }),
      sortable: {
        order: "id",
        sort: "asc",
      },
    });

    return {
      searchTerm,
      table,
    };
  },
});
</script>
