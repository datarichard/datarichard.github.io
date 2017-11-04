# Hello World

these are the notes of an ex-neuroscientist trying to pivot to datascience

> "datascience is statistics on a mac"

 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-Kanye, probably

## Day 0 What is datascience?
Step 1: find out what is datascience

- [It's not statistics](http://bulletin.imstat.org/2014/09/data-science-how-is-it-different-to-statistics)
- [There are two types](https://www.quora.com/What-is-data-science/answer/Michael-Hochster)
- [A venn diagram even I can understand](http://drewconway.com/zia/2013/3/26/the-data-science-venn-diagram)

## Day 1 Install Anaconda
Step 2: Install Anaconda. This should be easy :-) 

Hmmm... [where should I install it](http://hivelogic.com/articles/using_usr_local/): ```/usr/local/``` or ```/usr/bin/``` or somewhere else? 

Turns out macOS doesn't like me installing and running things in my ```/usr/``` folder. Someone called ```sudo``` kept complaining. Sigh. I try to be a nerd but in the end I had to settle for my home directory.

...wait, why is there now a strange folder in my home directory?

### end of Day 1
Spent the entire day trying to figure out how to stop Anaconda installing a 'AnacondaProjects' folder in my home directory. That is my home directory! Who does it think it is? Steve Jobs?!

[Anaconda team were very nice about it though](https://groups.google.com/a/continuum.io/forum/#!msg/anaconda/75Ps_8vNyWM/-Joh5VnxAAAJ)

## Day 2 Installing r-essentials
Installed r-essentials package via Anaconda. How nice of them to put together everything the budding datascientist needs in a single package! Fire up RStudio - wheee! data science here I come :-) ...wait a second, why does RStudio look like shite on my new shiny retina macbook pro?

### end of Day 2
Spent the afternoon trying to figure out how to display RStudio in high resolution. [Anaconda team came to the rescue again](https://github.com/ContinuumIO/anaconda-issues/issues/7089#issuecomment-341713687)

## Day 3 Installing packages from source
Anaconda check. RStudio check. Data hmmm, let's see what we've got? First up is [HILDA](http://melbourneinstitute.unimelb.edu.au/hilda). This is the Household, Income, Labour Dynamics in Australia Survey. A longitudinal dataset collected on 17,000 people over 14 years. Let's see if we have any longitudinal methods for clustering data in R. [kml](https://www.rdocumentation.org/packages/kml/versions/2.4.1/topics/kml-package) looks good. `install.packages("kml")`

No compiler found. FAAAARK

### end of Day 3
So I can't get Anaconda R to compile source packages. I give up.

`conda install anaconda-clean`

`anaconda-clean --yes`

`rm -rf .anaconda_backup`

`rm -rf ~/anaconda3`
