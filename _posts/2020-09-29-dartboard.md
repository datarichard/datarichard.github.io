---
layout: post
title: "US election 2020"
author: "datarich(ard)"
date: 2020-09-29 13:54:00 -0900
categories:
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

![dartboard](2020-09/assets/dartboard-1.png)<!-- -->

<br>