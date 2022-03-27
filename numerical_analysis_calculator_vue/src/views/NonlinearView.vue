<template>
<div class="container-fluid row d-flex justify-content-between px-0 mx-0">
  <div class="col-lg-6 rounded ps-0">
    <solution-accordion 
      :solution="solution"
      :answer="answer"
    />
  </div>
  <div class="me-0 pe-0 col-lg-6">
    <bisection-method 
      v-if="numMethod === 'bisectionMethod'"
      @change-num-method="changeNumMethod"
      @handle-estimates="handleEstimates"
    />
    <regula-falsi-method 
      v-if="numMethod === 'regulaFalsiMethod'"
      @change-num-method="changeNumMethod"
      @handle-estimates="handleEstimates"
    />
  </div>
</div>
</template>

<script>
import SolutionAccordion from '@/components/SolutionAccordion.vue';
import BisectionMethod from '@/components/BisectionMethod.vue';
import RegulaFalsiMethod from '../components/RegulaFalsiMethod.vue';

export default {
  name: 'NonlinearView',
  data () {
    return {
      numMethod: 'bisectionMethod',
      solution: [],
      answer: ''
    }
  },
  components: {
    SolutionAccordion,
    BisectionMethod,
    RegulaFalsiMethod
  },
  methods: {
    changeNumMethod (numMethod) {
      this.numMethod = numMethod;
    },
    handleEstimates (estimates) {
      this.solution = estimates.solution;
      this.answer = estimates.answer;
    }
  }
}
</script>
