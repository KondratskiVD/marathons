<template>
  <div class="container">

    <!-- Outer Row -->
    <div class="row justify-content-center">

      <div class="col-xl-10 col-lg-12 col-md-9">

        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <!-- Nested Row within Card Body -->
            <div class="row">
              <div class="col-lg-6 d-none d-lg-block bg-password-image"></div>
              <div class="col-lg-6">
                <div class="p-5">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-2">Приветствуем!</h1>
                    <p class="mb-4">Добро пожаловать в марафонские соревнования. <br>
                    Это приложение поможет тебе выработать полезные привычки и добиться поставленных целей.
                    Участвуй в марафонах, приглашай других участников и следи за их прогрессом, тогда соревновательный дух даст тебе дополнительную мотивацию.
                    </p>
                    <hr>
                    <p>
                    Главное  - <b>не сдавайся</b> если не получаеться преодолеть марафон с первого раза.
                    Проси советов у других участников в чате, и они постараються тебе помочь.
                    </p>
                  </div>
                  <form class="user">
                    <router-link to="/" class="btn btn-primary btn-user btn-block">
                      Продолжить
                    </router-link>
                  </form>
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

export default {
  name: "Welcome",
  data(){
    return {
    }
  },
}
</script>

<style>

</style>