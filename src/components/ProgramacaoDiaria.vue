<template>
  <q-page class="flex flex-center">
    <!--q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]"-->
      <q-card :class="!$q.dark.isActive?'my-lg q-pa-md q-ma-sm bg-grey-2':'my-lg q-pa-md q-ma-sm bg-grey-8'">
        <q-toolbar>
          <q-ribbon
            position="left"
            color="rgba(0,0,0,.58)"
            background-color="#c0c0c0"
            leaf-color="#a0a0a0"
            leaf-position="bottom"
            decoration="rounded-out"
          >
            <q-toolbar-title
              class="example-title"
              style="padding: 5px 20px;"
            >
              <span v-if="sCurrentDate != null" class="ellipsis">
                {{ tableTitle }} - {{ sCurrentDate }}
              </span>
              <q-separator/>
              <q-btn icon="event" rounded color="deep-orange" label="Escolher uma data" >
                <q-tooltip content-class="bg-accent">Escolher uma data para mudar a programação</q-tooltip>
                <q-popup-proxy @before-show="updateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="proxyDate">
                    <div class="row items-center justify-end q-gutter-sm">
                      <q-btn label="Cancelar" color="primary" flat v-close-popup />
                      <q-btn label="OK" color="primary" flat @click="saveDate" v-close-popup />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-btn>
             </q-toolbar-title>
          </q-ribbon>
        </q-toolbar>
        <q-card-section v-if='selected[0] != null' class="q-pb-sm">
          <q-ribbon
            position="left"
            color="rgba(0,0,0,.58)"
            background-color="red-2"
            leaf-color="primary"
            leaf-position="bottom"
            decoration="rounded-out"
          >
            <span v-if="selected[0].title != null" class="ellipsis">
                Programa Escolhido: {{ selected[0].title }}
            </span>
          </q-ribbon>
        </q-card-section>
        <q-card-section>
          <!--
                        @selected-val="GetSelected($event)"
            :selection='selection'

          -->
          <q-grid
            class='my-sticky-header-table'
            :bordered='bordered'
            :columns='columns'
            :columns_filter='columns_filter'
            :csv_download='csv_download'
            :excel_download='excel_download'
            :dense='dense'
            :file_name='file_name'
            :global_search='global_search'
            :groupby_filter='groupby_filter'
            :data='data'
            :fullscreen='fullscreen'
            :row-key='rowkey'
            :selected='selected'
            :separator='separator'
            :visible_columns='visibleColumns'
          />
            <template v-slot:header="props">
              <q-tr :props="props">
                <q-th auto-width v-for="col in props.cols"
                      :key="col.name"
                      :props="props">
                  {{ col.label }}
                </q-th>
              </q-tr>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td :key="col.name" v-for="col in props.cols"
                      :props="props">
                  {{ props.row[col.field] }}
                </q-td>
              </q-tr>
            </template>
          </q-grid>
        </q-card-section>
       </q-card>
    <!--/q-page-scroller-->
  </q-page>
</template>

<style lang="sass">
.my-sticky-dynamic
  /* height or max-height is important */
  /* width: 400px */
  /* height: 740px */

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th /* bg color is important for th; just specify one */
    background-color: #fff

  thead tr th
    position: sticky
    z-index: 1
  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
  thead tr:first-child th
    top: 0
.my-sticky-header-table
  /* height or max-height is important */
  width: 400px
  height: 740px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #c1f4cd

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px

.thead-sticky tr > *,
.tfoot-sticky tr > *
  position: sticky
  opacity: 1
  z-index: 1
  background: black
  color: white

.thead-sticky tr:last-child > *
  top: 0

.tfoot-sticky tr:first-child > *
  bottom: 0    
</style>

<script>
import { date } from 'quasar';
import Vue from 'vue';
import AxiosPlugin from 'vue-axios-cors';
import { APIService } from 'src/components/APIService';
import lodash from 'lodash';
// import { api } from 'src/boot/axios';
// import jsonFile from '/home/admlnx/Desktop/_TESTES/grpcomorlei/src/assets/json/1337.json'
import jsonFile from 'src/assets/json/2021-04-11.json';
import { COLUMNS, COLUMNS_v2, DATA } from './tableColumns';

Vue.use(AxiosPlugin);

const timeStamp = Date.now()
// const formattedString = date.formatDate(timeStamp, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
// const formattedPtBrString = date.formatDate(timeStamp, 'DD/MM/YYYY (ddd) HH:mm:ss')
const formattedPtBrString = date.formatDate(timeStamp, 'DD/MM/YYYY (ddd)')
const apiService = new APIService();
const strPage = 'Programação do Dia';

export default {
  name: 'ProgramacaoDiariaComponent',
  props: {
      tagParts: {
          type: Object,
          default: () => {
          }
      }
  },
  data () {
    return {
      timer: '',
      currentDate: new Date(),
      proxyDate: new Date(),
      nextDate: date.addToDate(new Date(), { days: 1 }),
      priorDate: date.subtractFromDate(new Date(), { days: 1 }),

      bordered: true,
      dark: true,
      dense: true,
      columns_filter: true,
      csv_download: true,
      excel_download: true,
      dialog: false,
      draggable: true,
      editMode: false,
      flat: true,
      fileNameCSV: 'grade_programacao_diaria',
      file_name: 'grade_programacao_diaria',
      filter: '',
      filterNoResultsLabel: '',
      fullscreen: true,
      grid: true,
      global_search: true,
      groupby_filter: true,
      header_filter: true,
      loading: true,
      noResultsLabel: '',
      nextPage: 2,
      objModel: {},
      pageTitle: strPage,
      pageSize: 50,
      printDialog: false,
      pagination: {
        sortBy: 'human_start_time',
        descending: false,
        // page: 1,
        rowsPerPage: 0,
        // rowsNumber: data.length
      },
      rowkey: 'media_id',
      rollsToPrint: [],
      selected: [],
      selection: 'single',
      selectionMode: 'single',
      separator: 'cell',
      square: true,
      tableTitle: 'Programação do Dia',
      visibleColumns2: [
        'human_start_time',
        'human_end_time',
        'duration_in_minutes',
        'imagem',
        'title',
        'periodicidade',
        'genero',
        'subgenero',
        'description'
      ],
      visibleColumns: [
        'human_start_time',
        'human_end_time',
        'duration_in_minutes',
        'title',
        'periodicidade'
      ],
      columns: COLUMNS,
      columns2: COLUMNS_v2,
      //data: [],
      data: jsonFile.programme.entries,
      data2: DATA,
      url: null,
    }
  },
  mounted () {
    apiService.setSearchDate(this.proxyDate);
    // apiService.setReexecution();
    // const SAVEDATA = this.data;
    // this.data = [];
    // this.data = apiService.execRequest();
  },
  computed: {
    sCurrentDate() {
      return date.formatDate(this.currentDate, 'DD/MM/YYYY (ddd)');
    }
  },
  async created() {
    /*
    apiService.setSearchDate(new Date());
    apiService.setReexecution();
    const SAVEDATA = this.data;
    this.data = [];
    this.data = apiService.execRequest();
    if (this.data.length > 0) {
      this.$q.loading.hide();
      this.$q.notify({ type: 'positive', color: 'positive', timeout: 2000, spinner: true,
        position: 'center', message: 'Carregado os dados', icon: 'report_problem'
      });    
    }
    */
    this.setIntervalTime();
  },
  methods: {
    setIntervalTime() {
      setInterval( () => this.searchCurrentTime(), 60000)
    },
    searchCurrentTime () {
      const curTime = date.addToDate(new Date(), { hours: 3 });
      const sCurrentTime = date.formatDate(curTime, 'HH:mm:ss+00:00');
      let found;
      if (this.data.length > 0) {
        for ( item in this.data ) {
          if (item.human_start_time === sCurrentTime) {
            found = item;
            console.log("Achado %s", found.human_start_time);
            break;
          }
        }
        // const found = this.data.find( item => item.human_start_time === sCurrentTime );
        if (found) {
          this.selected = found;
          this.$q.loading.hide();
          this.$q.notify({ type: 'positive', color: 'positive', timeout: 3000, spinner: true,
            position: 'center', message: `Achado ${found.human_start_time}`, icon: 'report_problem'
          });        
          console.log("Achado %s", found.human_start_time);
        }
      }
    },
    updateProxy () {
      this.proxyDate = this.currentDate;
      // console.log('methods.updateProxy -> proxyDate = %s',date.formatDate(this.currentDate, 'DD/MM/YYYY (ddd)'));
    },
    saveDate () {
      // console.log('methods.saveDate -> currentDate = %s',date.formatDate(this.proxyDate, 'DD/MM/YYYY (ddd)'));
      if (date.isBetweenDates(this.proxyDate, this.priorDate, this.nextDate, { onlyDate: true, inclusiveFrom: true, inclusiveTo: true })) {
        this.currentDate = this.proxyDate;
        apiService.setSearchDate(this.proxyDate);
        apiService.setReexecution();
        const SAVEDATA = this.data;
        this.data = [];
        this.data = apiService.execRequestService();        
      } else {
        const sPriorDate = date.formatDate(this.priorDate, 'DD/MM/YYYY (ddd)') 
        const sNextDate = date.formatDate(this.nextDate, 'DD/MM/YYYY (ddd)')
        const msg = `Data deve estar entre o dia: ${sPriorDate} e ${sNextDate}`
        console.error(msg);
        this.$q.loading.hide();
        this.$q.notify({ type: 'negative', color: 'negative', timeout: 3000, spinner: true,
          position: 'center', message: msg, icon: 'report_problem'
        });
      }
      /*
      apiService.setSearchDate(this.proxyDate);
      apiService.setReexecution();
      const SAVEDATA = this.data;
      this.data = [];
      this.data = apiService.execRequest();
      */
      // if ( this.data.length === 0 ) this.data = SAVEDATA;
      // this.currentDate = date.formatDate(this.proxyDate, '(DDD) DD/MM/YYYY THH:mm:ss');
    },
    GetSelected(Selected) {
      this.selected = Selected
    },
    showMessagePositive(message) {
      console.log(message);
      this.$q.notify({ type: 'positive', color: 'positive', timeout: 5000, spinner: true,
        position: 'center', message: message, icon: 'announcement' /*,
        actions: [
          { label: 'Confirme visualização', color: 'white', handler: () => { } }
        ]*/
      })
    },
    showMessageNegative(message) {
      console.error(message);
      this.$q.loading.hide();
      this.$q.notify({ type: 'negative', color: 'negative', timeout: 5000, spinner: true,
        position: 'center', message: message, icon: 'report_problem' /*,
        actions: [
          { label: 'Confirme visualização', color: 'white', handler: () => { } }
        ]*/
      })
    },
    showMessage(source, status, data) {
      let Msg = '';
      if(status) {
        Msg = `${source} => Carregado a Grade de Programacao com sucesso!!!`;
        this.showMessagePositive(Msg);
        console.log('%s %s', Msg, JSON.stringify(data) );
      } else {
        Msg = `${source} => Leitura da Grade de Programacao falhou!!! ${data.message}`;
        this.showMessageNegative(Msg);
      }
    },
  },
}
</script>
