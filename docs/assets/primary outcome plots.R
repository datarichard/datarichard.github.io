#### Setup ####
setwd("~/Documents/datarichard.github.io/assets")

library(tidyverse)
library(readxl)

#### Import ####
path_to_excel_file <- "../assets/WRIGHT_t-tests_primary outcome data.xlsx"

recommendations <- read_excel(path = "WRIGHT_t-tests_primary outcome data.xlsx",
                              range = "B3:C54") 

objections <- read_excel(path = path_to_excel_file,
                         range = "E3:F54") 

efficacy <- read_excel(path = path_to_excel_file,
                       range = "H3:I54") 

concerns <- read_excel(path = path_to_excel_file,
                       range = "K3:L54") 

#### Preprocessing ####
concerns_long <- pivot_longer(data = concerns,
                              cols = everything())

concerns_long <- na.omit(concerns_long)

# group the tibble by the group name #####

concerns_long_grouped <- group_by(concerns_long, name)

# summarise the grouped tibble ####
summarise(concerns_long_grouped, 
          n = n(), 
          M = mean(value), 
          `standard error of the mean` = sd(value)/sqrt(n)
          )

# The first step is to save the summary data to an object (another tibble) so we
# can use it in the `ggplot()` function:

group_statistics <- summarise(concerns_long_grouped,
                              n = n(),
                              M = mean(value),
                              SEM = sd(value)/sqrt(n)
)


# create a baselayer for the plot (called p), naming the x and y variables, as well as the variable to fill by
p <- ggplot(data = concerns_long,
            mapping = aes(x = name, y = value, color = name, fill = name))

p + geom_boxplot(alpha = 0.5) +
  geom_jitter()
  
# add a layer with the column geometry (geom_col) we want to use (it inherits 
# all the details we provided in p)
p <- p + geom_col(color = "black", width = 0.5)

# add some error bars in the same manner
p <- p + geom_errorbar(aes(ymin = M - SEM, ymax = M + SEM),
                       width = 0.2)

ggplot(data = group_statistics,
       mapping = aes(x = name, y = M, fill = name)) +
  geom_col(color = "black", width = 0.95) +
  geom_errorbar(aes(ymin = M - SEM, ymax = M + SEM),
                width = 0.2)


p + geom_point(aes(color = name, size = n)) +
  geom_errorbar(aes(ymin = M - SEM, ymax = M + SEM, color = name),
                width = 0.2)

