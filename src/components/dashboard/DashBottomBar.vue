<template>
  <q-bar class="q-py-sm q-px-md row">
    <div
      class="col">
      <img src="statics/icons/logo_smi.svg" style="height: 28px;"/>
    </div>
    <div
      id="alerts"
      class="col text-center">
      {{ alerts }} ocorrências em andamento
    </div>
    <div
      id="datetime"
      class="col text-right">
      {{ date }}
    </div>
  </q-bar>
</template>

<script>
export default {
  name: 'DashBottomBar',

  data () {
    return {
    }
  },

  props: {
    alerts: {
      type: Number,
      required: true
    }
  },

  computed: {
    date () {
      let a = new Date()
      return a.toLocaleDateString('pt-BR')
    }
  }

}
</script>

<style lang="scss" scoped>
  .q-bar {
    background-color: #00080f;
    color: white;
  }

</style>
