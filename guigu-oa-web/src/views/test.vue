<template>
  <div>
    <div>账号切换</div>
    <button @click="zhangsan()" type="default" size="mini">张三</button>
    <button @click="lisi()" type="default" size="mini">李四</button>
    <button @click="zzjl()" type="default" size="mini">张总经理</button>
    <button @click="admin()" type="default" size="mini">admin</button>
    <div>当前token：{{ token }}</div>
  </div>
</template>

<script>
export default {
  name: "Test",

  data() {
    return {
      token: ''
    };
  },

  created(){
    
    this.token = window.localStorage.getItem('token')
    console.log("token：///__"+this.token)
  },

  methods: {
    admin() {
      window.localStorage.setItem('token', '');
      let token = 
      'eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAKtWKi5NUrJScgwN8dANDXYNUtJRSq0oULIyNLMwN7MwMDAx1lEqLU4t8kwBikGYeYm5qUAtiSm5mXlKtQDS5H5kQgAAAA.1xvEAFF6SrM3oh798TJorHYa9EaJmLQF-QCC7J_xPY8_ei6sTP9oCwxrdqMUB7hETbgnhpCBlZSNaSZyuOnBdQ'
      window.localStorage.setItem('token', token);
      this.token = window.localStorage.getItem('token')
    },

    zhangsan() {
      window.localStorage.setItem('token', '');
      let token = 
      'eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAKtWKi5NUrJScgwN8dANDXYNUtJRSq0oULIyNLMwN7MwMDCw0FEqLU4t8kxRsjKHMPMSc1OBWqoyEvPSixPzlGoB9ZeWbUUAAAA.MMIBfu3HD4yj-ULHJqo8pTuDJJqhN1pKOPGfWxBtC6sDH_GeCRVaCyRltCk6fisTP2VOFOYUeGFJNwsMzUYgbQ'
      window.localStorage.setItem('token', token);
      this.token = window.localStorage.getItem('token')
    },

    zzjl() {
      window.localStorage.setItem('token', '');
      let token = ''
      window.localStorage.setItem('token', token);
      this.token = window.localStorage.getItem('token')
    },

    lisi() {
      window.localStorage.setItem('token', '');
      let token = 
      'eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAKtWKi5NUrJScgwN8dANDXYNUtJRSq0oULIyNLMwNzO3tDQz0FEqLU4t8kxRsjKBMPMSc1OBWnIyizOVagHHPmsBQQAAAA.Wuhrjxw5kQA5Oz-SkWVduxfUcvx6v2dL8L6WfQ0MEgT2mVMApImxkK095TY3uhfz1xW0urBJfQ9Qcdmmn0Byjg'
      window.localStorage.setItem('token', token);
      this.token = window.localStorage.getItem('token')
    }
  }
}
</script>
