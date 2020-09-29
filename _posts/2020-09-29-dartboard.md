---
title: "Dartboard"
author: "datarich(ard)"
date: 2020-09-29 00:00:54 -0900
---

Inspired by this [post on visualizing
uncertainty](https://magazine.northwestern.edu/exclusives/understanding-uncertainty/),
I present the 538 election forecast for 2020 as a dartboard.

<br>

``` r
df <- expand.grid(x = 1:8, y = 1:24)
candidates <- c("Biden", "Trump")
df$`2020` <- sample(candidates, 
                    size = nrow(df), 
                    replace = T,
                    prob = c(.78, .22))


ggplot(df, aes(fill=`2020`, xmin = x, ymin = y, xmax = x+1, ymax = y+1)) +
  geom_rect() +
  scale_fill_manual(values = c("dodgerblue", "salmon")) +
  coord_polar(theta="y") +
  theme(panel.grid=element_blank()) +
  theme(axis.text=element_blank()) +
  theme(axis.ticks=element_blank())
```

![dartboard](https://raw.githubusercontent.com/datarichard/datarichard.github.io/master/assets/dartboard-1.png)<!-- -->

<br>

(Source: https://projects.fivethirtyeight.com/2020-election-forecast/)

<br>
