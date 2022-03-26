<template>
  <div class="outline-card rounded container-fluid">
    <div class="mt-2 row d-flex justify-content-between">
      <div class="col-lg-6 text-start">
        <label for="nonlinearMethod" class="form-label mt-2 mb-0 fw-bold">
          Pick a Method
        </label>
        <select 
          id="nonlinearMethod" 
          class="form-select form-select" 
          aria-label=".form-select-sm example"
        >
          <option value="0" selected>Bisection Method</option>
          <option value="1">Regula-Falsi Method</option>
          <option value="2">Newton's Method</option>
          <option value="3">Secant Method</option>
          <option value="4">Method of Successive Substitution</option>
        </select>
      </div>

      <div class="col-lg-6 text-start">
        <label for="equation" class="form-label mt-2 mb-0 fw-bold">
          Give the Equation
        </label>
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
        <input 
          class="form-check-input" 
          type="checkbox" 
          value="" 
          id="checkRandomBounds"
          required
        >
        <label class="form-check-label" for="checkRandomBounds">
          Random Bounds
        </label>
      </div>

      &nbsp;or Find a Root Between&nbsp;
      <input 
        type="number" 
        v-model="startingBound" 
        class="bounds-input p-0 form-control" 
        id="startingBound"
        required
      >
      &nbsp;And&nbsp;
      <input 
        type="number" 
        v-model="endingBound" 
        class="bounds-input p-0 form-control"
        id="endingBound"
        required
      >
    </div>

    <div class="mt-4 ms-0 ps-0 container-fluid d-inline-flex">
      w/ Max Iteration &nbsp;
      <input 
        type="number" 
        v-model="maxiter"
        min="1" 
        max="500" 
        class="places-input p-0 form-control" 
        id="maxIteration"
        required
      >
      &nbsp;and Solution correct up to&nbsp;
      <input 
        type="number" 
        v-model="correctDigits" 
        min="0" 
        max="14" 
        class="places-input p-0 form-control" 
        id="correctDigits"
        required
      >
      &nbsp;Digits
    </div>

    <div class="mt-3 mb-3 row d-flex justify-content-around">
      <button 
        type="button" 
        @click="handleCalculate()" 
        class="col-lg-5 btn btn-secondary"
      >
      Calculate
      </button>
      <button type="button" class="col-lg-5 btn btn-dark">Reset</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'BisectionMethod',
  props: {

  },
  data () {
    return {
      equation: '',
      startingBound: 1,
      endingBound: 3,
      maxiter: 100,
      correctDigits: 4,
      solution: [],
      answer: ''
    }
  },
  methods: {
    handleCalculate () {
      let xCurr, xPrev = 0;
      let a = this.startingBound;
      let b = this.endingBound;
      xCurr = (a + b) / 2;

      const func = new Function('x', 'return ' + this.correctedEq);

      if (func(a) * func(b) >= 0) {
        this.solution.push('the two bounds substituted to the function should result in different signs, try with different bounds');
        return;
      }

      this.solution = [];
      this.solution.push(`BM(f(x), [a, b], E) -> BM(${this.correctedEq}, [${a}, ${b}], ${this.errorTolerance})`);
      this.solution.push(`xCurr <- (${a} + ${b}) / 2 (iteration 1)`);
      this.solution.push(`repeat until |xCurr - xPrev| < ${this.errorTolerance}`);

      let iter = 2;

      do {
        this.solution.push(`iteration ${iter}:`);
        this.solution.push(`xPrev <- ${xCurr} (xCurr)`);
        xPrev = xCurr;

        if (func(a) * func(xCurr) < 0) {
          this.solution.push(`func(${a}) * func(${xCurr}) [${func(a)} * ${func(xCurr)}] < 0`);
          this.solution.push(`b <- ${xCurr} (xCurr)`);
          b = xCurr;
        }
        else if (func(a) * func(xCurr) > 0) {
          this.solution.push(`func(${a}) * func(${xCurr}) [${func(a)} * ${func(xCurr)}] > 0`);
          this.solution.push(`a <- ${xCurr} (xCurr)`);
          a = xCurr;
        }
        else {
          xCurr = parseFloat(xCurr.toFixed(this.correctDigits));
          this.solution.push(`${xCurr} is the exact solution`);
          this.answer = `${xCurr} is the exact solution`;
          
          this.handleEstimates();
        }

        this.solution.push(`xCurr <- (${a} + ${b}) / 2`);
        xCurr = (a + b) / 2;
        
        iter++;
      } while (Math.abs(xCurr - xPrev) >= this.errorTolerance && iter < this.maxiter)

      if (iter >= this.maxiter) {
        xCurr = parseFloat(xCurr.toFixed(this.correctDigits));
        this.solution.push(`the calculation has reached maxiter ${this.maxiter}, ${xCurr} is the final estimate we've reached`);
        this.answer = `the calculation has reached maxiter ${this.maxiter}, ${xCurr} is the final estimate we've reached`;
        
        this.handleEstimates();
      }

      xCurr = parseFloat(xCurr.toFixed(this.correctDigits));
      this.solution.push(`${xCurr} is our estimate`);
      this.answer = `${xCurr} is our estimate`;

      this.handleEstimates();
    },
    handleEstimates () {
      this.$emit('handle-estimates', {'solution':this.solution, 'answer':this.answer});
    }
  },
  watch: {
    maxiter () {
      if (this.maxiter < 1) this.maxiter = 1;
      else if (this.maxiter > 500) this.maxiter = 500; 
    },
    correctDigits () {
      if (this.correctDigits < 0) this.correctDigits = 0;
      if (this.correctDigits > 14) this.correctDigits = 14;
    }
  },
  computed: {
    errorTolerance () {
      return 1 / (10 ** this.correctDigits);
    },
    correctedEq () {
      let eq = this.equation;

      eq = eq.replace(/\^/g, '**').replace(/ /g,'');
      for(let i = 0; i < eq.length; i++) {
        // if (Number.IsInteger(Number(eq[i]))) {
        //   eq = eq.substring(0, i) + `BigInt(${eq[i]})` + eq.substring(i+1);
        // }
        if (eq[i] === "x" && Number.isInteger(Number(eq[i-1]))) {
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
  min-width: 66px;
  max-width: 66px;
  min-height: 22px;
  max-height: 22px;
  text-align: center;

  // &.places-input::-webkit-inner-spin-button {
  // -webkit-appearance: none;
  // }
}
</style>
