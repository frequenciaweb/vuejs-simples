
Vue.component('componente-teste', {
    data() {
        return {
            cep: ''
        }
      },
    methods: {

        criarSaida(identificador,valor){
          var html = `
          <div class="row">
            <div class='form-group'>
                <label>${identificador}</label>
                <input class='form-control' disabled="true" value='${valor}' type="text" />
            </div>
          </div>
          `; 
        
          var div = document.createElement("div");
          div.innerHTML = html;

          document.getElementById("resposta").appendChild(div);
          
        },
        buscarCEP(){
          var url = `https://viacep.com.br/ws/${this.cep}/json/`;

          this.cep =  this.cep.replace(/\D/g, "");

         if (this.cep && this.cep.length == 8 ){

            fetch(url)
            .then(response => response.json())
            .then(data => {              
                var endereco = data;
                this.criarSaida("CEP", this.cep);
                this.criarSaida("Bairro", endereco.bairro);
                this.criarSaida("Localidade", endereco.localidade);
                this.criarSaida("Logradouro", endereco.logradouro);
                this.criarSaida("UF", endereco.uf);
            })
            .catch(error => console.error('Unable to get api.', error));
        }
        }
    },
    template: `    
    <div class='row'>
        <div class='form-group'>
            <input maxlength="8" type="text" v-model='cep' class="form-control" placeholder="digite o cep">
            <button v-on:click="buscarCEP()" class='btn btn-primary mt-2'>Pesquisar</button>
        </div>
        <div class='mt-2' id="resposta"></div>
    </div>
    `
  })
  