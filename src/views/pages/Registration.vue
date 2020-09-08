<template>
  <div class="container">

      <div class="card o-hidden border-0 shadow-lg my-5">
        <div class="card-body p-0">
          <!-- Nested Row within Card Body -->
          <div class="row">
            <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
            <div class="col-lg-7">
              <div class="p-5">
                <div class="text-center">
                  <h1 class="h4 text-gray-900 mb-4">Создать аккаунт!</h1>
                </div>
                <form @submit.prevent="registerUser" class="user">
                  <div class="form-group row">
                    <div class="col-sm-6 mb-3 mb-sm-0">
                      <input
                          class="form-control form-control-user"
                          type="text"
                          placeholder="Имя"
                          v-model.trim="user_first_name"
                          :class="{'is-invalid': ($v.user_first_name.$dirty && !$v.user_first_name.required),
                            'is-valid': ($v.user_first_name.$dirty && $v.user_first_name.required)
                            }"
                      >
                      <small class="invalid-feedback"
                             v-if="$v.user_first_name.$dirty && !$v.user_first_name.required">Заполните поле</small>
                    </div>

                    <div class="col-sm-6">
                      <input
                          class="form-control form-control-user"
                          type="text"
                          placeholder="Фамилия"
                          v-model.trim="user_second_name"
                          :class="{'is-invalid': ($v.user_second_name.$dirty && !$v.user_second_name.required),
                            'is-valid': ($v.user_second_name.$dirty && $v.user_second_name.required)
                            }"
                      >
                      <small class="invalid-feedback"
                             v-if="$v.user_second_name.$dirty && !$v.user_second_name.required">Заполните поле</small>
                    </div>
                  </div>
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
                  <div class="form-group row">
                    <div class="col-sm-6 mb-3 mb-sm-0">
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
                    <div class="col-sm-6">
                      <input
                          id="repeat_password"
                          type="password"
                          class="form-control form-control-user"
                          v-model.trim="repeatPassword"
                          placeholder="Повторите пароль"
                          :class="{'is-invalid': ($v.repeatPassword.$dirty && !$v.repeatPassword.sameAsPassword) || ($v.repeatPassword.$dirty && !$v.repeatPassword.required),
                          'is-valid': ($v.repeatPassword.$dirty && $v.repeatPassword.sameAsPassword) && ($v.repeatPassword.$dirty && $v.repeatPassword.required)}"
                      >
                      <small class="invalid-feedback"
                             v-if="$v.repeatPassword.$dirty && !$v.repeatPassword.sameAsPassword"
                      >Пароли должны быть одинаковыми.</small>
                    </div>
                  </div>
                  <button type="submit" class="btn btn-primary btn-user btn-block">
                    Регистрация
                  </button>
<!--                  <hr>-->
<!--                  <a href="index.html" class="btn btn-google btn-user btn-block">-->
<!--                    <i class="fab fa-google fa-fw"></i> Register with Google-->
<!--                  </a>-->
<!--                  <a href="index.html" class="btn btn-facebook btn-user btn-block">-->
<!--                    <i class="fab fa-facebook-f fa-fw"></i> Register with Facebook-->
<!--                  </a>-->
                </form>
                <hr>
<!--                <div class="text-center">-->
<!--                  <a class="small" href="forgot-password.html">Забыли пароль?</a>-->
<!--                </div>-->
                <div class="text-center">
                  <router-link class="small" to="/login">Уже есть аккаунт? Войти</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
import {email, required, minLength, sameAs} from 'vuelidate/lib/validators'

export default {
  name: "Registration",
  data() {
    return {
      user_email: '',
      password: '',
      repeatPassword: '',
      user_first_name: '',
      user_second_name: '',
    }
  },
  validations: {
    user_email: {email, required},
    user_first_name: {required},
    user_second_name: {required},
    password: {required, minLength: minLength(8)},
    repeatPassword: {
      required,
      sameAsPassword: sameAs('password')
    }
  },
  methods: {
    registerUser() {
      if(this.$v.$invalid){
        this.$v.$touch()
        return
      }
      let user = {
        user_email: this.user_email,
        password: this.password,
        user_first_name: this.user_first_name,
        user_second_name: this.user_second_name,
        user_role: 'марафонец'
      }
      this.$store.dispatch('register', {vm: this, user})
          .then(() => {
            this.$router.push('/welcome')
          })
          .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>

</style>