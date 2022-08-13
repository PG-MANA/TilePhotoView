# Tile Photo View
The photo gallery powered by [jekyll](https://jekyllrb.com/) and [PhotoSwipe](https://photoswipe.com/).

## Screen Shot
![Screen Shot](https://user-images.githubusercontent.com/35759887/184501038-482ed48e-522f-4ceb-a6a8-74b1078be69e.png)

You can see example settings at https://github.com/PG-MANA/TilePhotoViewExample , and how it works at https://soft.taprix.org/web/tile_photo_view/

## How to configure
### _config.yml
Please make `_config.yml` like below.

```yaml
title: PhotoView
description: 'The Tile-style Photograph Viewer'
baseurl: "/gallery/"
url: "https://example.com"

author:
  name: Your Name

custom_css:
  relative:
    - 'about.css'

custom_js:
  relative:
    - 'gtag.js'
  absolute:
    - 'https://www.googletagmanager.com/gtag/js?id=######'

exclude:
  - README.md
  - LICENSE
  - GemfileBuild
```

Required Elements:
* title: The site name
* description: Short description of your website
* baseurl: Relative url which this website will be placed( See https://jekyllrb.com/docs/configuration/options/ )
* url: Protocol and Domain(See https://jekyllrb.com/docs/configuration/options/ ) 
* author.name: Your Name, which is used by footer's copyrights

Optional Elements:
* custom_css: CSS files to load in every page using default layout
  * relative: Local CSS file name, which should located in `assets/css/custom` (In the example, `about.css` should be place as `/assets/css/custom/about.css`) 
  * absolute: External CSS file path including protocols
* custom_js: JavaScript files to load in every page using default layout
  * relative: Local JS file name,  which should located in `assets/css/custom` (In the example, `gtag.js` should be place as `/assets/js/custom/gtag.js`)
  * absolute: External JS file path including protocols
* exclude: The files to exclude from build(See https://jekyllrb.com/docs/configuration/options/ )
### _data/scene.yml
Create `scene.yml` in `_data` like below

```yaml
scenes:
  - flower
  - daily

entries_per_pages: 6 # should set the value which is common multiple of 2 and 3
thumbnail_size: 1000 # The default value is 800 if omitted
```

Required Elements:
* scenes: The category title to configure as json (For detail, see below)
* entries_per_pages: The number of photos in the single page, each scene page will be separated if the number of photos belong to the scene, like `flower1.html` and `flower2.html`

Optional Elements:
* thumbnail_size: The thumbnail　dimension when generate

### _data/(scene_name).json
Create json file for each scene.
For example, you must create `_data/flower.json` and `_data/daily.json` if you configured `_data/scene.yml` like above.

Structure will be the array of entries like below

```json
[
  {
    "image_large": "flower/flower_1.jpg",
    "image_small": "flower/thumbnail/flower_1.webp",
    "alt": "The cherry blossom",
    "description": "This is the picture taken at the park near my house."
  },
  {
    "image_large": "flower/flower_2.jpg"
  },
  {
    "image_large": "flower/flower_3.jpg",
    "image_small": "flower/thumbnail/flower_3.png"
  }
]
```

Required Element in each entry:
* image_large: File path to show, which relative path from `assets/images/upload/`. I recommend set like `scene_name/file_name`

Optional Elements in each entry:
* image_small: File path to show as the thumbnail, which relative path from `assets/images/upload/`. I recommend set like `scene_name/thubmnail/file_name`
* alt: Short description of the photo, which is used as alt attribute of img tag
* description: Long description of the photo, which will be shown when user hovered a mouse over the photo.

### assets/images/upload/
You must set each photographic into `assets/images/upload/` according to `(scene_name).json`

For example, you must set picture files `assets/images/upload/flower/flower_1.jpg`,
`assets/images/upload/flower/thumbnail/flower_1.webp`, `assets/images/upload/flower/flower_2.jpg`,
`assets/images/upload/flower/flower_3.jpg`, and `assets/images/upload/flower/thumbnail/flower_3.png`.

**Please be careful the file name which does not start with underscore or dot!(The name of file from camera sometimes starts with underscore)**

If `image_small` is omitted in the entry, the thumbnail file will be generated in `assets/images/upload/(scene_name)/thumbnail/(image_large)` during build.

Therefore, `assets/images/upload/flower/thumbnail/flower_2.jpg` will be generated in the example.

**And you must choose one picture per scene, and put it as `assets/images/upload/(scene_name).jpg`**

In the example, you must set `assets/images/upload/flower.jpg` and `assets/images/upload/daily.jpg`.



### Fixed Pages(Optional)
If you want to set some fixed pages like `about.html` and `license.md`, you can put it anywhere according to jekyll.
You can set link to the created file in the menu by setting `show_in_menu: true` in the file.

For example, if you want to create `/about.html`

```html
---
layout: default
title: ABOUT
show_in_menu: true
---

<h2>About me</h2>
<!-- To be continued -->
```

## How to build
### Install dependencies
You need install ruby, ruby-devel, bundle, imagemagick-devel at first.

Next, you should install dependencies by bundle

```bash
$ bundle install
```

### Build website

```bash
$ bundle exec jekyll build
```

Website files will be generated under `_site/`.

### Launch the web server

```bash
$ bundle exec jekyll serve
```

## License
This software is released under the MIT License, see LICENSE.

This project includes [PhotoSwipe](https://photoswipe.com/),
Please See https://github.com/dimsemenov/PhotoSwipe/blob/master/LICENSE
