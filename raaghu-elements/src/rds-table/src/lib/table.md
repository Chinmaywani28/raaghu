---
slug: "/Table"
date: "2019-05-04"
title: "Elements > Table"
---

<!-- CSS only -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
<link rel="stylesheet" href="../../../../../../../raaghu/src/assets/css/style-elements.css">
<link rel="stylesheet" href="../../../../../../../raaghu/src/assets/css/main.css">

#### Table

<p class="checkbox-def">Tables are a designed for displaying large amounts of data in rows and columns.</p>

<section class="py-4">
    <h6>Default</h6>
    <div class="py-3">
      <div class="cust-tabs">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="Preview-tab" data-bs-toggle="tab" data-bs-target="#Preview" type="button" role="tab" aria-controls="Preview" aria-selected="true">Preview </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="angular-tab" data-bs-toggle="tab" data-bs-target="#angular" type="button" role="tab" aria-controls="angular" aria-selected="false"><i class="bi bi-code-slash" style="font-size:1.0rem"></i>Angular</button>
          </li>
        </ul>
      </div>
      <div class="tab-content card border" id="myTabContent">
        <div class="tab-pane fade show active" id="Preview" role="tabpanel" aria-labelledby="Preview-tab">
          <div class="contents p-5">
          <div class="row">
            <div class="col-md-12">
                <img src="/images/table.png" class="img-fluid w-100">
            </div>
          </div>                                
            </div>
        </div>
        <div class="tab-pane fade show" id="Preview" role="tabpanel" aria-labelledby="Preview-tab">
          <div class="contents bg-code">
<div class="row  m-0 p-4">

```html
<rds-table
  [tableBorder]="false"
  [tableHeader]="true"
  [tableHeaderItems]="tableHeaderItems"
  [tableBodyItems]="tableBodyItems"
  colorVariant="primary"
></rds-table>
```