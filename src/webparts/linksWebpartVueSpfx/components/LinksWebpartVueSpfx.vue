<template>
    <div>
      <h1>LENKER</h1>
      <input type="text" v-model="search" placeholder="SEARCH"/>
      <ul>
        <li v-for="l in linksShown" :key="l.Title"><a :href="l.url.Url" target="_blank">{{l.Title}}</a></li>
      </ul>
    </div>
</template>

<script>
import { SPHttpClient } from '@microsoft/sp-http';

export default {
  data(){
    return {
      search: '',
      links: []
    }
  },
  computed: {
    linksShown: function(){
      return this.links.sort((a,b) => a.Title.localeCompare(b.Title)).filter(l => l.Title.toLowerCase().includes(this.search.toLowerCase()));
    }
  },
  props: {
    description: String,
    list: String,
    context: Object
  },
  mounted: async function(){
    const response = await this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists/GetByTitle('` + this.list + `')/items`, SPHttpClient.configurations.v1);
    const data = await response.json();
    this.links = data.value;
  }
}
</script>

<style scoped>
div{
  font-family: sans-serif;
  background-color: #5b7c94;
  box-shadow: #9cb8cc 5px 7px 5px;
}

h1{
  text-align: center;
  padding-top: 15px;
  color: #fff;
}

ul{
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: auto auto auto;
  background: hsl(206, 23%, 34%);
  padding: 50px;
  margin: 0;
  grid-gap: 30px;
}

a{
  outline: none;
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 400;
  text-shadow: 0 0 1px rgba(255,255,255,0.3);
  font-size: 1.35em;
}

a::before{
  margin-right: 10px;
  content: '[';
  transform: translateX(20px);
}

a::after{
  margin-left: 10px;
  content: ']';
  transform: translateX(-20px);
}

a::before,
a::after{
  opacity: 0;
  display: inline-block;
  transition: transform 0.3s, opacity 0.2s;
}

a:hover::before,
a:hover::after{
  opacity: 1;
  transform: translateX(0px);
}

input[type=text]{
  background-color: #FFA000;
  font-size: 1.2em;
  width:100%;
  outline:none;
  border: none;
  padding:8px 65px;
  box-sizing:border-box;
  transition:.3s;
}

input[type=text]:focus{
  border-color:#FFC107;
  box-shadow:0 0 8px 0 #FFC107;
}
</style>


