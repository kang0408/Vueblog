<template>
  <div class="hello">

  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {

    }
  },
  mounted() {
    var self = this
    jQuery.ajax({
      type: 'GET',
      url: self.$commonConfig+"/net/home/visit",
      success: function(data) {
        console.log(data)
      },
      error: (error) => {
      }
    })
    jQuery.ajax({
      type: 'GET',
      url: self.$commonConfig+"/net/home/list",
      success: function(data) {
        console.log(data)
      },
      error: (error) => {
      }
    })
  },
  methods:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
