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
      @handle-estimates="handleEstimates"
    />
    <p class="text-start mt-4">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident 
      architecto ducimus tenetur ut saepe aperiam accusamus, quos sit. 
      Laboriosam tempora veritatis a aut id fugiat facere, quae vel cumque 
      molestias cupiditate suscipit alias tempore iusto omnis reprehenderit 
      sint magnam quasi consequuntur adipisci, praesentium laudantium 
      perspiciatis error repellat! Modi nemo quaerat, iusto ipsa ea sequi 
      culpa et necessitatibus provident unde itaque nulla voluptatem eaque 
      fugit facere deleniti libero dolor. Quo maxime, tenetur fuga nulla 
      aperiam fugiat. Ut ducimus reprehenderit fugit enim!
    </p>
  </div>
</div>
</template>

<script>
import SolutionAccordion from '@/components/SolutionAccordion.vue';
import BisectionMethod from '@/components/BisectionMethod.vue';

export default {
  name: 'NonlinearView',
  data () {
    return {
      solution: [],
      answer: ''
    }
  },
  components: {
    SolutionAccordion,
    BisectionMethod
  },
  methods: {
    handleEstimates (estimates) {
      this.solution = estimates.solution;
      this.answer = estimates.answer;
    }
  }
}
</script>
