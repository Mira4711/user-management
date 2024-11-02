<script lang="ts" setup>
//
import type { Right } from "@/interfaces/interfaces";
import { addData, deleteData, loadAllData } from "@/utils/services";

const page = "rights";
const pageContent = ref<Right[]>([]);

const editName = ref<string>("");

const headers = [{ title: "Name", }, { title: "Action" }];

onMounted(async () => {
  pageContent.value = await loadAllData<Right[]>(page);
});

const onDeleteItem = async (uuid: string) => {
  const data = await deleteData<Right[]>(page, uuid);
  if (data.length == (pageContent.value.length - 1)) pageContent.value = data;
};

const onAddSubmit = async () => {
  const data = await addData<Right[]>(page, { name: editName.value });
  if (data.length > 0) pageContent.value = data;
  editName.value = "";
};
</script>

<template>
  <div class="mt-2 pa-5">
    <h2>Rechte</h2>
    <v-data-table :headers="headers" :items="pageContent">
      <template v-slot:item="row">
        <tr>
          <td>{{ row.item.name }}</td>
          <td>
            <v-btn fab dark small color="red" @click="onDeleteItem(row.item.uuid)">
              <v-icon dark>mdi-close</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
    <v-divider class="my-15" />
    <v-sheet class="mx-auto" width="500">
      <v-form @submit.prevent>
        <v-text-field v-model="editName" label="Name"></v-text-field>
        <v-btn class="mt-2" type="submit" block v-on:click="onAddSubmit">Submit</v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>
