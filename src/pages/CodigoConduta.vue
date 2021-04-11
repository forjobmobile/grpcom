<template>
  <q-page padding>
    <div class="container q-pa-lg">
      <q-pdfviewer
        v-model="show"
        :src="src"
        type="html5"
        content-class="fit container"
        inner-content-class="fit container"
      />
    </div>    
    <!--
src="https://s3.amazonaws.com/grpcom-portal/wp-content/uploads/2019/06/03090637/CODIGO-DE-CONDUTA-2019-05-281.pdf"      
    -->
    <!--q-pdfviewer
      v-model="visible"
      src="assets/pdf/CODIGO-DE-CONDUTA-2019-05-281.pdf"
      type="html5"
    /-->
  </q-page>
</template>

<style>
.container {
  max-width: 50%;
  max-height: 70%;
  min-width: 400px;
  min-height: 600px;
  width: 100%;
  height: 100%;
}
</style>

<script>
export default {
  name: 'CodigoCondutaPage',

  props: {
    src: { 
      type: String,
      default: 'assets/pdf/CODIGO-DE-CONDUTA-2019-05-281.pdf'
      // default: 'https://s3.amazonaws.com/grpcom-portal/wp-content/uploads/2019/06/03090637/CODIGO-DE-CONDUTA-2019-05-281.pdf'
    }
  },

  data () {
    return {
      show: true
    }
  }
}
</script>
