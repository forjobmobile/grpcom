// eslint-disable-file no-use-before-define

import { date } from 'quasar';

export const COLUMNS = [
  {
    name: 'media_id', align: 'left', required: false, 
    field: 'media_id',
    label: 'Id'
  },
  {
    name: 'human_start_time', required: true, align: 'left', sortable: true,
    field: 'human_start_time',
    //field: row => new Date('1970-01-01T${row.human_start_time}Z'),
    //format: (val,row) => `date.formatDate(date.subtractFromDate(new Date('1970-01-01T' + ${val} + 'Z'), { hours: -3 }), 'HH:MM')`,
    // format: (val,row) => { return `new Date('1970-01-01T' + ${val} + 'Z').getTime()` },
    format: (val) => new Date(`1970-01-01T${val.slice(0,8)}`),
    label: 'Início',
    classes: 'bg-grey-2 ellipsis',
    style: 'max-width: 100px',
    headerClasses: 'bg-primary text-white',
    grouping: true, filter_type:'select'
  },
  {
    name: 'human_end_time', required: true, align: 'left', sortable: true,
    field: 'human_end_time', 
    format: (val) => new Date(`1970-01-01T${val.slice(0,8)}`),
    label: 'Término',
    classes: 'bg-grey-2 ellipsis',
    // style: 'max-width: 100px',
    headerClasses: 'bg-primary text-white',
    grouping: true, filter_type:'select'
  },
  {
    name: 'title', required: true, align: 'left', sortable: true,
    field: 'title', 
    label: 'Titulo',
    classes: 'bg-grey-2 ellipsis',
    // style: 'max-width: 100px',
    headerClasses: 'bg-secundary text-red',
    grouping: true, filter_type:'select'
  }

];


export const COLUMNS_OLD = [
    {
      name: 'media_id', align: 'left', required: false, 
      field: row => row.media_id,
      label: 'Id'
    },
    {
      name: 'human_start_time', required: true, align: 'center', sortable: true,
      field: row => row.human_start_time,
      // format: val => `date.formatDate(${val}, 'HH:mm:ss')`,
      classes: 'bg-grey-2 ellipsis',
      style: 'max-width: 100px',
      headerClasses: 'bg-primary text-white',
      // format: (val, row) => date.formatDate(val, 'HH:mm:ss'),
      // classes: 'my-special-class',
      // headerStyle: 'width: 400px',
      // headerClasses: 'my-special-class',
      label: 'Início', filter_type:'select' // , format: (val) => new Date(val).toLocaleString()
    },
    {
      name: 'human_end_time', required: true, align: 'center', sortable: true,
      field: row => row.human_end_time, 
      // format: val => `date.formatDate(${val}, 'HH:mm:ss')`,
      classes: 'bg-grey-2 ellipsis',
      style: 'max-width: 100px',
      headerClasses: 'bg-primary text-white',
      label: 'Término', filter_type:'select'
      // classes: 'bg-blue-2 ellipsis', headerClasses: 'bg-primary text-white'  // , format: (val) => new Date(val).toLocaleString()
    },
    {
      name: 'duration_in_minutes', required: true, align: 'center', sortable: true,
      field: row => row.duration_in_minutes, 
      classes: 'bg-grey-2 ellipsis',
      style: 'max-width: 100px',
      headerClasses: 'bg-red text-yellow',
      label: 'Duração (min.)', grouping: true, filter_type:'select'
    },
    {
      name: 'imagem', required: true, align: 'center',
      field: row => row.custom_info.Graficos.ImagemURL, 
      classes: 'bg-grey-2 ellipsis',
      style: 'max-width: 128px',
      headerClasses: 'bg-red text-yellow',
      label: 'Imagem'
    },
    {
      name: 'title', required: true, align: 'left', sortable: true,
      field: row => row.title, 
      classes: 'bg-grey-2 ellipsis',
      style: 'max-width: 150px',
      headerClasses: 'bg-red text-yellow',
      label: 'Titulo', grouping: true, filter_type:'select'
    },
    {
      name: 'periodicidade', required: true, align: 'center', sortable: true,
      field: row => row.custom_info.Periodicidade, 
      classes: 'bg-grey-2 ellipsis',
      style: 'max-width: 100px',
      headerClasses: 'bg-red text-yellow',
      label: 'Periodicidade', grouping: true, filter_type:'select'
    },
    {
      name: 'genero', required: false, align: 'center', sortable: true,
      field: row => row.custom_info.Genero.Descricao, 
      // format: val => `${val}`,
      classes: 'bg-grey-2 ellipsis',
      style: 'max-width: 150px',
      headerClasses: 'bg-red text-yellow',
      label: 'Gênero', grouping: true, filter_type:'select'
    },
    {
      name: 'subgenero', required: false, align: 'center', sortable: true,
      field: row => row.custom_info.Subgenero.Descricao, 
      // format: val => `${val}`,
      classes: 'bg-grey-2 ellipsis',
      style: 'max-width: 150px',
      headerClasses: 'bg-red text-yellow',
      label: 'SubGênero', grouping: true, filter_type:'select'
    },
    {
      name: 'description', required: true, align: 'left', sortable: true,
      field: row => row.description, 
      classes: 'bg-grey-2 ellipsis',
      style: 'max-width: 150px',
      headerClasses: 'bg-red text-yellow',
      label: 'Descrição', grouping: false, filter_type:'select'
    }
  ];
  
  export const COLUMNS_v2 =  [
    {
        name: 'name',
        required: true,
        label: 'Dessert (100g serving)',
        align: 'left',
        field: 'name',
        sortable: true,
        classes: 'bg-blue-2 ellipsis',
        style: 'max-width: 100px',
        headerClasses: 'bg-primary text-white',
        filter_type:'select', grouping:true
    },
    {name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true},
    {name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true},
    {name: 'carbs', label: 'Carbs (g)', field: 'carbs'},
    {name: 'protein', label: 'Protein (g)', field: 'protein'},
    {name: 'sodium', label: 'Sodium (mg)', field: 'sodium'},
    {
        name: 'calcium',
        label: 'Calcium (%)',
        field: 'calcium',
        sortable: true,
        sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
    },
    {
        name: 'iron',
        label: 'Iron (%)',
        field: 'iron',
        sortable: true,
        sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
    }
  ];
  
  export const DATA = [
    {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        sodium: 87,
        calcium: '14%',
        iron: '1%'
    },
    {
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        sodium: 129,
        calcium: '8%',
        iron: '1%'
    },
    {
        name: 'Eclair',
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        sodium: 337,
        calcium: '6%',
        iron: '7%'
    },
    {
        name: 'Cupcake',
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        sodium: 413,
        calcium: '3%',
        iron: '8%'
    },
    {
        name: 'Gingerbread',
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        sodium: 327,
        calcium: '7%',
        iron: '16%'
    },
    {
        name: 'Jelly bean',
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
        sodium: 50,
        calcium: '0%',
        iron: '0%'
    },
    {
        name: 'Lollipop',
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        sodium: 38,
        calcium: '0%',
        iron: '2%'
    },
    {
        name: 'Honeycomb',
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        sodium: 562,
        calcium: '0%',
        iron: '45%'
    },
    {
        name: 'Donut',
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        sodium: 326,
        calcium: '2%',
        iron: '22%'
    },
    {
        name: 'KitKat',
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        sodium: 54,
        calcium: '12%',
        iron: '6%'
    }
];
  