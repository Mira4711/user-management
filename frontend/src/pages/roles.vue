<script lang="ts" setup>
//
import type { Right, Role } from "@/interfaces/interfaces";
import { extendRoleData } from "@/utils/extend";
import { addData, deleteData, loadAllData, updateData } from "@/utils/services";

const page = "roles";
const pageContent = ref<Role[]>([]);
const rights = await loadAllData<Right[]>("rights");

const editRights = ref<string[]>([]);
const editUuid = ref();
const editName = ref<string>("");
const editFormFields = ref(true);

const headers = [{ title: "Name" }, { title: "Rechte" }, { title: "Action" }];

onMounted(async () => {
  const data = await loadAllData<Role[]>(page);
  pageContent.value = extendRoleData(data, rights);
});

const onDeleteItem = async (uuid: string) => {
  const data = await deleteData<Role[]>(page, uuid);
    if (data.length == (pageContent.value.length - 1)) pageContent.value = extendRoleData(data, rights);
};

const onEditItem = (role: Role) => {
  editFormFields.value = false;
  editUuid.value = role.uuid;
  editName.value = role.name;
  editRights.value = role.readable?.map((item) => item.uuid) || [];
};

const onSubmit = async () => {
  // ich muss das mappen, weil ich sonst nur ein Proxy(Array) bekomme
  const dbRights = editRights.value.map((item) => item);
  let data: Role[] = [];
  if (editUuid.value) {
    data = await updateData<Role[]>(page, editUuid.value, { name: editName.value, rights: dbRights })
  } else {
    data = await addData<Role[]>(page, { name: editName.value, rights: dbRights });
  }

  if (data.length > 0) pageContent.value = extendRoleData(data, rights);
  reset();
};

const reset = async () => {
  editUuid.value = undefined;
  editName.value = "";
  editRights.value = [];
  editFormFields.value = true;
}
</script>

<template>
  <div class="mt-2 pa-5">
    <h2>Rollen</h2>
    <v-data-table :headers="headers" :items="pageContent">
      <template v-slot:item="row">
        <tr>
          <td>{{ row.item.name }}</td>
          <td>
            <span v-for="r in row.item.readable" class="mr-1">{{ r.name }}</span>
          </td>
          <td>
            <v-btn fab dark small color="green" @click="onEditItem(row.item)" class="mr-2">
              <v-icon dark>mdi-pencil</v-icon>
            </v-btn>
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
        <v-text-field type="hidden" v-model="editUuid" style="display:none;"></v-text-field>
        <v-text-field :disabled="!editFormFields" v-model="editName" label="Name"></v-text-field>
        <v-checkbox v-for="r in rights" :label="r.name" :value="r.uuid" v-model="editRights"></v-checkbox>
        <v-btn class="mt-2" type="submit" block @click="onSubmit">Submit</v-btn>
        <v-btn class="mt-2" color="error" block @click="reset">Reset</v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>
