<template>
    <div id="problems">
        <div class="sigo_container">
            <problemlist></problemlist>

        </div>

    </div>
</template>

<script>
import problemlist from './problemlist.vue';

export default {
  name: 'index',
  components: {
    problemlist,
  },
  data() {
    return {

    };
  },
  created() {
    if (this.$cookie.get('userToken') == null) {
      alert('로그인 해주세요');
      location.href = '/';
    }
  },
};

</script>
<style src="../../assets/css/problems.css" scoped></style>
