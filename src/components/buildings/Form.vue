<template>
  <div class="row justify-center">
    <div class="col-md-4 col-lg-5 q-pa-md">
      <q-form
        class="q-gutter-md"
        @validation-success="send">
        <h3 class="text-secondary">
          Novo edifício
        </h3>
        <span
          v-if="response"
          :class="'text-capitalize text-' + messageType">
          {{ message }}
        </span>
        <q-input
          outlined
          name="buildingName"
          v-model="buildingName"
          label="Nome do edifício"
          :rules="[ val => val.length > 0 && val.length <= 50 || 'Esse campo deve conter entre 1 e 50 caracteres' ]"/>
        <q-input
          outlined
          name="buildingAcronym"
          v-model="buildingAcronym"
          label="Abreviação/sigla"
          :rules="[ val =>  val.length <= 50 || 'Esse campo deve conter entre 1 e 50 caracteres' ]"/>
        <q-input
          outlined
          name="buildingPhone"
          v-model="buildingPhone"
          type="tel"
          label="Telefone de contato"
          mask="(##) ####-####"
          :rules="[ val => val.length > 0 && val.length == 14 || 'Esse campo deve conter um telefone fixo válido!' ]"/>
        <q-select
          outlined
          v-model="campi"
          :options="availableCampi"
          option-label="name"
          label="Campus"
          :rules="[ val => val != '' || 'Esse campo deve ser preenchido!' ]"/>

        <q-btn
          size="1rem"
          label="Enviar"
          color="primary"
          type="submit"
          :loading="loading"/>
        <q-btn
          size="1rem"
          @click="reset_fields()"
          label="Cancelar"
          color="negative"
          type="reset"/>
      </q-form>
    </div>
  </div>
</template>

<script>
import HTTP from '../../services/masterApi/http-common'

export default {
  data () {
    return {
      buildingName: '',
      buildingAcronym: '',
      buildingPhone: '',
      campi: '',
      availableCampi: [],

      message: '',
      messageType: '',
      response: false,
      loading: false
    }
  },

  methods: {
    send () {
      const masterAddress = 'http://192.168.100.24:8001' || process.env.MASTER_URL
      const data = {
        name: this.buildingName,
        acronym: this.buildingAcronym,
        phone: this.buildingPhone,
        campus_id: this.campi
      }

      console.log(data)
      this.loading = true

      HTTP
        .post(`${masterAddress}/buildings/`, data)
        .then((res) => {
          this.loading = false
          console.log(res)
          this.messageType = 'success'
          this.message = 'Criado com sucesso!'
        })
        .catch((err) => {
          this.loading = false
          console.error(err)
          this.messageType = 'negative'
          this.message = err.message
        })
    },
    reset_fields () {
      this.buildingName = ''
      this.buildingAcronym = ''
      this.buildingPhone = ''
    }
  },

  created () {
    const masterUrl = '' || process.env.MASTER_URL
    HTTP
      .get(`${masterUrl}/campi/`)
      .then((res) => {
        // console.log(res.data)
        this.availableCampi = res.data
        console.log(this.availableCampi)
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
</script>

<style>
</style>
