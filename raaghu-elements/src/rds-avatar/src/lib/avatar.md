---
slug: "/Avatar"
date: "2019-05-04"
title: "Elements > Avatar"
---

<!-- CSS only -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
<link rel="stylesheet" href="../../../../../../../raaghu/src/assets/css/style-elements.css">
<link rel="stylesheet" href="../../../../../../../raaghu/src/assets/css/main.css">

#### Avatar

<p class="checkbox-def">Avatar is known as a visual form representing a user oneself and one's identity wished.</p>

<!-- Default -->
<section class="py-4">
    <h6>Default</h6>
    <div class="py-3">
      <div class="cust-tabs">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="PreviewBasic-tab" data-bs-toggle="tab" data-bs-target="#PreviewBasic" type="button" role="tab" aria-controls="PreviewBasic" aria-selected="true">Preview </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="AngularBasic-tab" data-bs-toggle="tab" data-bs-target="#AngularBasic" type="button" role="tab" aria-controls="AngularBasic" aria-selected="false"><i class="bi bi-code-slash" style="font-size:1.0rem"></i>Angular</button>
          </li>
        </ul>
      </div>
      <div class="tab-content card border" id="myTabContent">
        <div class="tab-pane fade show active" id="PreviewBasic" role="tabpanel" aria-labelledby="PreviewBasic-tab">
         <div class="contents  p-5">
            <div class="row">
              <div class="col-md-12">
                <img src="/images/avatar.png" class="img-fuild">
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane fade show" id="AngularBasic" role="tabpanel" aria-labelledby="AngularBasic-tab">
          <div class="contents bg-code">
<div class="row m-0">

```html
<rds-avatar
  [WithProfilePic]="false"
  profilePic=""
  FirstName=""
  LastName=""
  Size="Medium"
></rds-avatar>
```

</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- with-horizontally-alligned-info -->
<section class="py-4">
    <h6>With Horizontally Alligned Infoefault</h6>
    <div class="py-3">
      <div class="cust-tabs">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="PreviewHor-tab" data-bs-toggle="tab" data-bs-target="#PreviewHor" type="button" role="tab" aria-controls="PreviewBasic" aria-selected="true">Preview </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="AngularHor-tab" data-bs-toggle="tab" data-bs-target="#AngularHor" type="button" role="tab" aria-controls="AngularBasic" aria-selected="false"><i class="bi bi-code-slash" style="font-size:1.0rem"></i>Angular</button>
          </li>
        </ul>
      </div>
      <div class="tab-content card border" id="myTabContent">
        <div class="tab-pane fade show active" id="PreviewHor" role="tabpanel" aria-labelledby="PreviewHor-tab">
         <div class="contents  p-5">
            <div class="row">
              <div class="col-md-12">
                <img src="/images/avatar-with-horizontally-alligned-info.png" class="img-fuild">
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane fade show" id="AngularHor" role="tabpanel" aria-labelledby="AngularHor-tab">
          <div class="contents bg-code">
<div class="row m-0">

```html
<rds-avatar
  [firstName]="firstName"
  [lastName]="lastName"
  [colorVariant]="colorVariant"
  [verticallyAlligned]="verticallyAlligned"
>
</rds-avatar>
```

</div>
          </div>
        </div>
      </div>
    </div>
  </section>


  <!-- with-vertically-alligned-info -->
<section class="py-4">
    <h6>With Vertically Alligned Info</h6>
    <div class="py-3">
      <div class="cust-tabs">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="Previewvertical-tab" data-bs-toggle="tab" data-bs-target="#Previewvertical" type="button" role="tab" aria-controls="PreviewBasic" aria-selected="true">Preview </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="AngularVertical-tab" data-bs-toggle="tab" data-bs-target="#AngularVertical" type="button" role="tab" aria-controls="AngularBasic" aria-selected="false"><i class="bi bi-code-slash" style="font-size:1.0rem"></i>Angular</button>
          </li>
        </ul>
      </div>
      <div class="tab-content card border" id="myTabContent">
        <div class="tab-pane fade show active" id="Previewvertical" role="tabpanel" aria-labelledby="Previewvertical-tab">
         <div class="contents  p-5">
            <div class="row">
              <div class="col-md-12">
                <img src="/images/avtar-with-vertically-alligned-info.png" class="img-fuild">
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane fade show" id="AngularVertical" role="tabpanel" aria-labelledby="AngularVertical-tab">
          <div class="contents bg-code">
<div class="row m-0">

```html
<rds-avatar
  [firstName]="firstName"
  [lastName]="lastName"
  [colorVariant]="colorVariant"
  [verticallyAlligned]="verticallyAlligned"
>
</rds-avatar>
```

</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- with-profile -->
<section class="py-4">
    <h6>Profile</h6>
    <div class="py-3">
      <div class="cust-tabs">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="PreviewProfile-tab" data-bs-toggle="tab" data-bs-target="#PreviewProfile" type="button" role="tab" aria-controls="PreviewBasic" aria-selected="true">Preview </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="AngularProfile-tab" data-bs-toggle="tab" data-bs-target="#AngularProfile" type="button" role="tab" aria-controls="AngularBasic" aria-selected="false"><i class="bi bi-code-slash" style="font-size:1.0rem"></i>Angular</button>
          </li>
        </ul>
      </div>
      <div class="tab-content card border" id="myTabContent">
        <div class="tab-pane fade show active" id="PreviewProfile" role="tabpanel" aria-labelledby="PreviewProfile-tab">
         <div class="contents  p-5">
            <div class="row">
              <div class="col-md-12">
                <img src="/images/avatar-profile.png" class="img-fuild">
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane fade show" id="AngularProfile" role="tabpanel" aria-labelledby="AngularProfile-tab">
          <div class="contents bg-code">
<div class="row m-0">

```html
<rds-avatar
  [withProfilePic]="true"
  profilePic="/image/avatar-profile.png"
  size="medium"
></rds-avatar>
```

</div>
          </div>
        </div>
      </div>
    </div>
  </section>

<!-- Skeleton / Specifications -->
<section class="py-4">
                        <h6>
                           Skeleton / Specifications
                        </h6>
                        <div class="py-3">
                              <!-- Tab panes -->
                              <div class="card border p-5">
                                 <div class="row">
                                    <div class="col-md-9 col-12">
                                       <img src="https://portal.raaghu.io/images/components/_avatar/img-2.png" class="img-fluid">
                                    </div>
                                 </div>
                              </div>
                        </div>
                     </section>



<!-- JavaScript Bundle with Popper -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
