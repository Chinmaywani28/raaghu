---
slug: "/chart-radar"
date: "2019-05-04"
title: "Elements > Chart-radar"
---

<!-- CSS only -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
<link rel="stylesheet" href="../../../../../../../raaghu/src/assets/css/style-elements.css">
<link rel="stylesheet" href="../../../../../../../raaghu/src/assets/css/main.css">

#### Chart Radar

<p class="">A card is a small rectangular module with images and text. It is an entry point for users to learn more details</p>

<section class="py-4">
    <h6>Default</h6>
    <div class="py-3">
      <div class="cust-tabs">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="Preview-tab" data-bs-toggle="tab" data-bs-target="#Preview" type="button" role="tab" aria-controls="Preview" aria-selected="true">Preview </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="Angular-tab" data-bs-toggle="tab" data-bs-target="#Angular" type="button" role="tab" aria-controls="Angular" aria-selected="false"><i class="bi bi-code-slash" style="font-size:1.0rem"></i>Angular</button>
          </li>
        </ul>
      </div>
      <div class="tab-content card border" id="myTabContent">
        <div class="tab-pane fade show active" id="Preview" role="tabpanel" aria-labelledby="Preview-tab">
         <div class="contents p-5">                                            
            <div class="row">
              <div class="col-md-6 col-12">
                <img src="/images/radar-chart.png" class="img-fluid">
              </div> 
            </div>
          </div>
        </div>
        <div class="tab-pane fade show" id="Angular" role="tabpanel" aria-labelledby="Angular-tab">
          <div class="contents bg-code">
<div class="row  m-0 p-4">

```html
<rds-chart-radar
  [chartWidth]="400"
  [chartLabels]="chartLabels"
  [ChartDataSets]="ChartDataSets"
  [chartOptions]="chartOptions"
></rds-chart-radar>
```

</div>
          </div>
        </div>
      </div>
    </div>
  </section>


<!-- JavaScript Bundle with Popper -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>