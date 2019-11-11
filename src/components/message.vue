<template>
  <div class="m_msg">
      test message template---{{id}}
  </div>
</template>

<script>
export default {
  data: function(){
    return {
      id: null
    }
  },
  created:function(){
    this.id = $('#h_id').val()
  }
    // mounted: function(){
    //     $('.m_msg').parent().parent().parent().css('width','80%');
    // },
    // beforeDestroy: function(){
    //     $('.m_msg').css('width','420px');
    // }
}
</script>

<style>
    
</style>