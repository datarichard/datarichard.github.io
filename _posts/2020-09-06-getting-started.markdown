---
layout: post
title: "Getting started"
author: "datarich(ard)"
date: 2020-09-06 11:48:50 -0900
categories:
---

## Step 0. Install R and RStudio
RStudio is the preferred development environment for R. Download the [latest R binary for Mac OSX](https://cloud.r-project.org/bin/macosx/)  

Since CRAN does not check the binaries for viruses it's a good idea to check the [hash](https://shapeshed.com/unix-sha1sum/). e.g.,  
```
shasum R-3.6.3.nn.pkg 
``` 

Run the package installer and it should overwrite the previous R installation by default. You can check the installation in from the R command line with `.libPaths()`. It should return something like:  
```
/Library/Frameworks/R.framework/Versions/3.6/Resources/library
```

Finally download [RStudio](https://www.rstudio.com/products/rstudio/download/) and follow the install instructions.  

You can check the version of R from the RStudio terminal (or the bash terminal) with `R --version` e.g.,

```
R version 3.6.3 (2020-02-29) -- "Holding the Windsock"
Copyright (C) 2020 The R Foundation for Statistical Computing
Platform: x86_64-apple-darwin15.6.0 (64-bit)
```


## Step 1. Install Jupyter notebooks  
Jupyter notebooks are also a popular development tool. Anaconda (miniconda) provides an install for Jupyter notebooks. Anaconda has a lot of cool stuff but I normally just install miniconda to reduce the overhead. See here: https://conda.io/en/latest/miniconda.html for instructions and download the shell script. Then:  
```
bash ~/Downloads/Miniconda3-latest-MacOSX-x86_64.sh
```  

After installing miniconda then you will need to install the jupyter notebook package:
```
conda install jupyter
```

## Step 2. Install IRkernel for R  
The instructions for getting Jupyter to run with an R kernel are here: https://irkernel.github.io/installation/  

First open an R session in terminal `R`. Then run the following commands in that R session:  
```
install.packages('IRkernel')  # this will download the package from CRAN
```  

The kernel spec can be installed for the current user with the following line:
```
IRkernel::installspec()
```  

## Step 3. Run a jupyter notebook from the bash terminal 
```
jupyter notebook
```

## Step 4. Install RStan
Instructions for installing RStan are here https://github.com/stan-dev/rstan/wiki/RStan-Getting-Started

it is sometimes necessary to remove any existing RStan via
```
remove.packages("rstan")
if (file.exists(".RData")) file.remove(".RData")
```

Then, restart R.

In most cases, you can simply type (exactly like this)
```
install.packages("rstan", repos = "https://cloud.r-project.org/", dependencies = TRUE)
```

You can check the C++ Toolchain in RStudio
```
pkgbuild::has_build_tools(debug = TRUE)
```
