<template>
  <div class="peers ai-s fxw-nw h-100vh">
      <div class="d-n@sm- peer peer-greed h-100 pos-r bgr-n bgpX-c bgpY-c bgsz-cv bg-assert-light">
        <div class="pos-a centerXY">
          <div class="bdrs-50p pos-r" style='width: 120px; height: 120px;'>
            <img class="pos-a centerXY" :src="logo" alt="">
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4 peer pX-40 pY-80 h-100 bgc-white scrollable pos-r" style='min-width: 320px;'>
        <h4 class="fw-300 c-grey-900 mB-40">Login</h4>
        <form v-on:submit.prevent>
          <div class="form-group">
            <label class="text-normal text-dark">Usuário</label>
            <input type="email" class="form-control" placeholder="Usuário" v-model='form.email'>
          </div>
          <div class="form-group">
            <label class="text-normal text-dark">Senha</label>
            <input type="password" class="form-control" placeholder="Senha" v-model="form.password">
          </div>
          <div class="form-group">
            <div class="peers ai-c jc-sb fxw-nw">
              <div class="peer">
                <div class="checkbox checkbox-circle checkbox-info peers ai-c">
                  <input type="checkbox" id="inputCall1" name="inputCheckboxesCall" class="peer">
                  <label for="inputCall1" class=" peers peer-greed js-sb ai-c">
                    <span class="peer peer-greed">Remember Me</span>
                  </label>
                </div>
              </div>
              <div class="peer">
                <button @click='handleSubmit' class="btn btn-primary">Login</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
</template>

<script>
  import logo from '../../../assets/images/logo-assert.png';
  import { User } from '../../../helpers/requests';
  
  /* eslint-disable */ 
  export default {  
    name: 'sigin',
    data() {
      return {
        logo,
        form: {
          email: 'joerverson@g.com',
          password: ''
        }
      }
    },
    methods: {
      async handleSubmit() {        
        const result = await User.auth.login(this.form);
        if(!result) {
          this.$notification.error('Email ou senha não conferem.')
        }
      }
    }
  }
</script>

