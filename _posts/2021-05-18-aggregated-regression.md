Aggregated regression in R
================
Dr Richard Morris
18/05/2021

#### Aggregated regression

Aggregated regression performs the regression on aggregated (i.e.,
summary) data rather than individual data. For `binomial` and
`quasibinomial` families, the `glm` function allows you to specify the
response variable as a two-column matrix with the columns giving the
numbers of successess and failures.

e.g., `formula = cbind(successes, failures) ~ x1 + x2 + 1`

The weights argument in `glm` can be used to indicate the precision of
each observation. Equivalently, when the elements of `weights` are
positive integers, each element indicates the number of observations in
each unit. The `weights` can also be used to give the number of trials
when the response is the proportion of successes in a binomial GLM.

#### Examples

Normally we perform regression on individual data. For example, using
the “mtcars” dataset which contains the records of 30-odd different
cars:

``` r
mtcars %>%
  knitr::kable()
```

|                     |  mpg | cyl |  disp |  hp | drat |    wt |  qsec |  vs |  am | gear | carb |
|:--------------------|-----:|----:|------:|----:|-----:|------:|------:|----:|----:|-----:|-----:|
| Mazda RX4           | 21.0 |   6 | 160.0 | 110 | 3.90 | 2.620 | 16.46 |   0 |   1 |    4 |    4 |
| Mazda RX4 Wag       | 21.0 |   6 | 160.0 | 110 | 3.90 | 2.875 | 17.02 |   0 |   1 |    4 |    4 |
| Datsun 710          | 22.8 |   4 | 108.0 |  93 | 3.85 | 2.320 | 18.61 |   1 |   1 |    4 |    1 |
| Hornet 4 Drive      | 21.4 |   6 | 258.0 | 110 | 3.08 | 3.215 | 19.44 |   1 |   0 |    3 |    1 |
| Hornet Sportabout   | 18.7 |   8 | 360.0 | 175 | 3.15 | 3.440 | 17.02 |   0 |   0 |    3 |    2 |
| Valiant             | 18.1 |   6 | 225.0 | 105 | 2.76 | 3.460 | 20.22 |   1 |   0 |    3 |    1 |
| Duster 360          | 14.3 |   8 | 360.0 | 245 | 3.21 | 3.570 | 15.84 |   0 |   0 |    3 |    4 |
| Merc 240D           | 24.4 |   4 | 146.7 |  62 | 3.69 | 3.190 | 20.00 |   1 |   0 |    4 |    2 |
| Merc 230            | 22.8 |   4 | 140.8 |  95 | 3.92 | 3.150 | 22.90 |   1 |   0 |    4 |    2 |
| Merc 280            | 19.2 |   6 | 167.6 | 123 | 3.92 | 3.440 | 18.30 |   1 |   0 |    4 |    4 |
| Merc 280C           | 17.8 |   6 | 167.6 | 123 | 3.92 | 3.440 | 18.90 |   1 |   0 |    4 |    4 |
| Merc 450SE          | 16.4 |   8 | 275.8 | 180 | 3.07 | 4.070 | 17.40 |   0 |   0 |    3 |    3 |
| Merc 450SL          | 17.3 |   8 | 275.8 | 180 | 3.07 | 3.730 | 17.60 |   0 |   0 |    3 |    3 |
| Merc 450SLC         | 15.2 |   8 | 275.8 | 180 | 3.07 | 3.780 | 18.00 |   0 |   0 |    3 |    3 |
| Cadillac Fleetwood  | 10.4 |   8 | 472.0 | 205 | 2.93 | 5.250 | 17.98 |   0 |   0 |    3 |    4 |
| Lincoln Continental | 10.4 |   8 | 460.0 | 215 | 3.00 | 5.424 | 17.82 |   0 |   0 |    3 |    4 |
| Chrysler Imperial   | 14.7 |   8 | 440.0 | 230 | 3.23 | 5.345 | 17.42 |   0 |   0 |    3 |    4 |
| Fiat 128            | 32.4 |   4 |  78.7 |  66 | 4.08 | 2.200 | 19.47 |   1 |   1 |    4 |    1 |
| Honda Civic         | 30.4 |   4 |  75.7 |  52 | 4.93 | 1.615 | 18.52 |   1 |   1 |    4 |    2 |
| Toyota Corolla      | 33.9 |   4 |  71.1 |  65 | 4.22 | 1.835 | 19.90 |   1 |   1 |    4 |    1 |
| Toyota Corona       | 21.5 |   4 | 120.1 |  97 | 3.70 | 2.465 | 20.01 |   1 |   0 |    3 |    1 |
| Dodge Challenger    | 15.5 |   8 | 318.0 | 150 | 2.76 | 3.520 | 16.87 |   0 |   0 |    3 |    2 |
| AMC Javelin         | 15.2 |   8 | 304.0 | 150 | 3.15 | 3.435 | 17.30 |   0 |   0 |    3 |    2 |
| Camaro Z28          | 13.3 |   8 | 350.0 | 245 | 3.73 | 3.840 | 15.41 |   0 |   0 |    3 |    4 |
| Pontiac Firebird    | 19.2 |   8 | 400.0 | 175 | 3.08 | 3.845 | 17.05 |   0 |   0 |    3 |    2 |
| Fiat X1-9           | 27.3 |   4 |  79.0 |  66 | 4.08 | 1.935 | 18.90 |   1 |   1 |    4 |    1 |
| Porsche 914-2       | 26.0 |   4 | 120.3 |  91 | 4.43 | 2.140 | 16.70 |   0 |   1 |    5 |    2 |
| Lotus Europa        | 30.4 |   4 |  95.1 | 113 | 3.77 | 1.513 | 16.90 |   1 |   1 |    5 |    2 |
| Ford Pantera L      | 15.8 |   8 | 351.0 | 264 | 4.22 | 3.170 | 14.50 |   0 |   1 |    5 |    4 |
| Ferrari Dino        | 19.7 |   6 | 145.0 | 175 | 3.62 | 2.770 | 15.50 |   0 |   1 |    5 |    6 |
| Maserati Bora       | 15.0 |   8 | 301.0 | 335 | 3.54 | 3.570 | 14.60 |   0 |   1 |    5 |    8 |
| Volvo 142E          | 21.4 |   4 | 121.0 | 109 | 4.11 | 2.780 | 18.60 |   1 |   1 |    4 |    2 |

<br>

A logistic regression to predict the transmission type (“am \~ vs +
cyl”) would be performed like this:

``` r
summary(glm(am ~ as.factor(cyl), 
            data = mtcars, 
            family = binomial(link = "logit")))
```

    ## 
    ## Call:
    ## glm(formula = am ~ as.factor(cyl), family = binomial(link = "logit"), 
    ##     data = mtcars)
    ## 
    ## Deviance Residuals: 
    ##     Min       1Q   Median       3Q      Max  
    ## -1.6120  -0.5553  -0.5553   0.7981   1.9728  
    ## 
    ## Coefficients:
    ##                 Estimate Std. Error z value Pr(>|z|)   
    ## (Intercept)       0.9808     0.6770   1.449   0.1474   
    ## as.factor(cyl)6  -1.2685     1.0206  -1.243   0.2139   
    ## as.factor(cyl)8  -2.7726     1.0206  -2.717   0.0066 **
    ## ---
    ## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
    ## 
    ## (Dispersion parameter for binomial family taken to be 1)
    ## 
    ##     Null deviance: 43.230  on 31  degrees of freedom
    ## Residual deviance: 33.935  on 29  degrees of freedom
    ## AIC: 39.935
    ## 
    ## Number of Fisher Scoring iterations: 4

<br>

Note the degrees of freedom indicate the number of observations in the
dataset.

On the other hand, aggregated or summary data might look like this:

##### Aggregated counts

``` r
mtcars_cnt <- count(mtcars, cyl, am)

knitr::kable(mtcars_cnt)
```

| cyl |  am |   n |
|----:|----:|----:|
|   4 |   0 |   3 |
|   4 |   1 |   8 |
|   6 |   0 |   4 |
|   6 |   1 |   3 |
|   8 |   0 |  12 |
|   8 |   1 |   2 |

<br>

An aggregated regression is performed using the weights argument to
indicate the units per response:

``` r
summary(glm(am ~ as.factor(cyl), 
            data = mtcars_cnt, 
            family = binomial(link = "logit"),
            weights = n
            ))
```

    ## 
    ## Call:
    ## glm(formula = am ~ as.factor(cyl), family = binomial(link = "logit"), 
    ##     data = mtcars_cnt, weights = n)
    ## 
    ## Deviance Residuals: 
    ##      1       2       3       4       5       6  
    ## -2.792   2.257  -2.116   2.255  -1.923   2.790  
    ## 
    ## Coefficients:
    ##                 Estimate Std. Error z value Pr(>|z|)   
    ## (Intercept)       0.9808     0.6770   1.449  0.14740   
    ## as.factor(cyl)6  -1.2685     1.0206  -1.243  0.21391   
    ## as.factor(cyl)8  -2.7726     1.0206  -2.717  0.00659 **
    ## ---
    ## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
    ## 
    ## (Dispersion parameter for binomial family taken to be 1)
    ## 
    ##     Null deviance: 43.230  on 5  degrees of freedom
    ## Residual deviance: 33.935  on 3  degrees of freedom
    ## AIC: 39.935
    ## 
    ## Number of Fisher Scoring iterations: 4

<br>

Note the degrees of freedom are incorrect, but the estimates, standard
errors and p-values are very similar (although not identical).

<br>

Aggregated data might also look like this:

##### Aggregated proportions

``` r
mtcars_wcnt <- count(mtcars, cyl, am) %>%
  spread(am, n, fill = 0) %>%
  rename(auto = `1`, man = `0`) %>%
  mutate(n = man + auto,
         p = auto / n)

knitr::kable(mtcars_wcnt)
```

| cyl | man | auto |   n |         p |
|----:|----:|-----:|----:|----------:|
|   4 |   3 |    8 |  11 | 0.7272727 |
|   6 |   4 |    3 |   7 | 0.4285714 |
|   8 |  12 |    2 |  14 | 0.1428571 |

<br>

The formula and weights arguments need updating:

``` r
summary(glm(p ~ as.factor(cyl), 
            data = mtcars_wcnt, 
            family = binomial(link = "logit"),
            weights = n
            ))
```

    ## 
    ## Call:
    ## glm(formula = p ~ as.factor(cyl), family = binomial(link = "logit"), 
    ##     data = mtcars_wcnt, weights = n)
    ## 
    ## Deviance Residuals: 
    ## [1]  0  0  0
    ## 
    ## Coefficients:
    ##                 Estimate Std. Error z value Pr(>|z|)   
    ## (Intercept)       0.9808     0.6770   1.449   0.1474   
    ## as.factor(cyl)6  -1.2685     1.0206  -1.243   0.2139   
    ## as.factor(cyl)8  -2.7726     1.0206  -2.717   0.0066 **
    ## ---
    ## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
    ## 
    ## (Dispersion parameter for binomial family taken to be 1)
    ## 
    ##     Null deviance: 9.2948e+00  on 2  degrees of freedom
    ## Residual deviance: 8.8818e-16  on 0  degrees of freedom
    ## AIC: 13.591
    ## 
    ## Number of Fisher Scoring iterations: 4

<br>

So far very similar results across aggregates and individual datasets.
However as we start to add independent variables (especially continuous
variables), results begin to diverge. Below we add `carb` and `mpg` as
predictors:

##### Individual

``` r
summary(glm(formula = am ~ as.factor(cyl) + carb + mpg,
      family = binomial,
      data = mtcars))
```

    ## 
    ## Call:
    ## glm(formula = am ~ as.factor(cyl) + carb + mpg, family = binomial, 
    ##     data = mtcars)
    ## 
    ## Deviance Residuals: 
    ##     Min       1Q   Median       3Q      Max  
    ## -1.8933  -0.4595  -0.1293   0.1475   1.6969  
    ## 
    ## Coefficients:
    ##                 Estimate Std. Error z value Pr(>|z|)  
    ## (Intercept)     -18.3024     9.3442  -1.959   0.0501 .
    ## as.factor(cyl)6  -1.8594     2.5963  -0.716   0.4739  
    ## as.factor(cyl)8  -0.3029     2.8828  -0.105   0.9163  
    ## carb              1.6959     0.9918   1.710   0.0873 .
    ## mpg               0.6771     0.3645   1.858   0.0632 .
    ## ---
    ## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
    ## 
    ## (Dispersion parameter for binomial family taken to be 1)
    ## 
    ##     Null deviance: 43.230  on 31  degrees of freedom
    ## Residual deviance: 18.467  on 27  degrees of freedom
    ## AIC: 28.467
    ## 
    ## Number of Fisher Scoring iterations: 6

<br>

##### Aggregated proportions

``` r
mtcars_p <- mtcars %>%
  group_by(cyl, carb) %>%
  summarise(
    n = n(),
    am  = sum(am)/n,
    mpg = mean(mpg)
  )
```

    ## `summarise()` has grouped output by 'cyl'. You can override using the `.groups` argument.

``` r
knitr::kable(mtcars_p)
```

| cyl | carb |   n |        am |   mpg |
|----:|-----:|----:|----------:|------:|
|   4 |    1 |   5 | 0.8000000 | 27.58 |
|   4 |    2 |   6 | 0.6666667 | 25.90 |
|   6 |    1 |   2 | 0.0000000 | 19.75 |
|   6 |    4 |   4 | 0.5000000 | 19.75 |
|   6 |    6 |   1 | 1.0000000 | 19.70 |
|   8 |    2 |   4 | 0.0000000 | 17.15 |
|   8 |    3 |   3 | 0.0000000 | 16.30 |
|   8 |    4 |   6 | 0.1666667 | 13.15 |
|   8 |    8 |   1 | 1.0000000 | 15.00 |

<br>

``` r
  glm(formula = am ~ as.factor(cyl) + carb + mpg,
      family = binomial,
      data = mtcars_p,
      weights = n
      ) %>%
  summary()
```

    ## 
    ## Call:
    ## glm(formula = am ~ as.factor(cyl) + carb + mpg, family = binomial, 
    ##     data = mtcars_p, weights = n)
    ## 
    ## Deviance Residuals: 
    ##        1         2         3         4         5         6         7         8  
    ##  0.75845  -0.73755  -0.24505  -0.02649   0.34041  -0.50528  -0.74002   0.46178  
    ##        9  
    ##  0.17387  
    ## 
    ## Coefficients:
    ##                 Estimate Std. Error z value Pr(>|z|)
    ## (Intercept)     -11.3593    19.9611  -0.569    0.569
    ## as.factor(cyl)6  -1.7932     3.7491  -0.478    0.632
    ## as.factor(cyl)8  -1.4419     7.3124  -0.197    0.844
    ## carb              1.4059     1.0718   1.312    0.190
    ## mpg               0.3825     0.7014   0.545    0.585
    ## 
    ## (Dispersion parameter for binomial family taken to be 1)
    ## 
    ##     Null deviance: 19.6356  on 8  degrees of freedom
    ## Residual deviance:  2.3423  on 4  degrees of freedom
    ## AIC: 20.134
    ## 
    ## Number of Fisher Scoring iterations: 6

<br>

The standard errors are now larger, and the loss of efficiency is
affecting inference.

<br><br>

Also, beware of trying to aggregate like so:

##### Aggregated counts

``` r
mtcars_wcnt <- mtcars %>%
  group_by(cyl, carb, am) %>%
  summarise(
    mpg = mean(mpg),
    n = n()
    )
```

    ## `summarise()` has grouped output by 'cyl', 'carb'. You can override using the `.groups` argument.

``` r
knitr::kable(mtcars_wcnt)
```

| cyl | carb |  am |   mpg |   n |
|----:|-----:|----:|------:|----:|
|   4 |    1 |   0 | 21.50 |   1 |
|   4 |    1 |   1 | 29.10 |   4 |
|   4 |    2 |   0 | 23.60 |   2 |
|   4 |    2 |   1 | 27.05 |   4 |
|   6 |    1 |   0 | 19.75 |   2 |
|   6 |    4 |   0 | 18.50 |   2 |
|   6 |    4 |   1 | 21.00 |   2 |
|   6 |    6 |   1 | 19.70 |   1 |
|   8 |    2 |   0 | 17.15 |   4 |
|   8 |    3 |   0 | 16.30 |   3 |
|   8 |    4 |   0 | 12.62 |   5 |
|   8 |    4 |   1 | 15.80 |   1 |
|   8 |    8 |   1 | 15.00 |   1 |

<br>

``` r
glm(formula = am ~ as.factor(cyl) + carb + mpg,
    family = binomial,
    data = mtcars_wcnt,
    weights = n
  ) %>%
  summary()
```

    ## Warning: glm.fit: algorithm did not converge

    ## Warning: glm.fit: fitted probabilities numerically 0 or 1 occurred

    ## 
    ## Call:
    ## glm(formula = am ~ as.factor(cyl) + carb + mpg, family = binomial, 
    ##     data = mtcars_wcnt, weights = n)
    ## 
    ## Deviance Residuals: 
    ##        Min          1Q      Median          3Q         Max  
    ## -1.885e-05  -4.710e-08  -2.110e-08   4.210e-08   1.445e-05  
    ## 
    ## Coefficients:
    ##                   Estimate Std. Error z value Pr(>|z|)
    ## (Intercept)        -605.51 1070920.77  -0.001    1.000
    ## as.factor(cyl)6     -10.83  280328.45   0.000    1.000
    ## as.factor(cyl)8      90.23  371331.49   0.000    1.000
    ## carb                 56.42   79751.45   0.001    0.999
    ## mpg                  19.78   38329.66   0.001    1.000
    ## 
    ## (Dispersion parameter for binomial family taken to be 1)
    ## 
    ##     Null deviance: 4.3230e+01  on 12  degrees of freedom
    ## Residual deviance: 7.5814e-10  on  8  degrees of freedom
    ## AIC: 10
    ## 
    ## Number of Fisher Scoring iterations: 25
