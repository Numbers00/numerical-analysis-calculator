<template>
<div class="container-fluid">
  <div class="col-lg-6">
    <SolutionAccordion />
  </div>
  <div class="outline-card col-lg-5">
    <label for="nonlinearMethod" class="form-label">Pick a Method</label>
    <select class="form-select form-select-sm" aria-label=".form-select-sm example">
      <option value="0" selected>Bisection Method</option>
      <option value="1">Regula-Falsi Method</option>
      <option value="2">Newton's Method</option>
      <option value="3">Secant Method</option>
      <option value="4">Method of Successive Substitution</option>
    </select>
  </div>
</div>
</template>

<script>
import SolutionAccordion from '@/components/SolutionAccordion.vue'
export default {
  name: 'NonlinearView',
  data () {
    return {}
  },
  components: {
    SolutionAccordion
  }
}
</script>
