import Vue from 'vue'
import Vuex from 'vuex'
import { getDateNowSelectFormat } from '../utils/transductorStatus'
// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: {
      openMap: false,
      chartOptions: {
        phase_a: [],
        phase_b: [],
        phase_c: [],
        unit: '',
        dimension: '',
        status: false,
        graphType: ''
      },
      filterOptions: {
        dimension: 'Tensão',
        vision: '',
        startDate: getDateNowSelectFormat(1),
        endDate: getDateNowSelectFormat()
      }
    },
    mutations: {
      changeMapStatus (state) {
        state.openMap = !state.openMap
      },
      updateChartPhase (state, options) {
        state.chartOptions.phase_a = options.phase_a
        state.chartOptions.phase_b = options.phase_b
        state.chartOptions.phase_c = options.phase_c
        state.chartOptions.unit = options.unit
        state.chartOptions.dimension = options.dimension
        state.chartOptions.status = options.status
        state.chartOptions.graphType = options.graphType
      },
      updateFilter (state, filter) {
        state.filterOptions.dimension = filter.dimension
        state.filterOptions.vision = filter.vision
        state.filterOptions.startDate = filter.startDate
        state.filterOptions.endDate = filter.endDate
      }
    },
    getters: {
      openMap: state => state.openMap,
      chartOptions: state => state.chartOptions,
      filterOptions: state => state.filterOptions
    },

    modules: {
      // example
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
