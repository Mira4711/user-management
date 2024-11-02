<script lang="ts" setup>
//
import type { Role, User } from "@/interfaces/interfaces";
import { addData, deleteData, loadAllData, updateData } from "@/utils/services";
import { extendUserData } from "@/utils/extend";

const page = "users";
const pageContent = ref<User[]>([]);
const roles = await loadAllData<Role[]>("roles");

const editRoles = ref<string[]>([]);
const editUuid = ref();
const editFName = ref();
const editName = ref();
const editMail = ref();
const editPhone = ref();
const editFormFields = ref(true);

const headers = [{ title: "Vorname" }, { title: "Nachname" }, { title: "E-Mail" }, { title: "Telefon" }, { title: "Rolle" }, { title: "Action" }];

onMounted(async () => {
  const data = await loadAllData<User[]>(page);
  pageContent.value = extendUserData(data, roles);
});

const onDeleteItem = async (uuid: string) => {
  const data = await deleteData<User[]>(page, uuid);
    if (data.length == (pageContent.value.length - 1)) pageContent.value = extendUserData(data, roles);
};

const onEditItem = (user: User) => {
  editFormFields.value = false;
  editUuid.value = user.uuid;
  editFName.value = user.fname;
  editName.value = user.name;
  editMail.value = user.mail;
  editPhone.value = user.phone;
  editRoles.value = user.readable?.map((item) => item.uuid) || [];
};

const onSubmit = async () => {
  // ich muss das mappen, weil ich sonst nur ein Proxy(Array) bekomme
  const rolesDB = editRoles.value.map((item) => item);
  let data: User[] = [];
  const json = {
    fname: editFName.value,
    name: editName.value,
    mail: editMail.value,
    phone: editPhone.value,
    roles: rolesDB
  }
  if (editUuid.value) {
    data = await updateData<User[]>(page, editUuid.value, json);
  } else {
    data = await addData<User[]>(page, json);
  }
  if (data.length > 0) pageContent.value = extendUserData(data, roles);
  reset();
};

const reset = async () => {
  editUuid.value = undefined;
  editFName.value = undefined;
  editName.value = undefined;
  editMail.value = undefined;
  editPhone.value = undefined;
  editRoles.value = [];
  editFormFields.value = true;
}
</script>

<template>
  <div class="mt-2 pa-5">
    <h2>Benutzer</h2>
    <v-data-table :headers="headers" :items="pageContent">
      <template v-slot:item="row">
        <tr>
          <td>{{ row.item.fname }}</td>
          <td>{{ row.item.name }}</td>
          <td>{{ row.item.mail }}</td>
          <td>{{ row.item.phone }}</td>
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
        <v-text-field :disabled="!editFormFields" v-model="editFName" label="Vorname"></v-text-field>
        <v-text-field :disabled="!editFormFields" v-model="editName" label="Name"></v-text-field>
        <v-text-field :disabled="!editFormFields" type="email" v-model="editMail" label="E-Mail"></v-text-field>
        <v-text-field :disabled="!editFormFields" type="tel" v-model="editPhone" label="Telefon"></v-text-field>
        <v-checkbox v-for="r in roles" :label="r.name" :value="r.uuid" v-model="editRoles"></v-checkbox>
        <v-btn class="mt-2" type="submit" block @click="onSubmit">Submit</v-btn>
        <v-btn class="mt-2" color="error" block @click="reset">Reset</v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>
