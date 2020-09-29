---
layout: post
title: "Pretty tables"
author: "datarich(ard)"
date: 2020-09-11 00:00:54 -0900
---

``` r
# packages needed
library(knitr)
library(kableExtra)
```

## R Markdown

This is an R Markdown document. Markdown is a simple formatting syntax
for authoring HTML, PDF, and MS Word documents. It also authors markdown
documents which can be rendered on GitHub. Note that the YAML for this
notebook contains:

    output: github_document

GitHub is very useful for sharing documents and results. However much of
my work involves tabulating data and for some reason GitHub does not
render tables very well in Jupyter notebooks. So this experiment is to
see how GitHub handles tables produced in a R markdown document.

Let’s begin by trying a basic
    table:

``` r
mtcars
```

    ##                      mpg cyl  disp  hp drat    wt  qsec vs am gear carb
    ## Mazda RX4           21.0   6 160.0 110 3.90 2.620 16.46  0  1    4    4
    ## Mazda RX4 Wag       21.0   6 160.0 110 3.90 2.875 17.02  0  1    4    4
    ## Datsun 710          22.8   4 108.0  93 3.85 2.320 18.61  1  1    4    1
    ## Hornet 4 Drive      21.4   6 258.0 110 3.08 3.215 19.44  1  0    3    1
    ## Hornet Sportabout   18.7   8 360.0 175 3.15 3.440 17.02  0  0    3    2
    ## Valiant             18.1   6 225.0 105 2.76 3.460 20.22  1  0    3    1
    ## Duster 360          14.3   8 360.0 245 3.21 3.570 15.84  0  0    3    4
    ## Merc 240D           24.4   4 146.7  62 3.69 3.190 20.00  1  0    4    2
    ## Merc 230            22.8   4 140.8  95 3.92 3.150 22.90  1  0    4    2
    ## Merc 280            19.2   6 167.6 123 3.92 3.440 18.30  1  0    4    4
    ## Merc 280C           17.8   6 167.6 123 3.92 3.440 18.90  1  0    4    4
    ## Merc 450SE          16.4   8 275.8 180 3.07 4.070 17.40  0  0    3    3
    ## Merc 450SL          17.3   8 275.8 180 3.07 3.730 17.60  0  0    3    3
    ## Merc 450SLC         15.2   8 275.8 180 3.07 3.780 18.00  0  0    3    3
    ## Cadillac Fleetwood  10.4   8 472.0 205 2.93 5.250 17.98  0  0    3    4
    ## Lincoln Continental 10.4   8 460.0 215 3.00 5.424 17.82  0  0    3    4
    ## Chrysler Imperial   14.7   8 440.0 230 3.23 5.345 17.42  0  0    3    4
    ## Fiat 128            32.4   4  78.7  66 4.08 2.200 19.47  1  1    4    1
    ## Honda Civic         30.4   4  75.7  52 4.93 1.615 18.52  1  1    4    2
    ## Toyota Corolla      33.9   4  71.1  65 4.22 1.835 19.90  1  1    4    1
    ## Toyota Corona       21.5   4 120.1  97 3.70 2.465 20.01  1  0    3    1
    ## Dodge Challenger    15.5   8 318.0 150 2.76 3.520 16.87  0  0    3    2
    ## AMC Javelin         15.2   8 304.0 150 3.15 3.435 17.30  0  0    3    2
    ## Camaro Z28          13.3   8 350.0 245 3.73 3.840 15.41  0  0    3    4
    ## Pontiac Firebird    19.2   8 400.0 175 3.08 3.845 17.05  0  0    3    2
    ## Fiat X1-9           27.3   4  79.0  66 4.08 1.935 18.90  1  1    4    1
    ## Porsche 914-2       26.0   4 120.3  91 4.43 2.140 16.70  0  1    5    2
    ## Lotus Europa        30.4   4  95.1 113 3.77 1.513 16.90  1  1    5    2
    ## Ford Pantera L      15.8   8 351.0 264 4.22 3.170 14.50  0  1    5    4
    ## Ferrari Dino        19.7   6 145.0 175 3.62 2.770 15.50  0  1    5    6
    ## Maserati Bora       15.0   8 301.0 335 3.54 3.570 14.60  0  1    5    8
    ## Volvo 142E          21.4   4 121.0 109 4.11 2.780 18.60  1  1    4    2

<br>

The motorcars dataframe is a long (32 rows) and wide (11 columns) table,
so it won’t fit on the markdown page and we definitely don’t want to
print all of it. However it also is printing as code-text rather than as
a nice table.  
Let’s see if adding `kable()` helps:

``` r
dt <- mtcars[1:5, 1:6]

head(dt) %>%
  kable(caption = "default")
```

<table>

<caption>

default

</caption>

<thead>

<tr>

<th style="text-align:left;">

</th>

<th style="text-align:right;">

mpg

</th>

<th style="text-align:right;">

cyl

</th>

<th style="text-align:right;">

disp

</th>

<th style="text-align:right;">

hp

</th>

<th style="text-align:right;">

drat

</th>

<th style="text-align:right;">

wt

</th>

</tr>

</thead>

<tbody>

<tr>

<td style="text-align:left;">

Mazda RX4

</td>

<td style="text-align:right;">

21.0

</td>

<td style="text-align:right;">

6

</td>

<td style="text-align:right;">

160

</td>

<td style="text-align:right;">

110

</td>

<td style="text-align:right;">

3.90

</td>

<td style="text-align:right;">

2.620

</td>

</tr>

<tr>

<td style="text-align:left;">

Mazda RX4 Wag

</td>

<td style="text-align:right;">

21.0

</td>

<td style="text-align:right;">

6

</td>

<td style="text-align:right;">

160

</td>

<td style="text-align:right;">

110

</td>

<td style="text-align:right;">

3.90

</td>

<td style="text-align:right;">

2.875

</td>

</tr>

<tr>

<td style="text-align:left;">

Datsun 710

</td>

<td style="text-align:right;">

22.8

</td>

<td style="text-align:right;">

4

</td>

<td style="text-align:right;">

108

</td>

<td style="text-align:right;">

93

</td>

<td style="text-align:right;">

3.85

</td>

<td style="text-align:right;">

2.320

</td>

</tr>

<tr>

<td style="text-align:left;">

Hornet 4 Drive

</td>

<td style="text-align:right;">

21.4

</td>

<td style="text-align:right;">

6

</td>

<td style="text-align:right;">

258

</td>

<td style="text-align:right;">

110

</td>

<td style="text-align:right;">

3.08

</td>

<td style="text-align:right;">

3.215

</td>

</tr>

<tr>

<td style="text-align:left;">

Hornet Sportabout

</td>

<td style="text-align:right;">

18.7

</td>

<td style="text-align:right;">

8

</td>

<td style="text-align:right;">

360

</td>

<td style="text-align:right;">

175

</td>

<td style="text-align:right;">

3.15

</td>

<td style="text-align:right;">

3.440

</td>

</tr>

</tbody>

</table>

<br>

kable prints nicer tables, along with a centered heading.

kable also provides a format argument. There are five options: **latex,
markdown, html, pandoc** and **rst**. It is automatically set but
providing the argument should override that. Let’s try markdown:

``` r
head(dt) %>%
  kable(format = "markdown", caption = "Markdown")
```

|                   |  mpg | cyl | disp |  hp | drat |    wt |
| :---------------- | ---: | --: | ---: | --: | ---: | ----: |
| Mazda RX4         | 21.0 |   6 |  160 | 110 | 3.90 | 2.620 |
| Mazda RX4 Wag     | 21.0 |   6 |  160 | 110 | 3.90 | 2.875 |
| Datsun 710        | 22.8 |   4 |  108 |  93 | 3.85 | 2.320 |
| Hornet 4 Drive    | 21.4 |   6 |  258 | 110 | 3.08 | 3.215 |
| Hornet Sportabout | 18.7 |   8 |  360 | 175 | 3.15 | 3.440 |

<br>

Same as kable except the heading/caption seems to be missing.

Let’s try html:

``` r
head(dt) %>%
  kable(format = "html", caption = "HTML")
```

<table>

<caption>

HTML

</caption>

<thead>

<tr>

<th style="text-align:left;">

</th>

<th style="text-align:right;">

mpg

</th>

<th style="text-align:right;">

cyl

</th>

<th style="text-align:right;">

disp

</th>

<th style="text-align:right;">

hp

</th>

<th style="text-align:right;">

drat

</th>

<th style="text-align:right;">

wt

</th>

</tr>

</thead>

<tbody>

<tr>

<td style="text-align:left;">

Mazda RX4

</td>

<td style="text-align:right;">

21.0

</td>

<td style="text-align:right;">

6

</td>

<td style="text-align:right;">

160

</td>

<td style="text-align:right;">

110

</td>

<td style="text-align:right;">

3.90

</td>

<td style="text-align:right;">

2.620

</td>

</tr>

<tr>

<td style="text-align:left;">

Mazda RX4 Wag

</td>

<td style="text-align:right;">

21.0

</td>

<td style="text-align:right;">

6

</td>

<td style="text-align:right;">

160

</td>

<td style="text-align:right;">

110

</td>

<td style="text-align:right;">

3.90

</td>

<td style="text-align:right;">

2.875

</td>

</tr>

<tr>

<td style="text-align:left;">

Datsun 710

</td>

<td style="text-align:right;">

22.8

</td>

<td style="text-align:right;">

4

</td>

<td style="text-align:right;">

108

</td>

<td style="text-align:right;">

93

</td>

<td style="text-align:right;">

3.85

</td>

<td style="text-align:right;">

2.320

</td>

</tr>

<tr>

<td style="text-align:left;">

Hornet 4 Drive

</td>

<td style="text-align:right;">

21.4

</td>

<td style="text-align:right;">

6

</td>

<td style="text-align:right;">

258

</td>

<td style="text-align:right;">

110

</td>

<td style="text-align:right;">

3.08

</td>

<td style="text-align:right;">

3.215

</td>

</tr>

<tr>

<td style="text-align:left;">

Hornet Sportabout

</td>

<td style="text-align:right;">

18.7

</td>

<td style="text-align:right;">

8

</td>

<td style="text-align:right;">

360

</td>

<td style="text-align:right;">

175

</td>

<td style="text-align:right;">

3.15

</td>

<td style="text-align:right;">

3.440

</td>

</tr>

</tbody>

</table>

<br>

With html, we get the requested heading/caption “html” but the layout
(row height) looks a bit spacier.

Testing pandoc:

``` r
head(dt) %>%
  kable(format = "pandoc", caption = "Pandoc")
```

|                   |  mpg | cyl | disp |  hp | drat |    wt |
| ----------------- | ---: | --: | ---: | --: | ---: | ----: |
| Mazda RX4         | 21.0 |   6 |  160 | 110 | 3.90 | 2.620 |
| Mazda RX4 Wag     | 21.0 |   6 |  160 | 110 | 3.90 | 2.875 |
| Datsun 710        | 22.8 |   4 |  108 |  93 | 3.85 | 2.320 |
| Hornet 4 Drive    | 21.4 |   6 |  258 | 110 | 3.08 | 3.215 |
| Hornet Sportabout | 18.7 |   8 |  360 | 175 | 3.15 | 3.440 |

Pandoc

<br>

Same as kable except the heading/caption appears at the bottom left.

Testing latex:

``` r
head(dt) %>%
  kable(format = "latex", caption = "latex")
```

<br>

Nada.

Testing RST:

``` r
head(dt) %>%
  kable(format = "rst", caption = "RST")
```

\================= ==== === ==== === ==== =====   mpg cyl disp hp drat
wt ================= ==== === ==== === ==== ===== Mazda RX4 21.0 6 160
110 3.90 2.620 Mazda RX4 Wag 21.0 6 160 110 3.90 2.875 Datsun 710 22.8 4
108 93 3.85 2.320 Hornet 4 Drive 21.4 6 258 110 3.08 3.215 Hornet
Sportabout 18.7 8 360 175 3.15 3.440 ================= ==== === ==== ===
==== =====

<br>

Nope..\!

So, the default options for markdown and pandoc are rendered nicely,
although markdown is missing the caption and pandoc prints the caption
at the bottom of the table (is this where it should be?). HTML renders
nicely with a heading/caption, but it is less compact and a bit spacier
than markdown or pandoc. Latex doesn’t render at all and rst is garbled.

Let’s try the kableExtra features.

``` r
head(dt) %>%
  kable(caption = "kableExtra") %>%
  kable_styling()
```

<table class="table" style="margin-left: auto; margin-right: auto;">

<caption>

kableExtra

</caption>

<thead>

<tr>

<th style="text-align:left;">

</th>

<th style="text-align:right;">

mpg

</th>

<th style="text-align:right;">

cyl

</th>

<th style="text-align:right;">

disp

</th>

<th style="text-align:right;">

hp

</th>

<th style="text-align:right;">

drat

</th>

<th style="text-align:right;">

wt

</th>

</tr>

</thead>

<tbody>

<tr>

<td style="text-align:left;">

Mazda RX4

</td>

<td style="text-align:right;">

21.0

</td>

<td style="text-align:right;">

6

</td>

<td style="text-align:right;">

160

</td>

<td style="text-align:right;">

110

</td>

<td style="text-align:right;">

3.90

</td>

<td style="text-align:right;">

2.620

</td>

</tr>

<tr>

<td style="text-align:left;">

Mazda RX4 Wag

</td>

<td style="text-align:right;">

21.0

</td>

<td style="text-align:right;">

6

</td>

<td style="text-align:right;">

160

</td>

<td style="text-align:right;">

110

</td>

<td style="text-align:right;">

3.90

</td>

<td style="text-align:right;">

2.875

</td>

</tr>

<tr>

<td style="text-align:left;">

Datsun 710

</td>

<td style="text-align:right;">

22.8

</td>

<td style="text-align:right;">

4

</td>

<td style="text-align:right;">

108

</td>

<td style="text-align:right;">

93

</td>

<td style="text-align:right;">

3.85

</td>

<td style="text-align:right;">

2.320

</td>

</tr>

<tr>

<td style="text-align:left;">

Hornet 4 Drive

</td>

<td style="text-align:right;">

21.4

</td>

<td style="text-align:right;">

6

</td>

<td style="text-align:right;">

258

</td>

<td style="text-align:right;">

110

</td>

<td style="text-align:right;">

3.08

</td>

<td style="text-align:right;">

3.215

</td>

</tr>

<tr>

<td style="text-align:left;">

Hornet Sportabout

</td>

<td style="text-align:right;">

18.7

</td>

<td style="text-align:right;">

8

</td>

<td style="text-align:right;">

360

</td>

<td style="text-align:right;">

175

</td>

<td style="text-align:right;">

3.15

</td>

<td style="text-align:right;">

3.440

</td>

</tr>

</tbody>

</table>

<br>

That doesn’t change much that we have already seen, although it looks
like the spacy layout of html. Let’s try some fancier options, such as
grouped columns, which would be a very handy feature if it works.

Grouped columns:

``` r
kable(dt, caption = "Grouped columns") %>%
  kable_styling("striped") %>%
  add_header_above(c(" " = 1, "Group 1" = 2, "Group 2" = 2, "Group 3" = 2))
```

<table class="table table-striped" style="margin-left: auto; margin-right: auto;">

<caption>

Grouped
columns

</caption>

<thead>

<tr>

<th style="border-bottom:hidden" colspan="1">

</th>

<th style="border-bottom:hidden; padding-bottom:0; padding-left:3px;padding-right:3px;text-align: center; " colspan="2">

<div style="border-bottom: 1px solid #ddd; padding-bottom: 5px; ">

Group
1

</div>

</th>

<th style="border-bottom:hidden; padding-bottom:0; padding-left:3px;padding-right:3px;text-align: center; " colspan="2">

<div style="border-bottom: 1px solid #ddd; padding-bottom: 5px; ">

Group
2

</div>

</th>

<th style="border-bottom:hidden; padding-bottom:0; padding-left:3px;padding-right:3px;text-align: center; " colspan="2">

<div style="border-bottom: 1px solid #ddd; padding-bottom: 5px; ">

Group 3

</div>

</th>

</tr>

<tr>

<th style="text-align:left;">

</th>

<th style="text-align:right;">

mpg

</th>

<th style="text-align:right;">

cyl

</th>

<th style="text-align:right;">

disp

</th>

<th style="text-align:right;">

hp

</th>

<th style="text-align:right;">

drat

</th>

<th style="text-align:right;">

wt

</th>

</tr>

</thead>

<tbody>

<tr>

<td style="text-align:left;">

Mazda RX4

</td>

<td style="text-align:right;">

21.0

</td>

<td style="text-align:right;">

6

</td>

<td style="text-align:right;">

160

</td>

<td style="text-align:right;">

110

</td>

<td style="text-align:right;">

3.90

</td>

<td style="text-align:right;">

2.620

</td>

</tr>

<tr>

<td style="text-align:left;">

Mazda RX4 Wag

</td>

<td style="text-align:right;">

21.0

</td>

<td style="text-align:right;">

6

</td>

<td style="text-align:right;">

160

</td>

<td style="text-align:right;">

110

</td>

<td style="text-align:right;">

3.90

</td>

<td style="text-align:right;">

2.875

</td>

</tr>

<tr>

<td style="text-align:left;">

Datsun 710

</td>

<td style="text-align:right;">

22.8

</td>

<td style="text-align:right;">

4

</td>

<td style="text-align:right;">

108

</td>

<td style="text-align:right;">

93

</td>

<td style="text-align:right;">

3.85

</td>

<td style="text-align:right;">

2.320

</td>

</tr>

<tr>

<td style="text-align:left;">

Hornet 4 Drive

</td>

<td style="text-align:right;">

21.4

</td>

<td style="text-align:right;">

6

</td>

<td style="text-align:right;">

258

</td>

<td style="text-align:right;">

110

</td>

<td style="text-align:right;">

3.08

</td>

<td style="text-align:right;">

3.215

</td>

</tr>

<tr>

<td style="text-align:left;">

Hornet Sportabout

</td>

<td style="text-align:right;">

18.7

</td>

<td style="text-align:right;">

8

</td>

<td style="text-align:right;">

360

</td>

<td style="text-align:right;">

175

</td>

<td style="text-align:right;">

3.15

</td>

<td style="text-align:right;">

3.440

</td>

</tr>

</tbody>

</table>

<br>

Grouping by row is also possible:

``` r
kable(mtcars[1:10, 1:6], caption = "Grouped Rows") %>%
  kable_styling("striped", full_width = F) %>%
  pack_rows("Group 1", 4, 7) %>%
  pack_rows("Group 2", 8, 10)
```

<table class="table table-striped" style="width: auto !important; margin-left: auto; margin-right: auto;">

<caption>

Grouped Rows

</caption>

<thead>

<tr>

<th style="text-align:left;">

</th>

<th style="text-align:right;">

mpg

</th>

<th style="text-align:right;">

cyl

</th>

<th style="text-align:right;">

disp

</th>

<th style="text-align:right;">

hp

</th>

<th style="text-align:right;">

drat

</th>

<th style="text-align:right;">

wt

</th>

</tr>

</thead>

<tbody>

<tr>

<td style="text-align:left;">

Mazda RX4

</td>

<td style="text-align:right;">

21.0

</td>

<td style="text-align:right;">

6

</td>

<td style="text-align:right;">

160.0

</td>

<td style="text-align:right;">

110

</td>

<td style="text-align:right;">

3.90

</td>

<td style="text-align:right;">

2.620

</td>

</tr>

<tr>

<td style="text-align:left;">

Mazda RX4 Wag

</td>

<td style="text-align:right;">

21.0

</td>

<td style="text-align:right;">

6

</td>

<td style="text-align:right;">

160.0

</td>

<td style="text-align:right;">

110

</td>

<td style="text-align:right;">

3.90

</td>

<td style="text-align:right;">

2.875

</td>

</tr>

<tr>

<td style="text-align:left;">

Datsun 710

</td>

<td style="text-align:right;">

22.8

</td>

<td style="text-align:right;">

4

</td>

<td style="text-align:right;">

108.0

</td>

<td style="text-align:right;">

93

</td>

<td style="text-align:right;">

3.85

</td>

<td style="text-align:right;">

2.320

</td>

</tr>

<tr grouplength="4">

<td colspan="7" style="border-bottom: 1px solid;">

<strong>Group 1</strong>

</td>

</tr>

<tr>

<td style="text-align:left; padding-left: 2em;" indentlevel="1">

Hornet 4 Drive

</td>

<td style="text-align:right;">

21.4

</td>

<td style="text-align:right;">

6

</td>

<td style="text-align:right;">

258.0

</td>

<td style="text-align:right;">

110

</td>

<td style="text-align:right;">

3.08

</td>

<td style="text-align:right;">

3.215

</td>

</tr>

<tr>

<td style="text-align:left; padding-left: 2em;" indentlevel="1">

Hornet Sportabout

</td>

<td style="text-align:right;">

18.7

</td>

<td style="text-align:right;">

8

</td>

<td style="text-align:right;">

360.0

</td>

<td style="text-align:right;">

175

</td>

<td style="text-align:right;">

3.15

</td>

<td style="text-align:right;">

3.440

</td>

</tr>

<tr>

<td style="text-align:left; padding-left: 2em;" indentlevel="1">

Valiant

</td>

<td style="text-align:right;">

18.1

</td>

<td style="text-align:right;">

6

</td>

<td style="text-align:right;">

225.0

</td>

<td style="text-align:right;">

105

</td>

<td style="text-align:right;">

2.76

</td>

<td style="text-align:right;">

3.460

</td>

</tr>

<tr>

<td style="text-align:left; padding-left: 2em;" indentlevel="1">

Duster 360

</td>

<td style="text-align:right;">

14.3

</td>

<td style="text-align:right;">

8

</td>

<td style="text-align:right;">

360.0

</td>

<td style="text-align:right;">

245

</td>

<td style="text-align:right;">

3.21

</td>

<td style="text-align:right;">

3.570

</td>

</tr>

<tr grouplength="3">

<td colspan="7" style="border-bottom: 1px solid;">

<strong>Group 2</strong>

</td>

</tr>

<tr>

<td style="text-align:left; padding-left: 2em;" indentlevel="1">

Merc 240D

</td>

<td style="text-align:right;">

24.4

</td>

<td style="text-align:right;">

4

</td>

<td style="text-align:right;">

146.7

</td>

<td style="text-align:right;">

62

</td>

<td style="text-align:right;">

3.69

</td>

<td style="text-align:right;">

3.190

</td>

</tr>

<tr>

<td style="text-align:left; padding-left: 2em;" indentlevel="1">

Merc 230

</td>

<td style="text-align:right;">

22.8

</td>

<td style="text-align:right;">

4

</td>

<td style="text-align:right;">

140.8

</td>

<td style="text-align:right;">

95

</td>

<td style="text-align:right;">

3.92

</td>

<td style="text-align:right;">

3.150

</td>

</tr>

<tr>

<td style="text-align:left; padding-left: 2em;" indentlevel="1">

Merc 280

</td>

<td style="text-align:right;">

19.2

</td>

<td style="text-align:right;">

6

</td>

<td style="text-align:right;">

167.6

</td>

<td style="text-align:right;">

123

</td>

<td style="text-align:right;">

3.92

</td>

<td style="text-align:right;">

3.440

</td>

</tr>

</tbody>

</table>

<br>
