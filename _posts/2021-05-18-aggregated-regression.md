---
layout: post
title: "Aggregated regression in R"
author: "datarich(ard)"
---


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
  head(10) %>%
  knitr::kable()
```

|                   |  mpg | cyl |  disp |  hp | drat |    wt |  qsec |  vs |  am | gear | carb |
|:------------------|-----:|----:|------:|----:|-----:|------:|------:|----:|----:|-----:|-----:|
| Mazda RX4         | 21.0 |   6 | 160.0 | 110 | 3.90 | 2.620 | 16.46 |   0 |   1 |    4 |    4 |
| Mazda RX4 Wag     | 21.0 |   6 | 160.0 | 110 | 3.90 | 2.875 | 17.02 |   0 |   1 |    4 |    4 |
| Datsun 710        | 22.8 |   4 | 108.0 |  93 | 3.85 | 2.320 | 18.61 |   1 |   1 |    4 |    1 |
| Hornet 4 Drive    | 21.4 |   6 | 258.0 | 110 | 3.08 | 3.215 | 19.44 |   1 |   0 |    3 |    1 |
| Hornet Sportabout | 18.7 |   8 | 360.0 | 175 | 3.15 | 3.440 | 17.02 |   0 |   0 |    3 |    2 |
| Valiant           | 18.1 |   6 | 225.0 | 105 | 2.76 | 3.460 | 20.22 |   1 |   0 |    3 |    1 |
| Duster 360        | 14.3 |   8 | 360.0 | 245 | 3.21 | 3.570 | 15.84 |   0 |   0 |    3 |    4 |
| Merc 240D         | 24.4 |   4 | 146.7 |  62 | 3.69 | 3.190 | 20.00 |   1 |   0 |    4 |    2 |
| Merc 230          | 22.8 |   4 | 140.8 |  95 | 3.92 | 3.150 | 22.90 |   1 |   0 |    4 |    2 |
| Merc 280          | 19.2 |   6 | 167.6 | 123 | 3.92 | 3.440 | 18.30 |   1 |   0 |    4 |    4 |

<br>

A logistic regression to predict the transmission type (“am \~ cyl +
gear”) would be performed like this:

``` r
summary(glm(am ~ as.factor(cyl) + carb, 
            data = mtcars, 
            family = binomial(link = "logit")))
```

    ## 
    ## Call:
    ## glm(formula = am ~ as.factor(cyl) + carb, family = binomial(link = "logit"), 
    ##     data = mtcars)
    ## 
    ## Deviance Residuals: 
    ##     Min       1Q   Median       3Q      Max  
    ## -1.8699  -0.5506  -0.1869   0.6185   1.9806  
    ## 
    ## Coefficients:
    ##                 Estimate Std. Error z value Pr(>|z|)   
    ## (Intercept)      -0.6718     1.0924  -0.615  0.53854   
    ## as.factor(cyl)6  -3.7609     1.9072  -1.972  0.04862 * 
    ## as.factor(cyl)8  -5.5958     1.9381  -2.887  0.00389 **
    ## carb              1.1144     0.5918   1.883  0.05967 . 
    ## ---
    ## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
    ## 
    ## (Dispersion parameter for binomial family taken to be 1)
    ## 
    ##     Null deviance: 43.230  on 31  degrees of freedom
    ## Residual deviance: 26.287  on 28  degrees of freedom
    ## AIC: 34.287
    ## 
    ## Number of Fisher Scoring iterations: 5

<br>

Note the degrees of freedom indicate the number of observations in the
dataset.

On the other hand, aggregated or summary data might look like this:

##### Aggregated counts

``` r
mtcars_cnt <- count(mtcars, cyl, carb, am)

knitr::kable(mtcars_cnt)
```

| cyl | carb |  am |   n |
|----:|-----:|----:|----:|
|   4 |    1 |   0 |   1 |
|   4 |    1 |   1 |   4 |
|   4 |    2 |   0 |   2 |
|   4 |    2 |   1 |   4 |
|   6 |    1 |   0 |   2 |
|   6 |    4 |   0 |   2 |
|   6 |    4 |   1 |   2 |
|   6 |    6 |   1 |   1 |
|   8 |    2 |   0 |   4 |
|   8 |    3 |   0 |   3 |
|   8 |    4 |   0 |   5 |
|   8 |    4 |   1 |   1 |
|   8 |    8 |   1 |   1 |

<br>

An aggregated regression is performed using the weights argument to
indicate the units per response:

``` r
summary(glm(am ~ as.factor(cyl) + carb, 
            data = mtcars_cnt, 
            family = binomial(link = "logit"),
            weights = n
            ))
```

    ## 
    ## Call:
    ## glm(formula = am ~ as.factor(cyl) + carb, family = binomial(link = "logit"), 
    ##     data = mtcars_cnt, weights = n)
    ## 
    ## Deviance Residuals: 
    ##     Min       1Q   Median       3Q      Max  
    ## -2.6445  -1.2312  -0.3738   1.2369   1.9923  
    ## 
    ## Coefficients:
    ##                 Estimate Std. Error z value Pr(>|z|)   
    ## (Intercept)      -0.6718     1.0925  -0.615  0.53858   
    ## as.factor(cyl)6  -3.7609     1.9074  -1.972  0.04865 * 
    ## as.factor(cyl)8  -5.5958     1.9383  -2.887  0.00389 **
    ## carb              1.1144     0.5919   1.883  0.05971 . 
    ## ---
    ## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
    ## 
    ## (Dispersion parameter for binomial family taken to be 1)
    ## 
    ##     Null deviance: 43.230  on 12  degrees of freedom
    ## Residual deviance: 26.287  on  9  degrees of freedom
    ## AIC: 34.287
    ## 
    ## Number of Fisher Scoring iterations: 5

<br>

Note the degrees of freedom are incorrect, but the estimates, standard
errors and p-values are very similar (although not identical).

<br>

Aggregated data might also look like this:

##### Aggregated trials (successes, failures)

``` r
mtcars_wcnt <- count(mtcars, cyl, carb, am) %>%
  spread(am, n, fill = 0) %>%
  rename(auto = `1`, man = `0`) 

knitr::kable(mtcars_wcnt)
```

| cyl | carb | man | auto |
|----:|-----:|----:|-----:|
|   4 |    1 |   1 |    4 |
|   4 |    2 |   2 |    4 |
|   6 |    1 |   2 |    0 |
|   6 |    4 |   2 |    2 |
|   6 |    6 |   0 |    1 |
|   8 |    2 |   4 |    0 |
|   8 |    3 |   3 |    0 |
|   8 |    4 |   5 |    1 |
|   8 |    8 |   0 |    1 |

<br>

The formula and weights arguments need updating:

``` r
summary(glm(cbind(auto, man) ~ as.factor(cyl) + carb, 
            data = mtcars_wcnt, 
            family = binomial(link = "logit")
            ))
```

    ## 
    ## Call:
    ## glm(formula = cbind(auto, man) ~ as.factor(cyl) + carb, family = binomial(link = "logit"), 
    ##     data = mtcars_wcnt)
    ## 
    ## Deviance Residuals: 
    ##       1        2        3        4        5        6        7        8  
    ##  0.9179  -0.9407  -0.3772  -0.0251   0.4468  -0.3738  -0.5602   0.1789  
    ##       9  
    ##  0.3699  
    ## 
    ## Coefficients:
    ##                 Estimate Std. Error z value Pr(>|z|)   
    ## (Intercept)      -0.6718     1.0925  -0.615  0.53858   
    ## as.factor(cyl)6  -3.7609     1.9074  -1.972  0.04865 * 
    ## as.factor(cyl)8  -5.5958     1.9383  -2.887  0.00389 **
    ## carb              1.1144     0.5919   1.883  0.05971 . 
    ## ---
    ## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
    ## 
    ## (Dispersion parameter for binomial family taken to be 1)
    ## 
    ##     Null deviance: 19.6356  on 8  degrees of freedom
    ## Residual deviance:  2.6925  on 5  degrees of freedom
    ## AIC: 18.485
    ## 
    ## Number of Fisher Scoring iterations: 5

<br>

##### Aggregated proportions

``` r
mtcars_percent <- mtcars_p <- mtcars %>%
  group_by(cyl, carb) %>%
  summarise(
    n = n(),
    am  = sum(am)/n
  )
```

    ## `summarise()` has grouped output by 'cyl'. You can override using the `.groups` argument.

``` r
knitr::kable(mtcars_percent)
```

| cyl | carb |   n |        am |
|----:|-----:|----:|----------:|
|   4 |    1 |   5 | 0.8000000 |
|   4 |    2 |   6 | 0.6666667 |
|   6 |    1 |   2 | 0.0000000 |
|   6 |    4 |   4 | 0.5000000 |
|   6 |    6 |   1 | 1.0000000 |
|   8 |    2 |   4 | 0.0000000 |
|   8 |    3 |   3 | 0.0000000 |
|   8 |    4 |   6 | 0.1666667 |
|   8 |    8 |   1 | 1.0000000 |

<br>

The formula and weights arguments:

``` r
summary(glm(am ~ as.factor(cyl) + carb, 
            data = mtcars_percent, 
            family = binomial(link = "logit"),
            weights = n
            ))
```

    ## 
    ## Call:
    ## glm(formula = am ~ as.factor(cyl) + carb, family = binomial(link = "logit"), 
    ##     data = mtcars_percent, weights = n)
    ## 
    ## Deviance Residuals: 
    ##       1        2        3        4        5        6        7        8  
    ##  0.9179  -0.9407  -0.3772  -0.0251   0.4468  -0.3738  -0.5602   0.1789  
    ##       9  
    ##  0.3699  
    ## 
    ## Coefficients:
    ##                 Estimate Std. Error z value Pr(>|z|)   
    ## (Intercept)      -0.6718     1.0925  -0.615  0.53858   
    ## as.factor(cyl)6  -3.7609     1.9074  -1.972  0.04865 * 
    ## as.factor(cyl)8  -5.5958     1.9383  -2.887  0.00389 **
    ## carb              1.1144     0.5919   1.883  0.05971 . 
    ## ---
    ## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
    ## 
    ## (Dispersion parameter for binomial family taken to be 1)
    ## 
    ##     Null deviance: 19.6356  on 8  degrees of freedom
    ## Residual deviance:  2.6925  on 5  degrees of freedom
    ## AIC: 18.485
    ## 
    ## Number of Fisher Scoring iterations: 5

<br>

So far very similar results across aggregates and individual datasets,
with the only different the **degrees of freedom** (which will need
correcting). However as we start to add independent variables
(especially continuous variables), results begin to diverge. Below we
add `mpg` as a predictor:

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
mtcars_percent <- mtcars %>%
  group_by(cyl, carb) %>%
  summarise(
    n = n(),
    am  = sum(am)/n,
    mpg = mean(mpg)
  )
```

    ## `summarise()` has grouped output by 'cyl'. You can override using the `.groups` argument.

``` r
knitr::kable(mtcars_percent)
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
    data = mtcars_percent,
    weights = n
  ) %>%
  summary()
```

    ## 
    ## Call:
    ## glm(formula = am ~ as.factor(cyl) + carb + mpg, family = binomial, 
    ##     data = mtcars_percent, weights = n)
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
mtcars_cnt <- mtcars %>%
  group_by(cyl, carb, am) %>%
  summarise(
    mpg = mean(mpg),
    n = n()
    )
```

    ## `summarise()` has grouped output by 'cyl', 'carb'. You can override using the `.groups` argument.

``` r
knitr::kable(mtcars_cnt)
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
    data = mtcars_cnt,
    weights = n
  ) %>%
  summary()
```

    ## Warning: glm.fit: algorithm did not converge

    ## Warning: glm.fit: fitted probabilities numerically 0 or 1 occurred

    ## 
    ## Call:
    ## glm(formula = am ~ as.factor(cyl) + carb + mpg, family = binomial, 
    ##     data = mtcars_cnt, weights = n)
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
