<template>
<div class="accordion container-fluid px-0" id="helperAccordion">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Answer
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#helperAccordion">
      <div class="accordion-body">
        Please click "solve" to start displaying the answer
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Solution
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#helperAccordion">
      <div class="accordion-body">
        Please click "solve" to start displaying the solution
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'SolutionAccordion'
}
</script>

<style lang="scss" scoped>
.accordion {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border: 2px solid #c3cfd9;
}

.accordion-item {
  background-color: #fefffe;
}

.accordion-button {
  background-color: #f7f8fb;
  color: black;

  &:nth-child(1) {
    border-bottom: 2px solid #c3cfd9;
  }
}
</style>
