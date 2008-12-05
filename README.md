Mooish Template
===============
A template for building JS libraries structured like [Mootools][1], works
great for building code on top of Mootools (plugins/classes/extensions etc).


The most important part of this organization scheme is that all of your js code
lives in one place, is tested in one place and is pushed/pulled from one place. 
I don't have to bother updating a mootools or clientcide file in all of my projects 
when a new version comes out. I just update my *one* mootools or clientcide repo 
and use the builder to make new lib js files for my projects. Better still, all
of the tests in this template pull the code from my mootools or clientcide repo 
dynamically before each test is run - there really isn't a stagnant copy of 
mootools lying around anywhere.


What's in the box?
------------------
  You may have noticed there are some files in this directory. Let me explain.

### builder.rb

  There is a customized bulder.rb script (based on the one included in moo-core)
  that allows for multiple pointers to scripts.json files. With this you can
  build a customized js file that includes classes from any library (with a 
  scripts.json file), including your own source code. For example:
  
    $> ruby build.rb Core JsonP MyRadClassIsTight
    
  Notice that all three of the supplied dependencies are from different
  libraries (Mootools-core, Clientcide and fake respectively). Since all
  three have scripts.json files that link each other up, the build will produce
  a file with those three classes concatenated along with all of their 
  dependencies.
  
  This really comes in handy for building custom Javascript lib files for your
  projects. For example, my site www.iancollins.me uses classes from Mootools, 
  Clientcide and Brawndo. I have a one-line file "3n" with this inside of it:
    
    JsonP Date Date.Extras JustTheTip Number.BrawndoExtras Function.BrawndoExtras 
    Element.BrawndoScrolling Element.BrawndoExtras Element.BrawndoImage 
    Element.BrawndoStyles Element.BrawndoDisplaying params String.BrawndoExtras 
    Array.BrawndoExtras dbug TwitterHelpers RandomGlobals DomReady 
    CSSTransitions.Tween
    
  Now to build all the necessary lib js I simple do: 
  
    ruby build.rb <($3n)
    
### Source

  This is where your code lives. There is a dummy directory and file as an example,
  these can be deleted. Each class or set of extensions should be in its own file,
  in a directory that makes sense for what it does. 
  
### Source/scripts.json

  This is a JSON representation of your code inside Source - __you__ keep this file
  up-to-date. It has an accurate representation of the code provided in /Source, 
  with dependencies from Mootools-core.
  
Running your tests
------------------

  This template comes with two test suites: Screwunit for specs and Mootools Unit 
  Test Framework for the more interactive tests. The specs cover all of the 
  components that can be tested non-visually. The unit tests cover everything that 
  needs a human to judge the result. 
  
  For the interactive tests you should have Apache/Nginx or some other webserver 
  serving the files. Just point your browser at the Tests directory. For the 
  specs you don't need the webserver - just point your browser at Specs/suite.html.
  You may also need to edit /Tests/config.js to point to the right library source
  directories. The first object being passed in to the UnitTester constructor
  is what you should change. 
  
Building a custom lib js file
-----------------------------

  First, edit the build.yml file to suite your needs. Add/remove items from the 
  dependency_paths list to point to all of the scripts.json files you care
  about. In my setup I point to mootools-more, mootools-core, clientcide and of
  course, Brawndo™ (the Source directory here). 
  
  Now, in the root directory of the project run:
    
    ruby build.rb Class1 Class2 Class3
    
  List as many filenames (class names, usually) as you want, separated by spaces. 
  If you aren't sure of what you can put in this list, look at any scripts.json
  file (there is one in the Source directory here) - anything at the 2nd depth
  in the hash is fair game. Examples: Array, InvisibleDimensions, JsonP
  
  This will output a file in the top-level, whose name is given in build.yml. 
  
Contributing
------------

  Got a class or extension to add? Follow these simple steps to glory:
  
  1. Add the class/class.extension in its own file in the Source directory. 
     If it doesn't fit into one of the directories there, create a new one. 
  2. Add your new filename to scripts.json. The first level of the hash there
     is for the directories under Source. The 2nd level is for the files in
     those directories. Make sure to add a desc(ription) and dep(endencie)s.
     The dependencies can be anything found in a scripts.json file you pointed
     to in build.yml. 
  3. If this particular code doesn't do anything visual, add your tests to 
     Specs/brawndo_specs.js in its own describe block. You will also have 
     to add the directory/filename to the custom Builder call at the top of 
     Specs/suite.html (around line 20) so that the test suite will know to pull
     in your code before it runs.
  
     Otherwise, you'll need to add a test to the Unit Test Framework. Follow
     the same steps for adding a director/file from 1. but do it in 
     Tests/UserTests and add two files: ClassName.testname.js and 
     ClassName.testname.html. Now add your ClassName & testname to 
     UserTests/test.json so they'll show up in the list. Oh also maybe write
     test code and html in those two files (look at the others for an example).

  [1]: http://mootools.net/
  [2]: http://www.clientcide.com