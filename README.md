# datarichard.github.io
"Data science is statistics on a mac" -Kanye, probably

## Step 0. Install R and RStudio
Oridinarily I would just use the Anaconda install (see below), but R is a bit limited in Anaconda. I've found it difficult to install custom packages and the Anaconda versions of RStudio are out-of-date.

Download the latest R binary for Mac OSX [https://cloud.r-project.org/bin/macosx/]  

Since I'm not running a virus scanner, and CRAN does not check the binaries for viruses it's a good idea to check the MD5-hash. e.g.,  
```
md5 R-3.5.2.pkg 
``` 

Run the package installer and it should overwrite the previous R installation by default. You can check the installation in from the R command line with `which R`. It should return something like:  
```
/Library/Frameworks/R.framework/Versions/3.5/Resources/library
```

Finally download RStudio from [https://www.rstudio.com/products/rstudio/download/] and follow the install instructions.  

You can check the version of R from the RStudio terminal (or the bash terminal) with `R --version` e.g.,

```
R version 3.5.2 (2018-12-20) -- "Eggshell Igloo"
Copyright (C) 2018 The R Foundation for Statistical Computing
Platform: x86_64-apple-darwin15.6.0 (64-bit)

R is free software and comes with ABSOLUTELY NO WARRANTY.
You are welcome to redistribute it under the terms of the
GNU General Public License versions 2 or 3.
For more information about these matters see
http://www.gnu.org/licenses/.
```


## Step 1. Install Anaconda  
See [here](https://conda.io/docs/user-guide/install/macos.html) for instructions and download the shell script. Then:  
```
bash ~/Downloads/Anaconda3-2018.12-MacOSX-x86_64.sh
```  

Anaconda will install a bunch of packages (but not R). However if you just want miniconda, download the relevant shell script and:
```
bash ~/Downloads/Miniconda3-latest-MacOSX-x86_64.sh
```  

If you just installed miniconda then you will need to install the other packages you need. e.g., to install Jupyter notebooks run `conda install jupyter`  

## Step 2. Install IRkernel for R  
The instructions for getting Jupyter to run with an R kernel are [here](https://irkernel.github.io/installation/). First open an R session in terminal `R`. Then run the following commands in that R session:  

```
install.packages('IRkernel')  # this will download the package from CRAN
```  
The kernel spec can be installed for the current user with the following line:
```
IRkernel::installspec()
```  

## Step 3. Run a jupyter notebook  
```
jupyter notebook
```
