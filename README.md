# datarichard.github.io
this is a personal blog describing my hapless attempt at datascience
  
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
