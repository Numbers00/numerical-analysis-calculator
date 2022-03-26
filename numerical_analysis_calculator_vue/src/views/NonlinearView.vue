<template>
<div class="container-fluid row d-flex justify-content-between px-0 mx-0">
  <div class="col-lg-6 rounded ps-0">
    <SolutionAccordion 
      :solution="solution"
      :answer="answer"
    />
  </div>
  <div class="me-0 pe-0 col-lg-6">
    <div class="outline-card rounded container-fluid">
      <div class="mt-2 row d-flex justify-content-between">
        <div class="col-lg-6 text-start">
          <label for="nonlinearMethod" class="form-label mt-2 mb-0 fw-bold">Pick a Method</label>
          <select id="nonlinearMethod" class="form-select form-select" aria-label=".form-select-sm example">
            <option value="0" selected>Bisection Method</option>
            <option value="1">Regula-Falsi Method</option>
            <option value="2">Newton's Method</option>
            <option value="3">Secant Method</option>
            <option value="4">Method of Successive Substitution</option>
          </select>
        </div>
        <div class="col-lg-6 text-start">
          <label for="equation" class="form-label mt-2 mb-0 fw-bold">Give the Equation</label>
          <input 
              type="text"
              class="form-control col-11" 
              id="equation"
              placeholder="3x^2 - 6x + 5"
              v-model="equation"
              required
            >
        </div>
      </div>

      <div class="mt-4 ms-0 ps-0 container-fluid d-inline-flex">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="checkRandomBounds">
          <label class="form-check-label" for="checkRandomBounds">
            Random Bounds
          </label>
        </div>
        &nbsp;or Find a Root Between&nbsp;
        <input type="number" v-model="startingBound" class="bounds-input p-0 form-control" id="startingBound">
        &nbsp;And&nbsp;
        <input type="number" v-model="endingBound" class="bounds-input p-0 form-control" id="endingBound">
      </div>

      <div class="mt-4 ms-0 ps-0 container-fluid d-inline-flex">
        # of Decimal Places&nbsp;
        <input type="number" v-model="decPlaces" min="0" max="8" class="places-input p-0 form-control" id="decimalPlaces">
        &nbsp;with Error Tolerance at&nbsp;
        <input type="number" v-model="errorTolerance" min="0" max="8" class="places-input p-0 form-control" id="errorTolerance">
      </div>

      <div class="mt-3 mb-3 row d-flex justify-content-around">
        <button type="button" @click="handleCalculate()" class="col-lg-5 btn btn-secondary">Calculate</button>
        <button type="button" class="col-lg-5 btn btn-dark">Reset</button>
      </div>
    </div>
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
import SolutionAccordion from '@/components/SolutionAccordion.vue'
export default {
  name: 'NonlinearView',
  data () {
    return {
      equation: '',
      startingBound: 1,
      endingBound: 3,
      decPlaces: 4,
      errorTolerance: 0.0001,
      solution: [],
      answer: ''
    }
  },
  components: {
    SolutionAccordion
  },
  methods: {
    handleCalculate () {
      let xCurr, xPrev = 0;
      let a = this.startingBound;
      let b = this.endingBound;
      xCurr = (a + b) / 2;
      console.log(a, b, xCurr);

      console.log(this.correctedEq);
      const func = new Function('x', 'return ' + this.correctedEq);

      if (func(a) * func(b) >= 0) {
        this.solution.push('the two bounds substituted to the function should result in different signs, try with different bounds');
        return;
      }

      this.solution = [];
      this.solution.push(`BM(f(x), [a, b], E) -> BM(${this.correctedEq}, [${a}, ${b}], ${this.errorTolerance})`);
      this.solution.push(`xCurr = (${a} + ${b}) / 2 // iteration 1`);
      this.solution.push(`repeat until |xCurr - xPrev| < ${this.errorTolerance}`);

      for (let iter = 2, maxiter = 100; Math.abs(xCurr - xPrev) >= this.errorTolerance; iter++) {
        if (iter >= maxiter) return;

        this.solution.push(`iteration ${iter}:`);
        xPrev = xCurr;
        this.solution.push(`xPrev = ${xCurr}`);

        if (func(a) * func(xCurr) < 0) {
          this.solution.push(`func(${a}) (${func(a)}) * func(${b}) (${func(xCurr)}) < 0`);
          this.solution.push(`b = ${xCurr}`);
          b = xCurr;
        }
        else if (func(a) * func(xCurr) > 0) {
          this.solution.push(`${func(a)} * ${func(xCurr)} < 0`);
          this.solution.push(`a = ${xCurr}`);
          a = xCurr;
        }
        else {
          xCurr = parseFloat(xCurr.toFixed(4));
          this.solution.push(`${xCurr} is the exact solution`);
          this.answer = `${xCurr} is the exact solution`;
          return;
        }

        this.solution.push(`xCurr = (${a} + ${b}) / 2`);
        xCurr = (a + b) / 2;
        console.log(a, b, xCurr);
      }

      xCurr = parseFloat(xCurr.toFixed(4));
      this.solution.push(`${xCurr} is our estimate`);
      this.answer = `${xCurr} is our estimate`;
    }
  },
  computed: {
    correctedEq () {
      let eq = this.equation;

      eq = eq.replace(/\^/g, '**').replace(/ /g,'');
      for(let i = 0; i < eq.length; i++) {
        if (eq[i] === "x" && Number.isInteger(Number(eq[i-1]))) {
          console.log(eq[i-1]);
          eq = eq.substring(0, i) + '*' + eq.substring(i);
        }
      }

      return eq;
    }
  }
}
</script>

<style lang="scss" scoped>
input[type=number] {
  min-width: 22px;
  max-width: 22px;
  min-height: 22px;
  max-height: 22px;
  text-align: center;

  &.bounds-input, &#errorTolerance {
    min-width: 66px;
    max-width: 66px;
  }

  &.places-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  }
}
</style>
