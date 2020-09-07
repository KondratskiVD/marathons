<template>
  <div class="container">

      <!-- Outer Row -->
      <div class="row justify-content-center">

        <div class="col-xl-10 col-lg-12 col-md-9">

          <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0">
              <!-- Nested Row within Card Body -->
              <div class="row">
                <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div class="col-lg-6">
                  <div class="p-5">
                    <div class="text-center">
                      <h1 class="h4 text-gray-900 mb-4">C Возврашением!</h1>
                    </div>
                    <form @submit.prevent="authUser" class="user">

                      <div class="form-group">
                        <input
                            id="email"
                            class="form-control form-control-user"
                            type="text"
                            placeholder="Введите адресс почты"
                            v-model.trim="user_email"
                            :class="{'is-invalid': ($v.user_email.$dirty && !$v.user_email.required) || ($v.user_email.$dirty && !$v.user_email.email),
                            'is-valid': ($v.user_email.$dirty && $v.user_email.required) && ($v.user_email.$dirty && $v.user_email.email)
                            }"
                        >
                        <small class="invalid-feedback"
                               v-if="$v.user_email.$dirty && !$v.user_email.required">Заполните поле</small>
                        <small class="invalid-feedback"
                               v-else-if="$v.user_email.$dirty && !$v.user_email.email">Нужно ввести действительный адресс</small>
                      </div>

                      <div class="form-group">
                        <input
                            id="password"
                            type="password"
                            class="form-control form-control-user"
                            v-model.trim="password"
                            placeholder="Пароль"
                            :class="{'is-invalid': ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength),
                            'is-valid': ($v.password.$dirty && $v.password.required) && ($v.password.$dirty && $v.password.minLength)}"
                        >
                        <small class="invalid-feedback"
                               v-if="$v.password.$dirty && !$v.password.required"
                        >Заполните поле</small>
                        <small class="invalid-feedback"
                               v-else-if="$v.password.$dirty && !$v.password.minLength"
                        >Длина пароля минимум {{ $v.password.$params.minLength.min }} символов. Сейчас их {{ password.length}}</small>
                      </div>
<!--                      <div class="form-group">-->
<!--                        <div class="custom-control custom-checkbox small">-->
<!--                          <input type="checkbox" class="custom-control-input" id="customCheck">-->
<!--                          <label class="custom-control-label" for="customCheck">Remember Me</label>-->
<!--                        </div>-->
<!--                      </div>-->
                      <button type="submit" class="btn btn-primary btn-user btn-block">
                        Login
                      </button>
<!--                      <hr>-->
<!--                      <a href="index.html" class="btn btn-google btn-user btn-block">-->
<!--                        <i class="fab fa-google fa-fw"></i> Login with Google-->
<!--                      </a>-->
<!--                      <a href="index.html" class="btn btn-facebook btn-user btn-block">-->
<!--                        <i class="fab fa-facebook-f fa-fw"></i> Login with Facebook-->
<!--                      </a>-->
                    </form>
                    <hr>
<!--                    <div class="text-center">-->
<!--                      <a class="small" href="forgot-password.html">Забыли пароль?</a>-->
<!--                    </div>-->
                    <div class="text-center">
                      <router-link class="small" to="/registration">Создать аккаунт</router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'

export default {
  name: "login",
  data(){
    return {
      user_email : '',
      password : ''
    }
  },
  validations: {
    user_email: {email, required},
    password: {required, minLength: minLength(8)}
  },
  methods: {
    authUser() {
      if(this.$v.$invalid){
        this.$v.$touch()
        return
      }
      const user_email = this.user_email
      const password = this.password.toString()
      this.$store.dispatch('login', { vm : this, user: { user_email, password }})
          .then(() => this.$router.push('/'))
          .catch(err => console.log(err))
    },

  }
}
</script>

<style>

</style>