<template>
  <div>
    <b-container>
      <b-row class="mb-2">
        <div v-bind:key="preset.index" v-for="preset in presets">
          <b-col sm="10">
            <div v-if="currentPreset === preset">
              <b-button variant="primary" @click="setPreset(preset)"> {{ formatCurrency(preset, true) }}</b-button>
            </div>
            <div v-else>
              <b-button variant="secondary" @click="setPreset(preset)">{{ formatCurrency(preset, true) }}</b-button>
            </div>
          </b-col>
        </div>
      </b-row>
      <b-row class="mb-2">
        <b-col sm="4">
          <div class="input-group">
            <span class="input-group-addon">{{getCurrentCurrencySymbol()}}</span>
            <b-form-input id="donation-value"
                          type="text"
                          :value="formatCurrency(donationValue)"
                          @change="onDonationValueChange"
            >
            </b-form-input>
          </div>
        </b-col>
        <b-col sm="2">
          <select class="custom-select" :v-model="getCurrentCurrencyCode()" @change="selectCurrency">
            <option v-for="currency in currencies" v-bind:value="currency.code" >{{ currency.code }}</option>
          </select>
        </b-col>
      </b-row>
      <b-row class="mb-2">
        <b-col sm="4">
          <b-button variant="primary" @click="donate()"> Donate </b-button>
        </b-col>
      </b-row>
      <b-alert
        :show="dismissCountDown"
        dismissible
        fade
        variant="success"
        @dismiss-count-down="countDownChanged"
      >
        Thank you for your donation!
      </b-alert>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { observable, action, computed } from 'mobx'
import CurrencyStore, {currencyStore} from "@/store/CurrencyStore";
import DonationService from "@/service/DonationService";

@Component
export default class DonationForm extends Vue {

  @observable private presets = [40, 100, 200, 1000, 2500, 5000];
  @observable private currentPreset = 0;
  @observable private donationValue = 0;
  @observable private donationChanged = false;
  @observable private dismissCountDown = 0;

  private currencyStore: CurrencyStore;

  constructor() {
    super();
    this.currencyStore = currencyStore;
  }

  beforeMount() {
    this.setPreset(40)
  }

  @action.bound
  countDownChanged(dismissCountDown: number) {
    this.dismissCountDown = dismissCountDown
  }

  @action.bound
  showAlert() {
    this.dismissCountDown = 3
  }

  @computed
  get currencies() {
    return this.currencyStore.currencies
  }

  @action.bound
  setPreset (preset: number) {
    this.currentPreset = preset
    this.donationValue = preset
  }

  @action.bound
  onDonationValueChange (value: number) {
    this.donationValue = value
    this.donationChanged = true
  }

  @action.bound
  async donate () {
    const donation = { currency: this.getCurrentCurrencyCode(), amount: this.donationValue }
    const { data, error } = await DonationService.donate(donation)
    if (error) {
      console.log('Ошибка при проведении транзакции', error)
    } else {
      this.showAlert()
    }
  }

  // Срабатывает при изменении суммы в поле ввода
  @action.bound
  selectCurrency (event: any) {
    const currencyCode = event.target.value

    const currencyFrom = this.currencyStore.currentCurrency
    const currency = this.currencyStore.setCurrencyByCode(currencyCode)
    const currencyTo = this.currencyStore.currentCurrency

    if (currency) {
      // Конвертация подсказок
      this.presets = this.presets.map(preset => {
        const converted = this.currencyStore.convertCurrency(preset, currencyFrom, currencyTo)
        return this.roundAmount(converted, true)
      })
      // конвертация в поле ввода
      const converted = this.currencyStore.convertCurrency(this.donationValue, currencyFrom, currencyTo)
      this.donationValue = this.roundAmount(converted, this.donationChanged)
    }
  }

  private roundAmount(value: number, pretty: boolean): number {

    // Можно было придумать что-то покрасивее типа округления разрядов чисел
    // но так быстрее :0))

    const rounded = Math.round(value)
    if (!pretty) {
      return rounded
    }

    if (rounded <= 50) {
      return 50;
    }
    if (rounded >= 50 && rounded <= 120) {
      return 120;
    }
    if (rounded > 120 && rounded <= 200) {
      return 200;
    }
    if (rounded > 200 && rounded <= 400) {
      return 400;
    }
    if (rounded > 400 && rounded <= 1000) {
      return 1000;
    }
    if (rounded > 1000 && rounded <= 1500) {
      return 1500;
    }
    if (rounded > 1500 && rounded <= 2500) {
      return 2500;
    }
    if (rounded > 2500 && rounded <= 4000) {
      return 4000;
    }
    if (rounded > 4000 && rounded <= 5000) {
      return 5000;
    }
    if (rounded > 5000 && rounded <= 8000) {
      return 8000;
    }
    if (rounded > 8000 && rounded <= 12000) {
      return 12000;
    }
    if (rounded > 12000 && rounded <= 15000) {
      return 15000;
    }
    if (rounded > 15000 && rounded <= 20000) {
      return 20000;
    }
    return rounded
  }

  private getCurrentCurrencySymbol(): string {
    return this.currencyStore?.currentCurrency?.symbol || '$';
  }

  private getCurrentCurrencyCode(): string {
    return this.currencyStore?.currentCurrency?.code || 'USD'
  }

  private formatCurrency(value: number, showCurrencySymbol = false): string {
    return this.currencyStore.formatCurrency(value, showCurrencySymbol)
  }
}

</script>

