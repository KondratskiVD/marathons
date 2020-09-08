<template>
  <div class="container-fluid">

  <div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">Марафоны</h1>

    <b-button v-b-modal.modal-1 variant="primary" class="btn-icon-split">
                    <span class="icon text-white-50">
                      <i class="fas fa-plus"></i>
                    </span>
      <span class="text">Добавить марафон</span>
    </b-button>
  </div>
    <div class="row">

      <!-- Earnings (Monthly) Card Example -->
      <div v-for="marathon in marathons" class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-primary shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">{{ marathon.title }}</div>
                <div class="h6 mb-0 font-weight-bold text-gray-800">{{ marathon.finishDate | formateDate('date') }}</div>
                <div class="row no-gutters align-items-center">
                  <div class="col-auto">
                    <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">50%</div>
                  </div>
                  <div class="col">
                    <div class="progress progress-sm mr-2">
                      <div class="progress-bar bg-info" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-auto">
                <i class="fas fa-calendar fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <b-modal
        id="modal-1"
        hide-footer
        header-class="card-header"
        title-class="m-0 font-weight-bold text-primary">
      <template v-slot:modal-title>
        <h5>Добавить Марафон</h5>
      </template>
      <form @submit.prevent="addMarathon">
        <div class="form-row">
          <div class="form-group col">
            <label for="inputEmail4">Название</label>
            <input v-model="marathon.title" placeholder="Введи название" type="text" class="form-control" id="inputEmail4">
          </div>
        </div>
        <div v-if="categories" class="form-row">
          <div class="form-group col">
            <label for="validationCustom02">Категория</label>
            <select v-model="marathon.categoryId" class="custom-select" id="validationCustom02">
              <option selected disabled value="">Категория не выбрана</option>
              <option v-for="category in categories" :value="category.category_id">{{ category.categories_title }}</option>
            </select>
          </div>
          {{ marathon.categoryId }}
        </div>
        <div class="form-row">
          <div class="form-group col">
            <label for="validationCustom04">Тип</label>
            <select v-model="marathon.type" class="custom-select" id="validationCustom04">
              <option selected disabled value="">Тип не выбран</option>
              <option>Личный</option>
              <option>Дуель</option>
              <option>Группа</option>
            </select>
          </div>
        </div>
        <label for="start-datepicker">Стартует</label>
        <b-form-datepicker
            id="start-datepicker"
            v-model="marathon.startDate"
            placeholder="Выбери дату начала"
            local="ru"
            hide-header
            label-help=""
            class="mb-2">
          <template v-slot:nav-this-month>
            <small>текущий месяц</small>
          </template>
        </b-form-datepicker>
        <label for="finish-datepicker">Заканчивается</label>
        <b-form-datepicker
            id="finish-datepicker"
            v-model="marathon.finishDate"
            placeholder="Выбери дату окончания"
            local="ru"
            hide-header
            label-help=""
            class="mb-2">
          <template v-slot:nav-this-month>
            <small>текущий месяц</small>
          </template>
        </b-form-datepicker>
        <div class="d-flex justify-content-end">
          <button type="submit" class="btn btn-primary">
            Добавить
          </button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from 'vuex'
export default {
  name: 'Marahtons',
  data() {
    return {
      categories: [],
      marathons: [],
      marathon: {
        title: '',
        type: '',
        categoryId: '',
        startDate: '',
        finishDate: ''
      }
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      axios({url: '/categories', method: 'GET' })
        .then(resp => {
          this.categories = resp.data.categories
        })
        .catch(err => {
          console.log(err)
        });
      axios({url: '/marathons/users_marathons',  data: {id: this.userId}, method: 'POST' })
        .then(resp => {
          this.marathons = resp.data.marathons
        })
        .catch(err => {
          console.log(err)
        });
    },
    addMarathon() {
      const marathon = this.marathon;
      marathon.userId = this.userId
      axios({url: '/marathons', data: marathon, method: 'POST' })
        .then((resp) => {
          this.marathons.push(resp.data.createdMarathon)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>